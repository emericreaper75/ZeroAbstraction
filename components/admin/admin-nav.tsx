"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Projects",
    href: "/admin/projects",
  },
  {
    label: "Posts",
    href: "/admin/posts",
  },
  {
    label: "Media",
    href: "/admin/media",
  },
  {
    label: "Messages",
    href: "/admin/messages",
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:bg-zinc-800/70 hover:text-white"
            }`}
          >
            <span className="truncate">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}