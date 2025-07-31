"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

const pathNameMap: Record<string, string> = {
  "/": "Home",
  "/stats": "Stats",
  "/bookmarks": "Bookmarks",
  "/books": "Books",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  const pageTitle =
    pathNameMap[pathname] ||
    pathname
      .replace("/", "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Unknown";

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b-4 border-gray-50 w-full text-gray-900 flex items-center justify-between px-6 h-16 relative">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Toggle sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dynamic Page Title */}
      {/*       <h1 className="text-indigo-600 text-3xl font-extrabold tracking-wide select-none capitalize">
        {pageTitle}
      </h1> */}
      {/* Search icon */}
      <button
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Search"
      >
        <Search className="w-6 h-6 text-gray-700" />
      </button>
      {/* Right side controls */}
      <div className="flex items-center space-x-6 relative">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Notifications"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 border-2 border-gray-300 bg-white text-sm z-20">
              <div className="p-4 border-b-2 border-gray-200 font-semibold">
                Notifications
              </div>
              <ul className="divide-y divide-gray-200">
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  📚 Book "React Mastery" updated
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  🔥 You've hit a 3-day streak!
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  💡 New idea suggestion logged
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full border-2 border-indigo-500 overflow-hidden w-9 h-9"
          >
            <Image
              src="/profile.png"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 border-2 border-gray-300 bg-white text-sm z-20">
              <ul className="divide-y divide-gray-200">
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer text-red-600">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
