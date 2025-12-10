import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  CheckSquare, 
  ShieldAlert, 
  Settings, 
  Menu,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import ChatWidget from "./chat-widget";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/chores", icon: CheckSquare, label: "Chores" },
    { href: "/allergies", icon: ShieldAlert, label: "My Allergies" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-r border-sidebar-border">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-xl">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
        <span className="font-heading font-bold text-xl tracking-tight text-sidebar-foreground">
          AllergySafe
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold shadow-md">
            JS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Jane Smith</span>
            <span className="text-xs text-muted-foreground">Premium Plan</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full shadow-md bg-white/80 backdrop-blur-md">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative overflow-y-auto h-screen scroll-smooth">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628191139360-4083564d03fd?q=80&w=2070&auto=format&fit=crop')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto pb-24">
          {children}
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
