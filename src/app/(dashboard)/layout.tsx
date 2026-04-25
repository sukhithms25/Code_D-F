"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHod = pathname.startsWith("/hod");

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Immersive Background Mesh */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-mesh" />
      </div>

      <Sidebar role={isHod ? "hod" : "student"} />

      <div className="relative flex flex-1 flex-col pl-64">
        <Navbar />
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
