"use client";

import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

interface NavbarItemProps {
  children: ReactNode;
  href?: string;
  current?: boolean;
  className?: string;
  onClick?: () => void;
}

interface NavbarSectionProps {
  children: ReactNode;
  className?: string;
}

interface NavbarDividerProps {
  className?: string;
}

interface NavbarLabelProps {
  children: ReactNode;
  className?: string;
}

interface NavbarSpacerProps {
  className?: string;
}

export function Navbar({ children, className = "" }: NavbarProps) {
  return (
    <nav className={`flex items-center gap-2 h-16 ${className}`}>
      {children}
    </nav>
  );
}

export function NavbarItem({ children, href, current, className = "", onClick }: NavbarItemProps) {
  return (
    <a
      href={href || "#"}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        current
          ? "text-cyan-400 bg-cyan-500/20"
          : "text-white/80 hover:text-white hover:bg-white/10"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function NavbarSection({ children, className = "" }: NavbarSectionProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {children}
    </div>
  );
}

export function NavbarDivider({ className = "" }: NavbarDividerProps) {
  return <div className={`w-px h-6 bg-white/20 ${className}`} />;
}

export function NavbarLabel({ children, className = "" }: NavbarLabelProps) {
  return (
    <span className={`text-sm font-medium text-white ${className}`}>
      {children}
    </span>
  );
}

export function NavbarSpacer({ className = "" }: NavbarSpacerProps) {
  return <div className={`flex-1 ${className}`} />;
}
