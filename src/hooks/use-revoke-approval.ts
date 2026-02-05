"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ERC20_ABI } from "@/lib/web3/config";
import { useState, useCallback } from "react";
import { type RevokeStatus } from "@/types";

interface UseRevokeApprovalOptions {
  onSuccess?: (txHash: `0x${string}`) => void;
  onError?: (error: Error) => void;
}

export function useRevokeApproval(options?: UseRevokeApprovalOptions) {
  const [status, setStatus] = useState<RevokeStatus>("idle");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | undefined>();

  const { writeContractAsync } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });

  const revoke = useCallback(
    async (tokenAddress: `0x${string}`, spenderAddress: `0x${string}`) => {
      try {
        setStatus("pending");
        setError(undefined);

        // Call approve with 0 to revoke
        const hash = await writeContractAsync({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [spenderAddress, BigInt(0)],
        });

        setTxHash(hash);
        setStatus("confirming");

        options?.onSuccess?.(hash);
        setStatus("success");

        return hash;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to revoke approval";
        setError(errorMessage);
        setStatus("error");
        options?.onError?.(err instanceof Error ? err : new Error(errorMessage));
        throw err;
      }
    },
    [writeContractAsync, options]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setTxHash(undefined);
    setError(undefined);
  }, []);

  return {
    revoke,
    reset,
    status,
    txHash,
    error,
    isConfirming,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
