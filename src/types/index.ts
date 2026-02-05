// Token Approval Types
export interface TokenApproval {
  id: string;
  tokenAddress: `0x${string}`;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  spenderAddress: `0x${string}`;
  spenderName: string;
  allowance: bigint;
  isUnlimited: boolean;
  riskLevel: "high" | "medium" | "low";
  chainId: number;
  lastUpdated: Date;
}

// Risk Level Colors
export const riskColors = {
  high: "danger",
  medium: "warning",
  low: "success",
} as const;

// Chain Info
export interface ChainInfo {
  id: number;
  name: string;
  icon: string;
  explorerUrl: string;
}

// Wallet State
export interface WalletState {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  chainId: number | undefined;
}

// Revoke Transaction State
export type RevokeStatus = "idle" | "pending" | "confirming" | "success" | "error";

export interface RevokeState {
  approvalId: string;
  status: RevokeStatus;
  txHash?: `0x${string}`;
  error?: string;
}
