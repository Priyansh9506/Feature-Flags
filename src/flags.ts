import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

export const navigationLayoutFlag = flag<"sidebar" | "topnav" | "bottom-nav">({
  key: "navigation-layout",
  description: "Switch between sidebar, top nav, or bottom nav layout",
  options: [
    { label: "Sidebar", value: "sidebar" },
    { label: "Top Nav", value: "topnav" },
    { label: "Bottom Nav", value: "bottom-nav" },
  ],
  defaultValue: "sidebar",
  adapter: vercelAdapter,
});

export const showAnnouncementBannerFlag = flag<boolean>({
  key: "show-announcement-banner",
  description: "Show the announcement banner at the top of the dashboard",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  defaultValue: true,
  adapter: vercelAdapter,
});

export const heroVariantFlag = flag<"A" | "B">({
  key: "hero-variant",
  description: "Choose between hero section designs A or B",
  options: [
    { label: "Variant A - Welcome Back", value: "A" },
    { label: "Variant B - Overview", value: "B" },
  ],
  defaultValue: "A",
  adapter: vercelAdapter,
});

export const enableGradientCardsFlag = flag<boolean>({
  key: "enable-gradient-cards",
  description: "Enable gradient background on stat cards",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  defaultValue: false,
  adapter: vercelAdapter,
});

export const showPremiumPricingFlag = flag<boolean>({
  key: "show-premium-pricing",
  description: "Show the Enterprise pricing tier",
  options: [
    { label: "Show", value: true },
    { label: "Hide", value: false },
  ],
  defaultValue: false,
  adapter: vercelAdapter,
});

export const enableAiChatFlag = flag<boolean>({
  key: "enable-ai-chat",
  description: "Enable the AI chat assistant widget",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  defaultValue: false,
  adapter: vercelAdapter,
});

export const showTestimonialsFlag = flag<boolean>({
  key: "show-testimonials",
  description: "Show the testimonials section on the dashboard",
  options: [
    { label: "Visible", value: true },
    { label: "Hidden", value: false },
  ],
  defaultValue: false,
  adapter: vercelAdapter,
});

export const enableAnimationsFlag = flag<boolean>({
  key: "enable-animations",
  description: "Enable hover animations and micro-interactions",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  defaultValue: true,
  adapter: vercelAdapter,
});
