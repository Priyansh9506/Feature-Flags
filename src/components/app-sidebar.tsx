import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { mainNav, configNav } from "@/config/nav";
import { Flag } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-zinc-800">
      <SidebarHeader className="h-14 flex flex-row items-center gap-2.5 px-4 border-b border-zinc-800">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800">
          <Flag className="h-3.5 w-3.5 text-zinc-300" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-200 tracking-tight">FlagUI</span>
          <span className="text-[10px] text-zinc-600 leading-none">v1.0.0</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-zinc-600">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} className="flex items-center gap-2.5" />}>
                    <item.icon className="h-4 w-4 text-zinc-500" />
                    <span className="text-sm text-zinc-400">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-zinc-800" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-zinc-600">
            Config
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} className="flex items-center gap-2.5" />}>
                    <item.icon className="h-4 w-4 text-zinc-500" />
                    <span className="text-sm text-zinc-400">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="h-7 w-7 rounded-md bg-zinc-800 flex items-center justify-center text-[10px] font-medium text-zinc-400">
            PS
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-zinc-300 truncate">Priyansh</span>
            <span className="text-[10px] text-zinc-600 truncate">Developer</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
