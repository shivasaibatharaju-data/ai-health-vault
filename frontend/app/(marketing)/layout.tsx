import type {ReactNode} from "react";

import {MarketingHeader} from "@/components/marketing-header";
import {SiteFooter} from "@/components/site-footer";

export default function MarketingLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
