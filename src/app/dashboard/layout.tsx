import Navbar from "@/components/navbar";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const icons = [
    {
      title: "",
      icon: "/prod-1.svg",
    },
    {
      title: "",
      icon: "/prod-2.svg",
    },
    {
      title: "",
      icon: "/prod-3.svg",
    },
    {
      title: "",
      icon: "/prod-4.svg",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 right-4 z-50 lg:top-6 lg:left-6 lg:right-6">
        <Navbar />
      </div>

      <div className="pt-20 px-4 lg:pt-24 lg:px-6">
        <div className="flex">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <aside className="hidden lg:block w-20 h-screen relative">
            <div
              className="bg-white h-fit w-fit p-4 rounded-full space-y-8 fixed top-1/2 left-10 transform -translate-y-1/2"
              style={{
                boxShadow:
                  "0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314",
              }}
            >
              {icons.map((icon, index) => (
                <div key={index}>
                  <Image
                    src={icon.icon}
                    alt={icon.title}
                    width={20}
                    height={20}
                    className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 lg:ml-0">
            <div className="p-2 lg:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
