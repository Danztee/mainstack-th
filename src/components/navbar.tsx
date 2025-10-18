"use client";

import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/user-menu";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { icon: "/home.svg", label: "Home", href: "/", isActive: false },
    { icon: "/analytics.svg", label: "Analytics", href: "/", isActive: false },
    { icon: "/revenue.svg", label: "Revenue", href: "/", isActive: true },
    { icon: "/crm.svg", label: "CRM", href: "/", isActive: false },
    { icon: "/apps.svg", label: "Apps", href: "/", isActive: false },
  ];

  return (
    <nav
      className="bg-white p-2 px-4 rounded-full flex items-center justify-between relative"
      style={{
        boxShadow: "0px 2px 4px 0px #2D3B430D, 0px 2px 6px 0px #2D3B430F",
      }}
    >
      <Image src="/mainstack-logo.png" alt="logo" width={40} height={40} />

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
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

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-6">
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

        <UserMenu />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center gap-4">
        <button>
          <Image
            src="/notifications.svg"
            alt="notification"
            width={20}
            height={20}
          />
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border z-50 lg:hidden">
          <div className="p-4 space-y-2">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-full ${
                  link.isActive ? "bg-black text-white" : "text-[#56616B]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 px-4 py-2">
                <button>
                  <Image src="/chat.svg" alt="chat" width={20} height={20} />
                </button>
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
