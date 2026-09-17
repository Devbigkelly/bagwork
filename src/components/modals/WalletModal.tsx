'use client';

import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { WalletType } from '../../types';
import { X, ShieldCheck, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface WalletOption {
  id: WalletType;
  name: string;
  icon: string;
  badge?: string;
  description: string;
}

const WALLET_OPTIONS: WalletOption[] = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', badge: 'Popular', description: 'Connect using MetaMask extension or mobile app' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔵', badge: 'Official', description: 'Connect using Coinbase Wallet' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🌐', description: 'Scan QR code with supported mobile Web3 wallets' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', description: 'Rainbow Web3 wallet' },
  { id: 'phantom', name: 'Phantom', icon: '👻', badge: 'Multi-Chain', description: 'Connect using Phantom wallet' },
];

export default function WalletModal() {
  const { isWalletModalOpen, closeWalletModal, connectWallet, walletStatus, hasInjectedWallet } = useWeb3();
  const [connectingId, setConnectingId] = useState<WalletType | null>(null);

  if (!isWalletModalOpen) return null;

  const handleConnect = async (type: WalletType) => {
    setConnectingId(type);
    await connectWallet(type);
    setConnectingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
              <Sparkles className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900">Connect Web3 Wallet</h3>
              <p className="text-xs font-semibold text-zinc-500">Connect your crypto wallet to interact with bounties</p>
            </div>
          </div>
          <button
            onClick={closeWalletModal}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!hasInjectedWallet && (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 font-semibold">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-tight">
              No Web3 browser extension detected. Please install <strong>MetaMask</strong>, <strong>Coinbase Wallet</strong>, or <strong>Phantom</strong> extension to connect your wallet.
            </p>
          </div>
        )}

        {/* Wallet List */}
        <div className="mt-4 space-y-2.5">
          {WALLET_OPTIONS.map((wallet) => {
            const isConnecting = connectingId === wallet.id && walletStatus === 'connecting';
            return (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                disabled={isConnecting}
                className="group flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white p-3.5 transition-all hover:border-zinc-900 hover:bg-zinc-50 text-left shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-xl border border-zinc-200 shadow-sm group-hover:scale-105 transition-transform">
                    {wallet.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-zinc-900">
                        {wallet.name}
                      </span>
                      {wallet.badge && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200">
                          {wallet.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-zinc-500 line-clamp-1">{wallet.description}</p>
                  </div>
                </div>

                {isConnecting ? (
                  <Loader2 className="h-5 w-5 animate-spin text-zinc-900" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-zinc-300 group-hover:bg-zinc-900 transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        {/* Security Footer Notice */}
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-700 font-semibold">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
          <p className="text-[11px] leading-tight text-zinc-600">
            bagwork never accesses your private keys. All transactions are explicitly signed in your wallet.
          </p>
        </div>

      </div>
    </div>
  );
}
