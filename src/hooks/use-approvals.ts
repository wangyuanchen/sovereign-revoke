"use client";

import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { getApprovals, isApiConfigured } from "@/services/approvals";
import { type TokenApproval } from "@/types";

export function useApprovals() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [approvals, setApprovals] = useState<TokenApproval[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const fetchApprovals = async () => {
    if (!address) {
      setApprovals([]);
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const data = await getApprovals(address, chainId);
      setApprovals(data);
      setIsUsingMockData(!isApiConfigured());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch approvals");
      setApprovals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchApprovals();
    } else {
      setApprovals([]);
    }
  }, [address, isConnected, chainId]);

  const removeApproval = (approvalId: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== approvalId));
  };

  return {
    approvals,
    isLoading,
    error,
    isUsingMockData,
    refetch: fetchApprovals,
    removeApproval,
  };
}
