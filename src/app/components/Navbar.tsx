"use client";

import { useState } from "react";
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
  const pathname = usePathname();

  // Get friendly page title or fallback to capitalized path segment
  const pageTitle =
    pathNameMap[pathname] ||
    pathname
      .replace("/", "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Unknown";

  return (
    <header className="bg-white border-b w-full border-gray-300 text-gray-900 flex items-center justify-between px-6 h-16">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Toggle sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dynamic Page Title */}
      <h1 className="text-indigo-600 text-3xl font-extrabold tracking-wide select-none capitalize">
        {pageTitle}
      </h1>

      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        {/* Search icon */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Search"
        >
          <Search className="w-6 h-6 text-gray-700" />
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {/* Notification badge */}
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
        </button>

        {/* User Avatar */}
        <button className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full border-2 border-indigo-500 overflow-hidden w-9 h-9">
          <Image
            src="/profile.png"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
        </button>
      </div>
    </header>
  );
}
