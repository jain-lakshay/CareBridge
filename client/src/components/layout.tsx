import { Link, useLocation } from "wouter";
import { 
  LayoutGrid, 
  Calendar, 
  Video, 
  Settings, 
  ShieldCheck,
  Stethoscope,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: LayoutGrid, label: "Find Doctors" },
    { href: "/my-bookings", icon: Calendar, label: "My Bookings" },
    { href: "/admin", icon: ShieldCheck, label: "Admin Portal" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col fixed inset-y-0 z-20">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl text-primary">CareBridge</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer text-sm font-medium ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xs">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Patient Account</span>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-muted-foreground" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
