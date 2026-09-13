import { NextResponse } from "next/server";
import { evaluate } from "flags/next";
import {
  enableAiChatFlag,
  enableAnimationsFlag,
  enableGradientCardsFlag,
  heroVariantFlag,
  navigationLayoutFlag,
  showAnnouncementBannerFlag,
  showPremiumPricingFlag,
  showTestimonialsFlag,
} from "@/flags";
import type { FeatureFlags } from "@/services/feature-flags";

export const dynamic = "force-dynamic";

function getRuntimeState() {
  return {
    flagsAuth: process.env.FLAGS
      ? "FLAGS"
      : process.env.VERCEL_OIDC_TOKEN
        ? "OIDC"
        : "Missing",
    flagsSecret: process.env.FLAGS_SECRET ? "Set" : "Missing",
  };
}

export async function GET() {
  try {
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

    const featureFlags: FeatureFlags = {
      "navigation-layout": navigationLayout,
      "show-announcement-banner": showAnnouncementBanner,
      "hero-variant": heroVariant,
      "enable-gradient-cards": enableGradientCards,
      "show-premium-pricing": showPremiumPricing,
      "enable-ai-chat": enableAiChat,
      "show-testimonials": showTestimonials,
      "enable-animations": enableAnimations,
    };

    return NextResponse.json({
      success: true,
      env: getRuntimeState(),
      flags: featureFlags,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { success: false, error: message, env: getRuntimeState() },
      { status: 500 },
    );
  }
}
