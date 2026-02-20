"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Doctors",
      href: "/dashboard/doctors",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50">
      
      {/* ✅ DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-linear-to-b from-blue-700 to-blue-900 text-white shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-blue-500">
          🏥 Schedula
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition cursor-pointer ${pathname === item.href ? "bg-blue-500" : ""}`}>
                <item.icon size={18} />
                {item.name}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-600">
          <Button
            variant="destructive"
            className="w-full"
            onClick={logout}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* ✅ MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-blue-900 text-white transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-blue-700">
          <span className="text-xl font-bold">Schedula</span>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700"
              >
                <item.icon size={18} />
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ✅ MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <div className="flex items-center gap-3">
            <Menu
              className="md:hidden cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <h1 className="text-xl font-semibold text-blue-700">
              Welcome, {user?.email}
            </h1>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}