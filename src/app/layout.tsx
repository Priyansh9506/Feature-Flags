import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DashboardLayout } from "@/components/dashboard-layout";
import { VercelToolbar } from '@vercel/toolbar/next';
import { 
  navigationLayoutFlag, showAnnouncementBannerFlag, heroVariantFlag,
  enableGradientCardsFlag, showPremiumPricingFlag, enableAiChatFlag,
  showTestimonialsFlag, enableAnimationsFlag
} from "@/flags";

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
  const initialFlags = {
    "navigation-layout": await navigationLayoutFlag(),
    "show-announcement-banner": await showAnnouncementBannerFlag(),
    "hero-variant": await heroVariantFlag(),
    "enable-gradient-cards": await enableGradientCardsFlag(),
    "show-premium-pricing": await showPremiumPricingFlag(),
    "enable-ai-chat": await enableAiChatFlag(),
    "show-testimonials": await showTestimonialsFlag(),
    "enable-animations": await enableAnimationsFlag(),
  };

  const shouldInjectToolbar = process.env.NODE_ENV === 'development';

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-light">
        <Providers initialFlags={initialFlags as any}>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}

