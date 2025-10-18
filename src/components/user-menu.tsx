"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchUser } from "@/lib/actions";
import { User } from "@/types";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="bg-[#EFF1F6] text-[#56616B] rounded-full p-2 flex items-center gap-2 px-4">
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
        <ChevronDownIcon className="h-6 w-6" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#EFF1F6] text-[#56616B] rounded-full p-2 flex items-center gap-2 px-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback
            className="text-white"
            style={{
              background:
                "linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)",
            }}
          >
            U
          </AvatarFallback>
        </Avatar>
        <ChevronDownIcon className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#EFF1F6] text-[#56616B] rounded-full p-2 flex items-center gap-2 px-4 hover:bg-[#E5E7EB] transition-colors"
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback
            className="text-white"
            style={{
              background:
                "linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)",
            }}
          >
            {getInitials(user.first_name, user.last_name)}
          </AvatarFallback>
        </Avatar>
        <ChevronDownIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 sm:right-0 left-4 sm:left-auto top-full mt-2 w-[calc(100vw-2rem)] sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback
                    className="text-white text-lg"
                    style={{
                      background:
                        "linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)",
                    }}
                  >
                    {getInitials(user.first_name, user.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Account Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Billing
              </button>
              <hr className="my-2" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
