"use client"
import { logoutUser } from "@/services/AuthService";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Home, User, List, LogOut, X } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

function SidebarLink({ href, label, icon }: typeof NAVIGATION_ITEMS[number]) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive
                ? "bg-linear-to-r from-[#5272FF50] to-[#0D224A] text-white"
                : "text-gray-200 hover:bg-linear-to-r from-[#5272FF50] to-[#0D224A] hover:text-white"
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}


// Constants for better maintainability
const NAVIGATION_ITEMS = [
    { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { href: "/dashboard/todos", icon: <List size={20} />, label: "Todos" },
    { href: "/dashboard/profile", icon: <User size={20} />, label: "Account Information" },
] as const;

const USER_DATA = {
    name: "Leroy Jenkins",
    email: "Full-stack@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/92154638?v=4"
} as const;




export function Sidebar({ onClose }: SidebarProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);

        try {
            const result = await logoutUser();

            if (result.success) {
                toast.success(result.message);
                router.push('/');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('An error occurred during logout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="w-64 bg-[#0D224A] text-white flex flex-col min-h-screen">
            {/* Close Button - Only visible on mobile when onClose prop is provided */}
            {onClose && (
                <button 
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>
            )}

            <div className="p-6 flex-1">
                {/* User Profile */}
                <div className="flex flex-col items-center text-center mb-8">
                    <Image
                        src={USER_DATA.avatar}
                        alt={`${USER_DATA.name}'s avatar`}
                        width={128}
                        height={128}
                        className="w-24 h-24 rounded-full object-cover border border-white"
                        priority
                    />
                    <div className="mt-2 space-y-1">
                        <h2 className="text-base font-semibold text-white">{USER_DATA.name}</h2>
                        <p className="text-sm text-gray-300">{USER_DATA.email}</p>
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
                    disabled={loading}
                    className="flex items-center gap-3 w-full px-3 py-2 text-gray-200 rounded-lg hover:bg-linear-to-r from-[#5272FF50] to-[#0D224A] transition-colors duration-200"
                >
                    <LogOut size={20} />
                    <span>
                        {loading ? 'Logging out...' : "Log out"}</span>
                </button>
            </div>
        </aside>
    );
}
