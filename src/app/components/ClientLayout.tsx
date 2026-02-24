"use client";

import { usePathname } from "next/navigation";
import Header from "../Header";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  
  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && (
        <footer className="w-full bg-white/80 border-t border-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800 mt-16">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>&copy; {new Date().getFullYear()} Fluent Horizons. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Twitter</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">Instagram</a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
