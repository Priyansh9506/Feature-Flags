"use client";

import { useState } from "react";
import { SlidersHorizontal, RotateCcw, X } from "lucide-react";
import { useFeatureFlags, useFlagControls } from "@/services/flag-context";
import { FLAG_METADATA, type FeatureFlags } from "@/services/feature-flags";

const HERO_OPTIONS = ["A", "B"] as const;

export function DebugPanel() {
  const [open, setOpen] = useState(false);
  const flags = useFeatureFlags();
  const { setFlag, resetFlags } = useFlagControls();

  const flagKeys = Object.keys(FLAG_METADATA) as (keyof FeatureFlags)[];

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
        title="Debug Panel"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-16 right-5 z-50 w-72 max-h-[65vh] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-zinc-300">Flags</span>
              <span className="text-[10px] text-zinc-600">{flagKeys.length}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={resetFlags}
                className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Reset"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Flags */}
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {flagKeys.map((key) => {
              const meta = FLAG_METADATA[key];
              const value = flags[key];

              return (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-zinc-900 transition-colors"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-[11px] font-medium text-zinc-300">{meta.label}</p>
                    <p className="text-[10px] text-zinc-600 truncate">{meta.description}</p>
                  </div>

                  {meta.type === "boolean" ? (
                    <button
                      onClick={() => setFlag(key, !value as any)}
                      className={`relative h-5 w-9 rounded-full transition-colors shrink-0 ${
                        value ? "bg-zinc-300" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full shadow-sm transition-transform ${
                          value ? "translate-x-4 bg-zinc-950" : "translate-x-0 bg-zinc-500"
                        }`}
                      />
                    </button>
                  ) : key === "hero-variant" ? (
                    <div className="flex gap-0.5 shrink-0">
                      {HERO_OPTIONS.map((v) => (
                        <button
                          key={v}
                          onClick={() => setFlag(key, v as any)}
                          className={`h-5 w-7 rounded text-[10px] font-medium transition-colors ${
                            value === v
                              ? "bg-zinc-300 text-zinc-950"
                              : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-zinc-800">
            <p className="text-[10px] text-zinc-700 text-center">
              LaunchDarkly sync available
            </p>
          </div>
        </div>
      )}
    </>
  );
}
