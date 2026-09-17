'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, User, PlusCircle, Users, Landmark } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { name: 'Explore', href: '/bounties', icon: Compass },
    { name: 'Treasury', href: '/treasury', icon: Landmark },
    { name: 'Create', href: '/creator/new', icon: PlusCircle, isHighlight: true },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Dashboard', href: '/dashboard', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/80 bg-white/95 backdrop-blur-2xl md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          if (link.isHighlight) {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex -mt-6 h-12 w-12 items-center justify-center rounded-full bg-zinc-900 font-bold text-white shadow-md transition-transform active:scale-95"
              >
                <PlusCircle className="h-6 w-6 text-emerald-400" />
              </Link>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
