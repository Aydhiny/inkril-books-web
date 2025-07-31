"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string; // URL path for Link
  iconSrc: string; // Image path for icon
};

const navItems: NavItem[] = [
  { name: "Home", href: "/", iconSrc: "/home.webp" },
  { name: "Stats", href: "/stats", iconSrc: "/trophy.png" },
  { name: "Bookmarks", href: "/bookmarks", iconSrc: "/bookmark.png" },
  { name: "Books", href: "/books", iconSrc: "/book.png" },
  { name: "Profile", href: "/profile", iconSrc: "/profile.png" },
  { name: "Settings", href: "/settings", iconSrc: "/settings.png" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 h-screen bg-white text-gray-900 border-r-4 border-gray-100">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-4xl font-extrabold text-indigo-500 tracking-wide">
          inkril.
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto mt-6">
        <ul className="flex flex-col space-y-2 px-4">
          {navItems.map(({ name, href, iconSrc }) => {
            const isActive = pathname === href;

            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                    ${
                      isActive
                        ? "border-[3px] border-indigo-200 text-indigo-500"
                        : "hover:bg-indigo-100 text-gray-700"
                    }
                  `}
                >
                  <span
                    className={`${isActive ? "text-white" : "text-gray-600"}`}
                  >
                    <Image
                      src={iconSrc}
                      alt={`${name} icon`}
                      width={22}
                      height={22}
                      className={isActive ? "filter invert" : ""}
                      priority
                    />
                  </span>
                  <span className="font-medium text-lg">{name}</span>
                </Link>
                <div className="py-[2px] bg-gray-100"></div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
