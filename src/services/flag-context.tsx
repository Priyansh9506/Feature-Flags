"use client";

import React, { createContext, useContext, useState } from "react";
import { DEFAULT_FLAGS, type FeatureFlags } from "@/services/feature-flags";

interface FlagContextValue {
  flags: FeatureFlags;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({ children, initialFlags }: { children: React.ReactNode, initialFlags?: FeatureFlags }) {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    if (initialFlags) {
      return { ...DEFAULT_FLAGS, ...initialFlags };
    }
    return { ...DEFAULT_FLAGS };
  });

  // Automatically sync client state if initialFlags change (e.g. Vercel Toolbar toggles them in development)
  React.useEffect(() => {
    if (initialFlags) {
      setFlags((prev) => ({ ...prev, ...initialFlags }));
    }
  }, [initialFlags]);

  return (
    <FlagContext.Provider value={{ flags }}>
      {children}
    </FlagContext.Provider>
  );
}

export function useFeatureFlags(): FeatureFlags {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error("useFeatureFlags must be used within FlagProvider");
  return ctx.flags;
}

