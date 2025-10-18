"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const links = [
    { icon: "/home.svg", label: "Home", href: "/", isActive: false },
    { icon: "/analytics.svg", label: "Analytics", href: "/", isActive: false },
    { icon: "/revenue.svg", label: "Revenue", href: "/", isActive: true },
    { icon: "/crm.svg", label: "CRM", href: "/", isActive: false },
    { icon: "/apps.svg", label: "Apps", href: "/", isActive: false },
  ];

  return (
    <nav
      className="bg-white p-2 px-4 rounded-full flex items-center justify-between"
      style={{
        boxShadow: "0px 2px 4px 0px #2D3B430D, 0px 2px 6px 0px #2D3B430F",
      }}
    >
      <Image src="/mainstack-logo.png" alt="logo" width={40} height={40} />

      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              link.isActive ? "bg-black text-white" : "text-[#56616B]"
            }`}
          >
            <Image src={link.icon} alt={link.label} width={20} height={20} />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button>
          <Image
            src="/notifications.svg"
            alt="notification"
            width={20}
            height={20}
          />
        </button>

        <button>
          <Image src="/chat.svg" alt="chat" width={20} height={20} />
        </button>

        <div className="bg-[#EFF1F6] text-[#56616B] rounded-full p-2 flex items-center gap-2 px-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className="text-white"
              style={{
                background:
                  "linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)",
              }}
            >
              OA
            </AvatarFallback>
          </Avatar>

          <MenuIcon className="h-6 w-6" />
        </div>
      </div>
    </nav>
  );
}
