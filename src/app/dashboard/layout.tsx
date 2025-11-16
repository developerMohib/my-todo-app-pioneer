"use client";

import { useState, ReactNode } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Home, User, List, Bell, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DashboardLayoutProps {
    children: ReactNode;
}

interface SidebarLinkProps {
    href: string;
    label: string;
    icon: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [value] = useState(new Date());

    return (
        <div className="flex h-screen bg-[#EEF7FF]">
            {/* SIDEBAR */}
            <aside className="w-64 bg-[#0D224A] text-white p-6 space-y-6">
                <h1 className="text-xl font-semibold">My Dashboard</h1>

                <nav className="space-y-2">
                    <SidebarLink href="/dashboard" icon={<Home size={18} />} label="Dashboard" />
                    <SidebarLink href="/dashboard/todos" icon={<List size={18} />} label="Todos" />
                    <SidebarLink href="/dashboard/account" icon={<User size={18} />} label="Account Information" />
                </nav>
            </aside>
            {/* MAIN AREA */}
            <main className="flex-1 overflow-y-auto">

                <header className="mb-8 flex justify-between items-center bg-white px-8 py-2">

                    {/* LOGO AREA */}
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <figure className="flex items-center gap-3">
                            <Image src="/logo.png" alt="Dreamy Software Logo" width={40} height={40} />

                            <figcaption>
                                <h1 className="text-base font-bold leading-tight">
                                    <span className="block font-extrabold">DREAMY</span>
                                    <span className="block">SOFTWARE</span>
                                </h1>
                            </figcaption>
                        </figure>
                    </Link>

                    {/* ACTION BUTTONS */}
                    <nav className="flex items-center gap-4">
                        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Bell size={18} />
                        </button>

                        <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">
                            <CalendarDays size={18} />
                        </button>

                        {/* Render dynamic date */}
                        <div>
                            <p className="font-medium">
                                {value.toLocaleDateString("en-US", { weekday: "long" })}
                            </p>
                            <p className="text-sm text-gray-600">
                                {value.toLocaleDateString("en-GB")}
                            </p>
                        </div>
                    </nav>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>

        </div>
    );
}

function SidebarLink({ href, label, icon }: SidebarLinkProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2 text-gray-200 rounded-lg hover:bg-white/10"
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
