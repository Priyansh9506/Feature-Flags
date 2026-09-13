import { flag } from '@vercel/flags/next';
import { get } from '@vercel/global-config';

export const navigationLayoutFlag = flag({
  key: 'navigation-layout',
  description: 'Switch between sidebar, top nav, or bottom nav layout',
  options: [
    { label: 'Sidebar', value: 'sidebar' },
    { label: 'Top Nav', value: 'topnav' },
    { label: 'Bottom Nav', value: 'bottom-nav' },
  ],
  defaultValue: 'sidebar',
  decide: async () => {
    try {
      return (await get('navigation-layout')) as 'sidebar' | 'topnav' | 'bottom-nav' ?? 'sidebar';
    } catch {
      return 'sidebar';
    }
  },
});

export const showAnnouncementBannerFlag = flag({
  key: 'show-announcement-banner',
  description: 'Show the announcement banner at the top of the dashboard',
  options: [
    { label: 'Visible', value: true },
    { label: 'Hidden', value: false },
  ],
  defaultValue: true,
  decide: async () => {
    try {
      return (await get('show-announcement-banner')) as boolean ?? true;
    } catch {
      return true;
    }
  },
});

export const heroVariantFlag = flag({
  key: 'hero-variant',
  description: 'Choose between hero section designs A or B',
  options: [
    { label: 'Variant A – Welcome Back', value: 'A' },
    { label: 'Variant B – Overview', value: 'B' },
  ],
  defaultValue: 'A',
  decide: async () => {
    try {
      return (await get('hero-variant')) as 'A' | 'B' ?? 'A';
    } catch {
      return 'A';
    }
  },
});

export const enableGradientCardsFlag = flag({
  key: 'enable-gradient-cards',
  description: 'Enable gradient background on stat cards',
  options: [
    { label: 'Enabled', value: true },
    { label: 'Disabled', value: false },
  ],
  defaultValue: false,
  decide: async () => {
    try {
      return (await get('enable-gradient-cards')) as boolean ?? false;
    } catch {
      return false;
    }
  },
});

export const showPremiumPricingFlag = flag({
  key: 'show-premium-pricing',
  description: 'Show the Enterprise pricing tier',
  options: [
    { label: 'Show', value: true },
    { label: 'Hide', value: false },
  ],
  defaultValue: false,
  decide: async () => {
    try {
      return (await get('show-premium-pricing')) as boolean ?? false;
    } catch {
      return false;
    }
  },
});

export const enableAiChatFlag = flag({
  key: 'enable-ai-chat',
  description: 'Enable the AI chat assistant widget',
  options: [
    { label: 'Enabled', value: true },
    { label: 'Disabled', value: false },
  ],
  defaultValue: false,
  decide: async () => {
    try {
      return (await get('enable-ai-chat')) as boolean ?? false;
    } catch {
      return false;
    }
  },
});

export const showTestimonialsFlag = flag({
  key: 'show-testimonials',
  description: 'Show the testimonials section on the dashboard',
  options: [
    { label: 'Visible', value: true },
    { label: 'Hidden', value: false },
  ],
  defaultValue: false,
  decide: async () => {
    try {
      return (await get('show-testimonials')) as boolean ?? false;
    } catch {
      return false;
    }
  },
});

export const enableAnimationsFlag = flag({
  key: 'enable-animations',
  description: 'Enable hover animations and micro-interactions',
  options: [
    { label: 'Enabled', value: true },
    { label: 'Disabled', value: false },
  ],
  defaultValue: true,
  decide: async () => {
    try {
      return (await get('enable-animations')) as boolean ?? true;
    } catch {
      return true;
    }
  },
});

