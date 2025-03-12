import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PenSquare, Video } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Script Generator", href: "/script-generator", icon: PenSquare },
  { name: "Video Editor", href: "/video-editor", icon: Video },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-16 left-0 bottom-0 w-64 border-r bg-background">
      <div className="space-y-4 py-4">
        {navigation.map((item) => {
          const isActive = location.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2 mx-3 rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}