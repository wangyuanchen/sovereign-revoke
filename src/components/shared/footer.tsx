"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { Github } from "lucide-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t("footer.description")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/wangyuanchen/sovereign-revoke"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">{t("footer.links.github")}</span>
          </Link>
          <Link
            href="https://x.com/Lyuansen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="sr-only">{t("footer.links.twitter")}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
