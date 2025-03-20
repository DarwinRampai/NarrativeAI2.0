import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(109,40,217,0.05) 0%, rgba(109,40,217,0.02) 50%, transparent 100%)",
            "radial-gradient(circle at 100% 100%, rgba(109,40,217,0.05) 0%, rgba(109,40,217,0.02) 50%, transparent 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative z-10">
        <Navbar />
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="ml-[280px] pt-16"
        >
          <motion.div 
            className="p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.main>
      </div>

      {/* Holographic grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(to_right,_rgba(109,40,217,0.05)_1px,_transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-30" />
    </div>
  );
}