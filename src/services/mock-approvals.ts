import { TokenApproval } from "@/types";

// Mock data for testing the UI and revoke flow
// In production, this would come from an indexer API like GoldRush or Alchemy

const MOCK_APPROVALS: TokenApproval[] = [
  {
    id: "1",
    tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    tokenName: "USD Coin",
    tokenSymbol: "USDC",
    tokenDecimals: 6,
    spenderAddress: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    spenderName: "Uniswap V3 Router",
    allowance: BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"),
    isUnlimited: true,
    riskLevel: "high",
    chainId: 1,
    lastUpdated: new Date("2024-01-15"),
  },
  {
    id: "2",
    tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    tokenName: "Tether USD",
    tokenSymbol: "USDT",
    tokenDecimals: 6,
    spenderAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    spenderName: "Uniswap V2 Router",
    allowance: BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"),
    isUnlimited: true,
    riskLevel: "high",
    chainId: 1,
    lastUpdated: new Date("2024-02-20"),
  },
  {
    id: "3",
    tokenAddress: "0x6B175474E89094C44Da98b954EeseeD7eE6C4D",
    tokenName: "Dai Stablecoin",
    tokenSymbol: "DAI",
    tokenDecimals: 18,
    spenderAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    spenderName: "SushiSwap Router",
    allowance: BigInt("5000000000000000000000"),
    isUnlimited: false,
    riskLevel: "medium",
    chainId: 1,
    lastUpdated: new Date("2024-03-01"),
  },
  {
    id: "4",
    tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    tokenName: "Wrapped Bitcoin",
    tokenSymbol: "WBTC",
    tokenDecimals: 8,
    spenderAddress: "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
    spenderName: "0x Exchange Proxy",
    allowance: BigInt("100000000"),
    isUnlimited: false,
    riskLevel: "low",
    chainId: 1,
    lastUpdated: new Date("2024-03-10"),
  },
  {
    id: "5",
    tokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    tokenName: "ChainLink Token",
    tokenSymbol: "LINK",
    tokenDecimals: 18,
    spenderAddress: "0x1111111254EEB25477B68fb85Ed929f73A960582",
    spenderName: "1inch Router",
    allowance: BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"),
    isUnlimited: true,
    riskLevel: "high",
    chainId: 1,
    lastUpdated: new Date("2024-01-05"),
  },
  {
    id: "6",
    tokenAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    tokenName: "Aave Token",
    tokenSymbol: "AAVE",
    tokenDecimals: 18,
    spenderAddress: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
    spenderName: "Aave V3 Pool",
    allowance: BigInt("500000000000000000000"),
    isUnlimited: false,
    riskLevel: "low",
    chainId: 1,
    lastUpdated: new Date("2024-02-28"),
  },
];

// Simulates fetching approvals for a wallet address
export async function getMockApprovals(walletAddress: string): Promise<TokenApproval[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Return mock data regardless of address for testing
  if (walletAddress) {
    return MOCK_APPROVALS;
  }
  
  return [];
}

// Get a single approval by ID
export function getMockApprovalById(id: string): TokenApproval | undefined {
  return MOCK_APPROVALS.find((approval) => approval.id === id);
}

// Calculate risk level based on allowance and other factors
export function calculateRiskLevel(
  isUnlimited: boolean,
  allowanceValue: bigint,
  tokenDecimals: number
): "high" | "medium" | "low" {
  if (isUnlimited) return "high";
  
  const threshold = BigInt(10 ** (tokenDecimals + 6)); // 1 million tokens
  if (allowanceValue > threshold) return "medium";
  
  return "low";
}

// Check if an allowance is considered "unlimited"
export function isUnlimitedAllowance(allowance: bigint): boolean {
  // Common unlimited approval value (2^256 - 1)
  const MAX_UINT256 = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935");
  // Consider anything above 10^30 as effectively unlimited
  const UNLIMITED_THRESHOLD = BigInt("1000000000000000000000000000000");
  
  return allowance === MAX_UINT256 || allowance >= UNLIMITED_THRESHOLD;
}
