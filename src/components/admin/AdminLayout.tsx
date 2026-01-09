import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { 
  LayoutDashboard, 
  Images, 
  Calendar, 
  Users, 
  MessageSquare, 
  UserPlus,
  LogOut,
  Loader2,
  Shield,
  Home,
  Settings,
  ChevronRight,
  Menu
} from "lucide-react";
import eccaLogo from "@/assets/ecca-logo.jpg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Gallery", path: "/admin/gallery", icon: Images },
  { name: "Events", path: "/admin/events", icon: Calendar },
  { name: "Leadership", path: "/admin/leadership", icon: Users },
  { name: "Applications", path: "/admin/applications", icon: UserPlus },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24 bg-background">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-display font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have admin privileges. Please contact an administrator to get access.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button variant="destructive" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={eccaLogo} alt="ECCA" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">ECCA</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
            {user.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
          Management
        </p>
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1">{link.name}</span>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
        
        <div className="pt-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Quick Links
          </p>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <Home className="w-4 h-4" />
            <span>View Website</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex pt-16 lg:pt-20 bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 fixed left-0 top-16 lg:top-20 bottom-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-2">
        <div className="flex items-center justify-between">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <div className="flex flex-col h-full">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-display font-semibold text-sm">
            {sidebarLinks.find(l => l.path === location.pathname)?.name || "Admin"}
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40">
        <div className="flex justify-around p-2">
          {sidebarLinks.slice(0, 5).map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-all min-w-0",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] truncate">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pb-24 lg:pb-8 mt-12 lg:mt-0">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
