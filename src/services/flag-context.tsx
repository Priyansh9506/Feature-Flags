"use client";

import React, { createContext, useContext, useMemo } from "react";
import { DEFAULT_FLAGS, type FeatureFlags } from "@/services/feature-flags";

interface FlagContextValue {
  flags: FeatureFlags;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({
  children,
  initialFlags,
}: {
  children: React.ReactNode;
  initialFlags?: FeatureFlags;
}) {
  const flags = useMemo(
    () => ({ ...DEFAULT_FLAGS, ...initialFlags }),
    [initialFlags],
  );

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
