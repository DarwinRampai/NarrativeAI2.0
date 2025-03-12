import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Chat } from "@/components/ui/chat";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
      <Chat />
    </div>
  );
}