'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeb3 } from '../../context/Web3Context';
import { useNotification } from '../../context/NotificationContext';
import { 
  Wallet, 
  ChevronDown, 
  Bell, 
  PlusCircle, 
  Compass, 
  Award, 
  Users, 
  CheckCircle2, 
  LogOut, 
  User, 
  History, 
  ShieldCheck,
  Landmark
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    isWalletConnected, 
    truncatedAddress, 
    nativeBalance, 
    totalUsdBalance,
    openWalletModal, 
    disconnectWallet 
  } = useWeb3();
  const { unreadCount, openDrawer } = useNotification();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Explore', href: '/bounties', icon: Compass },
    { name: 'Treasury', href: '/treasury', icon: Landmark },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Leaderboard', href: '/leaderboard', icon: Award },
    { name: 'Dashboard', href: '/dashboard', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fffdf9]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 font-extrabold text-white text-sm shadow-sm">
              $
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black tracking-tight text-zinc-900">
                bagwork
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                BOUNTIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions & Wallet */}
        <div className="flex items-center gap-3">
          
          {/* Create Bounty CTA */}
          <Link
            href="/creator/new"
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-zinc-800"
          >
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            Create Bounty
          </Link>

          {/* Notifications Bell - Shown only when authenticated */}
          {isWalletConnected && (
            <button
              onClick={openDrawer}
              className="relative rounded-xl border border-zinc-200 bg-white p-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Wallet Section */}
          {isWalletConnected ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 shadow-sm transition-all hover:border-zinc-400"
              >
                <div className="flex flex-col items-end text-right hidden sm:flex">
                  <span className="text-xs font-bold text-zinc-900">{truncatedAddress}</span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {nativeBalance} ETH
                  </span>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-xs font-extrabold text-white">
                  0x
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl backdrop-blur-2xl z-50 animate-in fade-in"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="border-b border-zinc-100 p-2.5 mb-1 bg-zinc-50/80 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-900">{truncatedAddress}</span>
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    <User className="h-4 w-4 text-zinc-900" />
                    Contributor Dashboard
                  </Link>

                  <Link
                    href="/creator"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    <PlusCircle className="h-4 w-4 text-emerald-600" />
                    Creator Hub
                  </Link>

                  <Link
                    href="/referrals"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    <History className="h-4 w-4 text-indigo-600" />
                    Referral Program
                  </Link>

                  <div className="my-1 border-t border-zinc-100" />

                  <button
                    onClick={() => {
                      disconnectWallet();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openWalletModal}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-zinc-800"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
