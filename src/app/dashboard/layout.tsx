import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const navItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard,
      description: "Overview & progress"
    },
    { 
      name: "Shadow Operator", 
      href: "/dashboard/shadow-operator", 
      icon: Calendar,
      description: "14-day strategic plan"
    },
    { 
      name: "Brand Analysis", 
      href: "/dashboard/brand-analysis", 
      icon: BarChart3,
      description: "Market research tools"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-slate-900 text-sm leading-tight">Shadow Operator</span>
                <span className="text-xs text-slate-500">Dashboard</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {session.user?.email?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm text-slate-600 max-w-[150px] truncate">
                  {session.user?.email}
                </span>
              </div>
              <form
                action={async () => {
                  "use server";
                  const { signOut } = await import("@/auth");
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
