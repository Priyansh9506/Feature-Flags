"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { DEFAULT_FLAGS, type FeatureFlags } from "@/services/feature-flags";

interface FlagContextValue {
  flags: FeatureFlags;
  setFlag: <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => void;
  resetFlags: () => void;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({ children, initialFlags }: { children: React.ReactNode, initialFlags?: FeatureFlags }) {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    // If Vercel flags provided them via SSR, use those as priority
    if (initialFlags) {
      return { ...DEFAULT_FLAGS, ...initialFlags };
    }
    // Fallback to local storage (useful if we want local persistence without toolbar)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ff-debug-flags");
      if (saved) {
        try {
          return { ...DEFAULT_FLAGS, ...JSON.parse(saved) };
        } catch {
          // ignore
        }
      }
    }
    return { ...DEFAULT_FLAGS };
  });

  // Automatically sync client state if initialFlags change (e.g. Vercel Toolbar toggles them)
  React.useEffect(() => {
    if (initialFlags) {
      setFlags((prev) => ({ ...prev, ...initialFlags }));
    }
  }, [initialFlags]);

  const setFlag = useCallback(
    <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => {
      setFlags((prev) => {
        const next = { ...prev, [key]: value };
        if (typeof window !== "undefined") {
          localStorage.setItem("ff-debug-flags", JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  const resetFlags = useCallback(() => {
    setFlags({ ...DEFAULT_FLAGS });
    if (typeof window !== "undefined") {
      localStorage.removeItem("ff-debug-flags");
    }
  }, []);

  return (
    <FlagContext.Provider value={{ flags, setFlag, resetFlags }}>
      {children}
    </FlagContext.Provider>
  );
}

export function useFeatureFlags(): FeatureFlags {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error("useFeatureFlags must be used within FlagProvider");
  return ctx.flags;
}

export function useFlagControls() {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error("useFlagControls must be used within FlagProvider");
  return { setFlag: ctx.setFlag, resetFlags: ctx.resetFlags };
}
