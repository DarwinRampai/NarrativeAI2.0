import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PenSquare, 
  Video,
  Settings,
  UserCircle
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Script Generator", href: "/script-generator", icon: PenSquare },
  { name: "Neural Avatars", href: "/avatars", icon: UserCircle },
  { name: "Video Editor", href: "/video-editor", icon: Video },
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
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-1 rounded-md",
                  isActive ? "bg-primary-foreground/10" : "bg-primary/10"
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