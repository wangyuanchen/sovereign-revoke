import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from "wagmi/chains";

// RainbowKit/Wagmi configuration
// Get your Project ID from https://dashboard.reown.com/
export const config = getDefaultConfig({
  appName: "Sovereign Revoke",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, base],
  ssr: true,
});

// ERC20 ABI for approve function
export const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "name",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

// Common contract addresses
export const KNOWN_CONTRACTS: Record<string, string> = {
  "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45": "Uniswap V3 Router",
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D": "Uniswap V2 Router",
  "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F": "SushiSwap Router",
  "0xDef1C0ded9bec7F1a1670819833240f027b25EfF": "0x Exchange Proxy",
  "0x1111111254EEB25477B68fb85Ed929f73A960582": "1inch Router",
  "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2": "Aave V3 Pool",
  "0xE592427A0AEce92De3Edee1F18E0157C05861564": "Uniswap V3 Swap Router",
};

// Get contract name from address
export function getContractName(address: string): string {
  return KNOWN_CONTRACTS[address.toLowerCase()] || KNOWN_CONTRACTS[address] || "Unknown Contract";
}
