import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export default function MainLayout({ children, showSidebar = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {showSidebar && <Sidebar />}
      <main className={`${showSidebar ? 'ml-64 pt-16' : 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
}
