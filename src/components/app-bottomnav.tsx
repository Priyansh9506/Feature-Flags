import { mainNav, configNav } from "@/config/nav";
import { PlusCircle } from "lucide-react";

export function AppBottomNav() {
  // Let's use 4 main items and a central action button to mimic mobile apps
  const visibleNav = mainNav.slice(0, 4);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/95 px-2 pb-safe backdrop-blur-sm sm:hidden">
      {visibleNav.slice(0, 2).map((item) => (
        <a
          key={item.title}
          href={item.url}
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-none">{item.title}</span>
        </a>
      ))}

      {/* Central prominent button */}
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-colors -translate-y-2">
        <PlusCircle className="h-6 w-6" />
      </button>

      {visibleNav.slice(2, 4).map((item) => (
        <a
          key={item.title}
          href={item.url}
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-none">{item.title}</span>
        </a>
      ))}
    </div>
  );
}
