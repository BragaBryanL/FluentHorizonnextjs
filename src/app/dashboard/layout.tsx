"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownDivider,
} from "../components/Dropdown";
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from "../components/Navbar";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // If not logged in, show nothing (redirect handled in page)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Catalyst-style Navbar - Fixed z-index */}
      <Navbar className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md px-4 lg:px-8">
        {/* Logo - FluentHorizon with SVG logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          {/* FluentHorizon SVG Logo */}
          <div className="w-9 h-9 relative">
            <Image 
              src="/language-hero.svg" 
              alt="FluentHorizon Logo"
              width={36}
              height={36}
              className="w-full h-full"
            />
          </div>
          <NavbarLabel className="text-lg font-semibold">FluentHorizon</NavbarLabel>
        </Link>
        
        <NavbarDivider className="max-lg:hidden ml-4" />
        
        <NavbarSection className="max-lg:hidden">
          <NavbarItem href="/dashboard" current>
            Home
          </NavbarItem>
        </NavbarSection>
        
        <NavbarSpacer />
        
        {/* User Profile Dropdown with Toggle */}
        <NavbarSection>
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium">
                {user.name?.charAt(0) || "U"}
              </div>
            </button>
            
            {/* Dropdown Menu - Shows when isProfileOpen is true - Higher z-index */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-64 bg-slate-800/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl z-[100] overflow-hidden">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/50">{user.email}</p>
                </div>
                
                {/* Menu Items */}
                <div className="py-1">
                  <Link 
                    href="/dashboard/profile" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>My profile</span>
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Cog8ToothIcon className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </div>
                
                <DropdownDivider />
                
                <div className="py-1">
                  <Link 
                    href="/privacy-policy" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <ShieldCheckIcon className="w-5 h-5" />
                    <span>Privacy policy</span>
                  </Link>
                  <Link 
                    href="/share-feedback" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LightBulbIcon className="w-5 h-5" />
                    <span>Share feedback</span>
                  </Link>
                </div>
                
                <DropdownDivider />
                
                <div className="py-1">
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer w-full text-left"
                  >
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </NavbarSection>
      </Navbar>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}

      {/* Main Content - Added padding top to account for fixed navbar */}
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  );
}
