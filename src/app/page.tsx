import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { Footer } from "@/components/shared/footer";
import { AlertTriangle, ArrowRight, CheckCircle, Lock, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Link href="/dashboard">
            <Button>Launch App</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container flex flex-1 flex-col items-center justify-center gap-8 py-20 text-center md:py-32">
        <div className="flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span>Your wallet may be at risk</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Unlimited Approvals are a
          <span className="text-red-500"> Silent Threat</span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Every time you interact with a DeFi protocol, you grant token approvals. 
          Many are set to &ldquo;unlimited&rdquo; by default. If that contract gets exploited, 
          hackers can drain your entire balance.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Scan My Wallet
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-red-500">$2B+</span>
            <span className="text-muted-foreground">Lost to approval exploits</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">100K+</span>
            <span className="text-muted-foreground">Wallets scanned</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-green-500">Free</span>
            <span className="text-muted-foreground">To use, forever</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to secure your assets
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <Card className="border-none bg-transparent">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">1</span>
                </div>
                <CardTitle>Connect Wallet</CardTitle>
                <CardDescription>
                  Connect your wallet securely using WalletConnect or MetaMask.
                  We never have access to your private keys.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none bg-transparent">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Review Approvals</CardTitle>
                <CardDescription>
                  We scan your wallet and show all active token approvals,
                  highlighting high-risk unlimited allowances.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none bg-transparent">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>Revoke with One Click</CardTitle>
                <CardDescription>
                  Revoke unnecessary approvals instantly. A single transaction
                  removes the risk from your wallet.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Sovereign Revoke?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built by security researchers, for the Web3 community
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  No tracking, no data collection. Your wallet activity stays private.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Non-Custodial</CardTitle>
                <CardDescription>
                  We never touch your funds. All transactions are signed by you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Multi-Chain</CardTitle>
                <CardDescription>
                  Support for Ethereum, Polygon, Arbitrum, Optimism, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  Automatic risk scoring based on approval amount and contract reputation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Real-Time Alerts</CardTitle>
                <CardDescription>
                  Get notified when new approvals are detected. (Pro feature)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Open Source</CardTitle>
                <CardDescription>
                  Fully transparent. Audit our code on GitHub anytime.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Protect Your Assets Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            It takes less than a minute to scan and secure your wallet.
          </p>
          <Link href="/dashboard" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
