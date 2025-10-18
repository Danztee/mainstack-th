import type { Metadata } from "next";
import "./globals.css";

import { Degular } from "@/font";

const degular = Degular;

export const metadata: Metadata = {
  title: "Mainstack Task",
  description: "Mainstack Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${degular.variable} antialiased`}>{children}</body>
    </html>
  );
}
