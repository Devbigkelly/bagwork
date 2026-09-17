'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white py-8 text-zinc-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 font-extrabold text-white text-xs shadow-sm">
            $
          </div>
          <span className="text-base font-black tracking-tight text-zinc-900">
            bagwork
          </span>
          <span className="text-xs font-semibold text-zinc-400">
            — Small tasks. Real rewards.
          </span>
        </div>

        {/* Minimal Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-zinc-600">
          <Link href="/bounties" className="hover:text-zinc-900 transition-colors">
            Explore Bounties
          </Link>
          <Link href="/treasury" className="hover:text-zinc-900 transition-colors">
            Treasury
          </Link>
          <Link href="/creator/new" className="hover:text-zinc-900 transition-colors">
            Create Bounty
          </Link>
          <Link href="/dashboard" className="hover:text-zinc-900 transition-colors">
            Dashboard
          </Link>
          <span className="text-zinc-400 font-normal">© 2026 bagwork</span>
        </div>

      </div>
    </footer>
  );
}
