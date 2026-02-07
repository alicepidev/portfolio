import type { ReactNode } from "react";
import SiteHeader from "@/components/site/SiteHeader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="transparent" />
      {children}
    </>
  );
}
