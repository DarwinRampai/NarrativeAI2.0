import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 h-16 border-b border-primary/10 bg-background/60 backdrop-blur-xl z-50"
    >
      <div className="h-full px-6 flex items-center justify-between relative">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/">
            <Button 
              variant="link" 
              className="text-2xl font-bold p-0 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 relative group"
            >
              <span className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              NarratixAI
            </Button>
          </Link>
        </motion.div>

        {user && (
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors duration-300"
              >
                <Bell className="h-5 w-5" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"
                />
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-full relative bg-background/50 backdrop-blur-sm p-0 border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300"
                >
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background"
                  />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 mt-1 bg-background/80 backdrop-blur-xl border border-primary/10"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <motion.div whileHover={{ backgroundColor: "rgba(109,40,217,0.1)" }}>
                  <DropdownMenuItem className="focus:bg-primary/10">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.username}</span>
                  </DropdownMenuItem>
                </motion.div>
                <motion.div whileHover={{ backgroundColor: "rgba(109,40,217,0.1)" }}>
                  <DropdownMenuItem className="focus:bg-primary/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </motion.div>
                <DropdownMenuSeparator className="bg-primary/10" />
                <motion.div whileHover={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                  <DropdownMenuItem
                    onClick={() => logoutMutation.mutate()}
                    className="text-red-500 focus:text-red-500 focus:bg-red-500/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </motion.header>
  );
}