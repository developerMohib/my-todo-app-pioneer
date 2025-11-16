"use client";

import { ReactNode } from "react";
import { Home, User, List, Bell, CalendarDays, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Constants for better maintainability
const NAVIGATION_ITEMS = [
  { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
  { href: "/dashboard/todos", icon: <List size={20} />, label: "Todos" },
  { href: "/dashboard/profile", icon: <User size={20} />, label: "Account Information" },
] as const;

const USER_DATA = {
  name: "Leroy Jenkins",
  role: "Full-stack developer",
  avatar: "https://avatars.githubusercontent.com/u/92154638?v=4"
} as const;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const currentDate = new Date();

  return (
    <div className="flex h-screen bg-[#EEF7FF]">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded-lg z-50">
        Skip to main content
      </a>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <main id="main-content" className="flex-1 flex flex-col overflow-hidden">
        <Header currentDate={currentDate} />
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function Sidebar() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <aside className="w-64 bg-[#0D224A] text-white flex flex-col">
      <div className="p-6 flex-1">
        {/* User Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <Image 
            src={USER_DATA.avatar} 
            alt={`${USER_DATA.name}'s avatar`}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full bg-gray-500 object-cover border-4 border-white/20"
            priority
          />
          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-semibold text-white">{USER_DATA.name}</h2>
            <p className="text-sm text-gray-300">{USER_DATA.role}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-gray-200 rounded-lg hover:bg-red-600/20 hover:text-red-200 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ href, label, icon }: typeof NAVIGATION_ITEMS[number]) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-linear-to-r from-cyan-900 to-[#0D224A] text-white"
          : "text-gray-200 hover:bg-linear-to-r from-cyan-900 to-[#0D224A] hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function Header({ currentDate }: { currentDate: Date }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* LOGO AREA */}
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <figure className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Dreamy Software Logo" 
              width={48} 
              height={48}
              className="rounded-lg w-6 h-6 object-cover"
            />
            <figcaption>
              <h1 className="text-sm leading-tight">
                <span className="block font-extrabold text-gray-900">DREAMY</span>
                <span className="block font-light text-gray-600">SOFTWARE</span>
              </h1>
            </figcaption>
          </figure>
        </Link>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          <button 
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label="Calendar"
          >
            <CalendarDays size={20} />
          </button>

          {/* Date Display */}
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <p className="text-sm text-gray-600">
              {currentDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}