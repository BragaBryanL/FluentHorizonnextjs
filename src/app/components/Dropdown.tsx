"use client";

import React, { ReactNode, useState, useRef, useEffect, ElementType } from "react";

interface DropdownProps {
  children: ReactNode;
}

interface DropdownButtonProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
  anchor?: "bottom start" | "bottom end" | "top start" | "top end";
}

interface DropdownItemProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

interface DropdownDividerProps {
  className?: string;
}

interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clone children to pass isOpen and setIsOpen
  const child = children as React.ReactElement<{
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
  }>;
  
  if (child && typeof child === 'object' && 'props' in child) {
    return (
      <div ref={dropdownRef} className="relative inline-flex">
        {React.cloneElement(child, { isOpen, setIsOpen } as any)}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative inline-flex">
      {children}
    </div>
  );
}

export function DropdownMenu({ children, className = "", anchor = "bottom start" }: DropdownMenuProps) {
  const anchorClasses: Record<string, string> = {
    "bottom start": "top-full left-0 mt-1",
    "bottom end": "top-full right-0 mt-1",
    "top start": "bottom-full left-0 mb-1",
    "top end": "bottom-full right-0 mb-1",
  };

  return (
    <div className={`absolute ${anchorClasses[anchor]} z-50 min-w-64 bg-slate-800/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

export function DropdownItem({ children, href, className = "", onClick }: DropdownItemProps) {
  return (
    <a
      href={href || "#"}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function DropdownDivider({ className = "" }: DropdownDividerProps) {
  return <div className={`my-1 h-px bg-white/10 ${className}`} />;
}

export function DropdownLabel({ children, className = "" }: DropdownLabelProps) {
  return (
    <span className={`px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider block ${className}`}>
      {children}
    </span>
  );
}

export function DropdownButton({ as: Component = "button", children, className = "", onClick }: DropdownButtonProps) {
  return (
    <Component type="button" className={className} onClick={onClick}>
      {children}
    </Component>
  );
}
