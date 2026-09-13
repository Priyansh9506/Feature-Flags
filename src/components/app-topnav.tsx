import { mainNav, configNav } from "@/config/nav";
import { Flag } from "lucide-react";

export function AppTopNav() {
  const allNav = [...mainNav, ...configNav];

  return (
    <nav className="flex items-center gap-6 overflow-x-auto px-4 w-full no-scrollbar">
      <div className="flex items-center gap-2 mr-4 shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
          <Flag className="h-3.5 w-3.5 text-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground tracking-tight">FlagUI</span>
      </div>

      <div className="flex items-center gap-1">
        {allNav.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors whitespace-nowrap"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
