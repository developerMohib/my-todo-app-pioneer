// "use client";

// import { ReactNode } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Sidebar } from "@/components/shared/SideBarDashboard";
// import { Bell, CalendarDays } from "lucide-react";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const currentDate = new Date();

//   return (
//     <div className="flex h-screen bg-[#EEF7FF]">
//       {/* Skip link for accessibility */}
//       <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded-lg z-50">
//         Skip to main content
//       </a>

//       {/* SIDEBAR */}
//       <Sidebar />

//       {/* MAIN AREA */}
//       <main id="main-content" className="flex-1 flex flex-col overflow-hidden">
//         <Header currentDate={currentDate} />

//         <div className="flex-1 overflow-y-auto p-6">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }


// function Header({ currentDate }: { currentDate: Date }) {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex justify-between items-center">
//         {/* LOGO AREA */}
//         <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
//           <figure className="flex items-center gap-3">
//             <Image
//               src="/logo.png"
//               alt="Dreamy Software Logo"
//               width={48}
//               height={48}
//               className="rounded-lg w-6 h-6 object-cover"
//             />
//             <figcaption>
//               <h1 className="text-sm leading-tight">
//                 <span className="block font-extrabold text-gray-900">DREAMY</span>
//                 <span className="block font-light text-gray-600">SOFTWARE</span>
//               </h1>
//             </figcaption>
//           </figure>
//         </Link>

//         {/* ACTION BUTTONS */}
//         <div className="flex items-center gap-4">
//           <button
//             className="p-2 bg-[#5272FF] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             aria-label="Notifications"
//           >
//             <Bell size={20} />
//           </button>

//           <button
//             className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
//             aria-label="Calendar"
//           >
//             <CalendarDays size={20} />
//           </button>

//           {/* Date Display */}
//           <div className="text-right">
//             <p className="font-semibold text-gray-900">
//               {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
//             </p>
//             <p className="text-sm text-gray-600">
//               {currentDate.toLocaleDateString("en-GB", {
//                 day: "numeric",
//                 month: "numeric",
//                 year: "numeric"
//               })}
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "@/components/shared/SideBarDashboard";
import { Bell, CalendarDays, Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const currentDate = new Date();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#EEF7FF]">
      {/* Skip link for accessibility */}
      <Link 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded-lg z-50"
      >
        Skip to main content
      </Link>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-72
      `}>
        <Sidebar onClose={closeSidebar} />
        
      </div>

      {/* MAIN AREA */}
      <main id="main-content" className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header 
          currentDate={currentDate} 
          onMenuToggle={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

interface HeaderProps {
  currentDate: Date;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

function Header({ currentDate, onMenuToggle, sidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex justify-between items-center">
        {/* LEFT SIDE - Logo and Mobile Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* LOGO AREA */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
          >
            <figure className="flex items-center gap-2 md:gap-3">
              <Image
                src="/logo.png"
                alt="Dreamy Software Logo"
                width={48}
                height={48}
                className="rounded-lg w-6 h-6 md:w-8 md:h-8 object-cover"
              />
              <figcaption className="hidden sm:block">
                <h1 className="text-sm leading-tight">
                  <span className="block font-extrabold text-gray-900">DREAMY</span>
                  <span className="block font-light text-gray-600">SOFTWARE</span>
                </h1>
              </figcaption>
            </figure>
          </Link>
        </div>

        {/* RIGHT SIDE - Action Buttons and Date */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="p-2 bg-[#5272FF] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Notifications"
            >
              <Bell size={18} className="md:w-5 md:h-5" />
            </button>

            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Calendar"
            >
              <CalendarDays size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Date Display */}
          <div className="text-right hidden xs:block">
            <p className="font-semibold text-gray-900 text-sm md:text-base">
              {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              {currentDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </p>
          </div>

          {/* Mobile Date Only (very small screens) */}
          <div className="text-right xs:hidden">
            <p className="font-semibold text-gray-900 text-xs">
              {currentDate.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <p className="text-xs text-gray-600">
              {currentDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}