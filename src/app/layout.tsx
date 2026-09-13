import type { Metadata } from "next";
export const dynamic = "force-dynamic";

import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DashboardLayout } from "@/components/dashboard-layout";
import { VercelToolbar } from "@vercel/toolbar/next";
import { evaluate } from "flags/next";
import {
  navigationLayoutFlag, showAnnouncementBannerFlag, heroVariantFlag,
  enableGradientCardsFlag, showPremiumPricingFlag, enableAiChatFlag,
  showTestimonialsFlag, enableAnimationsFlag
} from "@/flags";
import type { FeatureFlags } from "@/services/feature-flags";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "FlagUI — Feature Flag Dashboard",
  description: "Manage feature flags, run experiments, and control releases with LaunchDarkly",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [
    navigationLayout,
    showAnnouncementBanner,
    heroVariant,
    enableGradientCards,
    showPremiumPricing,
    enableAiChat,
    showTestimonials,
    enableAnimations,
  ] = await evaluate([
    navigationLayoutFlag,
    showAnnouncementBannerFlag,
    heroVariantFlag,
    enableGradientCardsFlag,
    showPremiumPricingFlag,
    enableAiChatFlag,
    showTestimonialsFlag,
    enableAnimationsFlag,
  ]);

  const initialFlags: FeatureFlags = {
    "navigation-layout": navigationLayout,
    "show-announcement-banner": showAnnouncementBanner,
    "hero-variant": heroVariant,
    "enable-gradient-cards": enableGradientCards,
    "show-premium-pricing": showPremiumPricing,
    "enable-ai-chat": enableAiChat,
    "show-testimonials": showTestimonials,
    "enable-animations": enableAnimations,
  };

  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-light">
        <Providers initialFlags={initialFlags}>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}
