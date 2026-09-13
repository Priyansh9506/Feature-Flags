"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopNav } from "@/components/app-topnav";
import { AppBottomNav } from "@/components/app-bottomnav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFeatureFlags } from "@/services/flag-context";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const flags = useFeatureFlags();
  const navLayout = flags["navigation-layout"];

  const showSidebar = navLayout === "sidebar";
  const showTopNav = navLayout === "topnav";
  const showBottomNav = navLayout === "bottom-nav";

  return (
    <div className="flex h-screen w-full overflow-hidden pb-safe">
      {showSidebar && <AppSidebar />}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-4 border-b shrink-0 bg-background/80 backdrop-blur-sm gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {showSidebar && (
              <>
                <SidebarTrigger className="h-8 w-8 shrink-0" />
                <Separator orientation="vertical" className="h-5" />
              </>
            )}
            
            {showTopNav ? (
              <AppTopNav />
            ) : (
              <div className="relative ml-2 hidden sm:block shrink-0">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="h-8 w-64 pl-8 text-sm bg-muted/50 border-none focus-visible:ring-1"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500" />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 overflow-auto ${showBottomNav ? 'pb-16 sm:pb-0' : ''}`}>
          {children}
        </main>
        
        {/* Bottom Nav for mobile */}
        {showBottomNav && <AppBottomNav />}
      </div>
    </div>
  );
}
