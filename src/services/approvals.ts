import { TokenApproval } from "@/types";
import { KNOWN_CONTRACTS } from "@/lib/web3/config";

// GoldRush API configuration (formerly Covalent)
const GOLDRUSH_API_KEY = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY;
const GOLDRUSH_BASE_URL = "https://api.goldrush.dev/v1";

// Chain ID to GoldRush chain name mapping
const CHAIN_NAMES: Record<number, string> = {
  1: "eth-mainnet",
  137: "matic-mainnet",
  42161: "arbitrum-mainnet",
  10: "optimism-mainnet",
  8453: "base-mainnet",
  11155111: "eth-sepolia",
};

// Max uint256 value (unlimited approval)
const MAX_UINT256 = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935");
const UNLIMITED_THRESHOLD = BigInt("1000000000000000000000000000000"); // 10^30

interface GoldRushApproval {
  token_address: string;
  token_address_label: string | null;
  ticker_symbol: string | null;
  contract_decimals: number;
  logo_url: string | null;
  spenders: Array<{
    spender_address: string;
    spender_address_label: string | null;
    allowance: string;
    value_at_risk: string | null;
    risk_factor: string | null;
  }>;
}

interface GoldRushResponse {
  data: {
    address: string;
    updated_at: string;
    items: GoldRushApproval[];
  };
  error: boolean;
  error_message: string | null;
}

/**
 * Fetch token approvals from GoldRush API
 */
export async function getApprovals(
  walletAddress: string,
  chainId: number = 1
): Promise<TokenApproval[]> {
  // Check if API key is configured
  if (!GOLDRUSH_API_KEY) {
    console.warn("GoldRush API key not configured, using mock data");
    const { getMockApprovals } = await import("./mock-approvals");
    return getMockApprovals(walletAddress);
  }

  const chainName = CHAIN_NAMES[chainId];
  if (!chainName) {
    console.warn(`Chain ${chainId} not supported, using mock data`);
    const { getMockApprovals } = await import("./mock-approvals");
    return getMockApprovals(walletAddress);
  }

  try {
    const url = `${GOLDRUSH_BASE_URL}/${chainName}/approvals/${walletAddress}/?key=${GOLDRUSH_API_KEY}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`GoldRush API error: ${response.status}`);
    }

    const data: GoldRushResponse = await response.json();

    if (data.error) {
      throw new Error(data.error_message || "GoldRush API error");
    }

    // Transform GoldRush response to our TokenApproval format
    const approvals: TokenApproval[] = [];
    let idCounter = 1;

    for (const item of data.data.items) {
      for (const spender of item.spenders) {
        const allowance = BigInt(spender.allowance || "0");
        
        // Skip zero allowances
        if (allowance === BigInt(0)) continue;

        const isUnlimited = allowance >= UNLIMITED_THRESHOLD || allowance === MAX_UINT256;
        const riskLevel = calculateRiskLevel(isUnlimited, allowance, item.contract_decimals);

        approvals.push({
          id: String(idCounter++),
          tokenAddress: item.token_address as `0x${string}`,
          tokenName: item.token_address_label || "Unknown Token",
          tokenSymbol: item.ticker_symbol || "???",
          tokenDecimals: item.contract_decimals || 18,
          spenderAddress: spender.spender_address as `0x${string}`,
          spenderName: spender.spender_address_label || getKnownContractName(spender.spender_address) || "Unknown Contract",
          allowance,
          isUnlimited,
          riskLevel,
          chainId,
          lastUpdated: new Date(data.data.updated_at),
        });
      }
    }

    // Sort by risk level (high first)
    return approvals.sort((a, b) => {
      const riskOrder = { high: 0, medium: 1, low: 2 };
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    });

  } catch (error) {
    console.error("Failed to fetch approvals from GoldRush:", error);
    // Fallback to mock data on error
    const { getMockApprovals } = await import("./mock-approvals");
    return getMockApprovals(walletAddress);
  }
}

/**
 * Get known contract name from address
 */
function getKnownContractName(address: string): string | null {
  const lowerAddress = address.toLowerCase();
  for (const [knownAddress, name] of Object.entries(KNOWN_CONTRACTS)) {
    if (knownAddress.toLowerCase() === lowerAddress) {
      return name;
    }
  }
  return null;
}

/**
 * Calculate risk level based on approval amount
 */
function calculateRiskLevel(
  isUnlimited: boolean,
  allowanceValue: bigint,
  tokenDecimals: number
): "high" | "medium" | "low" {
  if (isUnlimited) return "high";
  
  // More than 1 million tokens = medium risk
  const threshold = BigInt(10 ** (tokenDecimals + 6));
  if (allowanceValue > threshold) return "medium";
  
  return "low";
}

/**
 * Check if GoldRush API is configured
 */
export function isApiConfigured(): boolean {
  return !!GOLDRUSH_API_KEY;
}
