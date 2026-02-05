import Link from "next/link";
import { Shield } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Shield className="h-6 w-6" />
      <span className="text-xl font-bold tracking-tight">SVGN</span>
      <span className="text-muted-foreground">Revoke</span>
    </Link>
  );
}
