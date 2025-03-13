import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="ml-[280px] pt-16"
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
}