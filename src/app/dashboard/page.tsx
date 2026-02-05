"use client";

import { useAccount } from "wagmi";
import { useTranslations } from "next-intl";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ApprovalTable } from "@/components/web3/approval-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApprovals } from "@/hooks/use-approvals";
import { AlertTriangle, Loader2, RefreshCw, Shield, Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardPage() {
  const t = useTranslations();
  const { isConnected, address } = useAccount();
  const { approvals, isLoading, error, isUsingMockData, refetch, removeApproval } = useApprovals();

  const highRiskCount = approvals.filter((a) => a.riskLevel === "high").length;
  const totalApprovals = approvals.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container flex-1 py-8">
        {!isConnected ? (
          // Not Connected State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Wallet className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.connectWallet.title")}</h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              {t("dashboard.connectWallet.description")}
            </p>
            <div className="mt-8">
              <ConnectButton />
            </div>
          </div>
        ) : (
          // Connected State
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.stats.totalApprovals")}</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalApprovals}</div>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.stats.totalApprovalsDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.stats.highRisk")}</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">{highRiskCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.stats.highRiskDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.stats.wallet")}</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                  <p className="text-xs text-muted-foreground">{t("dashboard.stats.walletDesc")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Approval Table Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t("dashboard.approvals.title")}</CardTitle>
                    <CardDescription>
                      {t("dashboard.approvals.description")}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isUsingMockData ? (
                      <Badge variant="outline" className="hidden sm:inline-flex text-yellow-500 border-yellow-500/50">
                        {t("dashboard.approvals.demoMode")}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="hidden sm:inline-flex text-green-500 border-green-500/50">
                        {t("dashboard.approvals.liveData")}
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={refetch}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span className="ml-2 hidden sm:inline">{t("common.refresh")}</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
                    <h3 className="text-lg font-semibold">{t("dashboard.error.title")}</h3>
                    <p className="text-muted-foreground">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={refetch}>
                      {t("common.tryAgain")}
                    </Button>
                  </div>
                ) : (
                  <ApprovalTable approvals={approvals} onRevoked={removeApproval} />
                )}
              </CardContent>
            </Card>

            {/* Info Banner - Only show in demo mode */}
            {isUsingMockData && (
              <Card className="border-yellow-500/50 bg-yellow-500/5">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 shrink-0" />
                    <div>
                      <CardTitle className="text-base">{t("dashboard.demoBanner.title")}</CardTitle>
                      <CardDescription>
                        {t("dashboard.demoBanner.description")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
