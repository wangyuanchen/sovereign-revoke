import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { AlertTriangle, ArrowRight, CheckCircle, Shield, Eye, Ban, Globe } from "lucide-react";

export default function LandingPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero */}
      <section className="container flex flex-1 flex-col items-center justify-center gap-8 py-20 text-center md:py-32">
        <div className="flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span>Your wallet may be at risk</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {t("landing.hero.title")}
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {t("landing.hero.subtitle")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              {t("landing.hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              {t("landing.hero.learnMore")}
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

      {/* Features */}
      <section id="features" className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("landing.features.title")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Eye className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{t("landing.features.scan.title")}</CardTitle>
                <CardDescription>
                  {t("landing.features.scan.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{t("landing.features.risk.title")}</CardTitle>
                <CardDescription>
                  {t("landing.features.risk.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Ban className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{t("landing.features.revoke.title")}</CardTitle>
                <CardDescription>
                  {t("landing.features.revoke.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{t("landing.features.privacy.title")}</CardTitle>
                <CardDescription>
                  {t("landing.features.privacy.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{t("landing.features.free.title")}</CardTitle>
                <CardDescription>
                  {t("landing.features.free.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{t("landing.features.multichain.title")}</CardTitle>
                <CardDescription>
                  {t("landing.features.multichain.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.cta.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.cta.subtitle")}
          </p>
          <Link href="/dashboard" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              {t("landing.cta.button")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
