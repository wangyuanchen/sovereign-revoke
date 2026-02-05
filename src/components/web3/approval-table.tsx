"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRevokeApproval } from "@/hooks/use-revoke-approval";
import { shortenAddress, formatAmount } from "@/lib/utils";
import { type TokenApproval, riskColors } from "@/types";
import { AlertTriangle, CheckCircle, ExternalLink, Loader2 } from "lucide-react";

interface ApprovalTableProps {
  approvals: TokenApproval[];
  onRevoked: (approvalId: string) => void;
}

export function ApprovalTable({ approvals, onRevoked }: ApprovalTableProps) {
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const { revoke, isPending, isConfirming } = useRevokeApproval({
    onSuccess: () => {
      if (revokingId) {
        onRevoked(revokingId);
        setRevokingId(null);
      }
    },
    onError: () => {
      setRevokingId(null);
    },
  });

  const handleRevoke = async (approval: TokenApproval) => {
    setRevokingId(approval.id);
    try {
      await revoke(approval.tokenAddress, approval.spenderAddress);
    } catch (error) {
      // Error handled in hook
    }
  };

  if (approvals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-lg font-semibold">No Approvals Found</h3>
        <p className="text-muted-foreground">
          Your wallet has no active token approvals. You&apos;re safe!
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Spender</TableHead>
              <TableHead>Allowance</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvals.map((approval) => (
              <TableRow key={approval.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                      {approval.tokenSymbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium">{approval.tokenSymbol}</div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-xs text-muted-foreground cursor-pointer hover:underline">
                            {shortenAddress(approval.tokenAddress)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{approval.tokenAddress}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{approval.spenderName}</div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`https://etherscan.io/address/${approval.spenderAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                        >
                          {shortenAddress(approval.spenderAddress)}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{approval.spenderAddress}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  {approval.isUnlimited ? (
                    <span className="flex items-center gap-1 text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                      Unlimited
                    </span>
                  ) : (
                    <span>
                      {formatAmount(approval.allowance, approval.tokenDecimals)}{" "}
                      {approval.tokenSymbol}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={riskColors[approval.riskLevel]}>
                    {approval.riskLevel.charAt(0).toUpperCase() +
                      approval.riskLevel.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRevoke(approval)}
                    disabled={revokingId === approval.id && (isPending || isConfirming)}
                  >
                    {revokingId === approval.id && (isPending || isConfirming) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isPending ? "Confirm..." : "Revoking..."}
                      </>
                    ) : (
                      "Revoke"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
