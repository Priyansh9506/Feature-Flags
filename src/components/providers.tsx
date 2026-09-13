"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FlagProvider } from "@/services/flag-context";
import { ThemeProvider } from "@/services/theme-context";
import type { FeatureFlags } from "@/services/feature-flags";

export function Providers({ children, initialFlags }: { children: React.ReactNode, initialFlags?: FeatureFlags }) {
  return (
    <ThemeProvider>
      <FlagProvider initialFlags={initialFlags}>
        <TooltipProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </TooltipProvider>
      </FlagProvider>
    </ThemeProvider>
  );
}
