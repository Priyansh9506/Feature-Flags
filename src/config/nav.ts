import {
  BarChart3,
  Flag,
  Home,
  Layers,
  Settings,
  Users,
  Zap,
  FlaskConical,
} from "lucide-react";

export const mainNav = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Feature Flags", url: "#", icon: Flag },
  { title: "Experiments", url: "#", icon: FlaskConical },
  { title: "Analytics", url: "#", icon: BarChart3 },
  { title: "Users", url: "#", icon: Users },
];

export const configNav = [
  { title: "Environments", url: "#", icon: Layers },
  { title: "Integrations", url: "#", icon: Zap },
  { title: "Settings", url: "#", icon: Settings },
];
