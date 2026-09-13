export interface FeatureFlags {
  "show-announcement-banner": boolean;
  "hero-variant": "A" | "B";
  "enable-gradient-cards": boolean;
  "show-premium-pricing": boolean;
  "enable-ai-chat": boolean;
  "show-testimonials": boolean;
  "enable-animations": boolean;
  "navigation-layout": "sidebar" | "topnav" | "bottom-nav";
}

export const FLAG_METADATA: Record<
  keyof FeatureFlags,
  { label: string; description: string; type: "boolean" | "string" }
> = {
  "show-announcement-banner": {
    label: "Announcement Banner",
    description: "Promotional banner at the top",
    type: "boolean",
  },
  "hero-variant": {
    label: "Hero Variant",
    description: "A/B test hero section design",
    type: "string",
  },
  "enable-gradient-cards": {
    label: "Gradient Cards",
    description: "Subtle gradient on stat cards",
    type: "boolean",
  },
  "show-premium-pricing": {
    label: "Enterprise Tier",
    description: "Show enterprise pricing card",
    type: "boolean",
  },
  "enable-ai-chat": {
    label: "AI Chat Widget",
    description: "Floating assistant",
    type: "boolean",
  },
  "show-testimonials": {
    label: "Testimonials",
    description: "User testimonial section",
    type: "boolean",
  },
  "enable-animations": {
    label: "Micro Animations",
    description: "Hover and entrance effects",
    type: "boolean",
  },
  "navigation-layout": {
    label: "Navigation Layout",
    description: "Change between sidebar, top nav, or bottom nav",
    type: "string",
  },
};

export const DEFAULT_FLAGS: FeatureFlags = {
  "show-announcement-banner": true,
  "hero-variant": "A",
  "enable-gradient-cards": false,
  "show-premium-pricing": false,
  "enable-ai-chat": false,
  "show-testimonials": false,
  "enable-animations": true,
  "navigation-layout": "sidebar",
};
