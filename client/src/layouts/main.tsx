import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {showSidebar && <Sidebar />}
      <main className={`${showSidebar ? 'ml-[280px] pt-16' : 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
}