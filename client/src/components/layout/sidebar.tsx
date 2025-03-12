import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PenSquare, 
  Video,
  Settings,
  UserCircle,
  Sparkles
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Script Generator", href: "/script-generator", icon: PenSquare },
  { name: "Neural Avatars", href: "/avatars", icon: UserCircle },
  { name: "Video Editor", href: "/video-editor", icon: Video },
  { name: "Autonomous Ads", href: "/autonomous-ads", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-16 left-0 bottom-0 w-64 border-r border-border/40 bg-background/80 backdrop-blur-sm z-40">
      <div className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "menu-item",
                  isActive ? "menu-item-active" : "menu-item-inactive"
                )}
              >
                <div className={cn(
                  "menu-icon-container",
                  isActive ? "menu-icon-active" : "menu-icon-inactive"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute right-4 h-2 w-2 rounded-full bg-primary-foreground/50" />
                )}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}