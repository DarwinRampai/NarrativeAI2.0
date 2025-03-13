import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  UserCircle,
  Settings,
  Sparkles,
  Plus,
  Home,
  Search,
  Bell,
  ChevronRight,
  Brain,
  Zap,
  Palette,
  Mic,
  X,
} from "lucide-react";

// Simulated AI suggestions based on user activity
const aiSuggestions = [
  { text: "Create a new ad campaign", route: "/create-ad", priority: "high" },
  { text: "Check campaign analytics", route: "/dashboard", priority: "medium" },
  { text: "Optimize existing ads", route: "/autonomous-ads", priority: "low" },
];

// Dummy notifications for demo
const notifications = [
  { id: 1, title: "Campaign Performance", message: "Your latest ad is performing 25% better!" },
  { id: 2, title: "AI Optimization", message: "New suggestions available for your campaigns" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Navigation items with dynamic highlighting
  const navigation = [
    { name: "Home", href: "/", icon: Home, aiScore: 85 },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, aiScore: 92 },
    { name: "Create Ad", href: "/create-ad", icon: Plus, aiScore: 95 },
    { name: "Neural Avatars", href: "/avatars", icon: UserCircle, aiScore: 78 },
    { name: "Autonomous Ads", href: "/autonomous-ads", icon: Sparkles, aiScore: 88 },
    { name: "Settings", href: "/settings", icon: Settings, aiScore: 70 },
  ];

  // Simulated voice navigation
  const handleVoiceCommand = () => {
    setIsListening(true);
    // Simulated voice recognition delay
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  // Dynamic search filtering
  const filteredNavigation = navigation.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.nav
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={cn(
        "fixed top-16 left-0 bottom-0 w-[280px] bg-background/80 backdrop-blur-lg border-r border-border/40 z-40",
        "transition-all duration-300 ease-in-out",
        isExpanded ? "w-[280px]" : "w-20"
      )}
    >
      <div className="h-full flex flex-col">
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-3 h-6 w-6 rounded-full bg-primary text-primary-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </Button>

        {/* Search and Voice */}
        <div className="p-4 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              className="pl-9 bg-background/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-5 w-5"
              onClick={handleVoiceCommand}
            >
              <Mic className={cn(
                "h-4 w-4",
                isListening && "text-primary animate-pulse"
              )} />
            </Button>
          </div>
        </div>

        {/* AI Suggestions */}
        <AnimatePresence>
          {searchQuery === "" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-2"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Brain className="h-4 w-4" />
                <span>AI Suggestions</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <Link key={index} href={suggestion.route}>
                  <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-primary/10 transition-colors">
                    <Zap className="h-4 w-4 text-primary" />
                    {suggestion.text}
                    <Badge variant="outline" className={cn(
                      "ml-auto",
                      suggestion.priority === "high" && "bg-red-500/10 text-red-500",
                      suggestion.priority === "medium" && "bg-yellow-500/10 text-yellow-500",
                      suggestion.priority === "low" && "bg-green-500/10 text-green-500"
                    )}>
                      {suggestion.priority}
                    </Badge>
                  </a>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-2 space-y-1 overflow-auto">
          {filteredNavigation.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-primary/10"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {/* AI Relevance Indicator */}
                  <div className="ml-auto h-1 w-8 rounded-full bg-primary/10">
                    <div
                      className="h-1 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${item.aiScore}%` }}
                    />
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle and Notifications */}
        <div className="p-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Palette className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                  {notifications.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Notifications Panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 left-4 right-4 bg-card rounded-lg border shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Notifications</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-2 rounded-md bg-primary/5 text-sm"
                  >
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-muted-foreground">{notification.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}