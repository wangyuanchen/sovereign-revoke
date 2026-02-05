import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Web3Provider } from "@/providers/web3-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sovereign Revoke | Protect Your Crypto Assets",
  description:
    "Scan and revoke unlimited token approvals to secure your wallet from potential exploits.",
  keywords: ["crypto", "security", "token approvals", "revoke", "web3", "ethereum"],
  authors: [{ name: "SVGN" }],
  openGraph: {
    title: "Sovereign Revoke | Protect Your Crypto Assets",
    description:
      "Scan and revoke unlimited token approvals to secure your wallet from potential exploits.",
    url: "https://revoke.svgn.org",
    siteName: "Sovereign Revoke",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Revoke | Protect Your Crypto Assets",
    description:
      "Scan and revoke unlimited token approvals to secure your wallet from potential exploits.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Web3Provider>{children}</Web3Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
