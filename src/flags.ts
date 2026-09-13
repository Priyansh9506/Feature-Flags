import { flag } from '@vercel/flags/next';

export const navigationLayoutFlag = flag({
  key: 'navigation-layout',
  description: 'Change between sidebar, top nav, or bottom nav',
  options: [
    { label: 'Sidebar', value: 'sidebar' },
    { label: 'Top Nav', value: 'topnav' },
    { label: 'Bottom Nav', value: 'bottom-nav' }
  ],
  defaultValue: 'sidebar',
  decide: () => 'sidebar',
});

export const showAnnouncementBannerFlag = flag({
  key: 'show-announcement-banner',
  defaultValue: true,
  decide: () => true,
});

export const heroVariantFlag = flag({
  key: 'hero-variant',
  options: [{ value: 'A' }, { value: 'B' }],
  defaultValue: 'A',
  decide: () => 'A',
});

export const enableGradientCardsFlag = flag({
  key: 'enable-gradient-cards',
  defaultValue: false,
  decide: () => false,
});

export const showPremiumPricingFlag = flag({
  key: 'show-premium-pricing',
  defaultValue: false,
  decide: () => false,
});

export const enableAiChatFlag = flag({
  key: 'enable-ai-chat',
  defaultValue: false,
  decide: () => false,
});

export const showTestimonialsFlag = flag({
  key: 'show-testimonials',
  defaultValue: false,
  decide: () => false,
});

export const enableAnimationsFlag = flag({
  key: 'enable-animations',
  defaultValue: true,
  decide: () => true,
});
