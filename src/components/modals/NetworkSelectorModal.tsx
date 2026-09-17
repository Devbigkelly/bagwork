'use client';

import React from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { SUPPORTED_NETWORKS } from '../../data/mockData';
import { X, CheckCircle2, Globe2 } from 'lucide-react';

export default function NetworkSelectorModal() {
  const { isNetworkModalOpen, closeNetworkModal, selectedNetwork, switchNetwork } = useWeb3();

  if (!isNetworkModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
              <Globe2 className="h-5 w-5 text-zinc-800" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900">Select Blockchain Network</h3>
              <p className="text-xs font-semibold text-zinc-500">Switch network for smart contract escrows</p>
            </div>
          </div>
          <button
            onClick={closeNetworkModal}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Network Options */}
        <div className="mt-4 space-y-2">
          {SUPPORTED_NETWORKS.map((network) => {
            const isSelected = selectedNetwork.id === network.id;
            return (
              <button
                key={network.id}
                onClick={() => switchNetwork(network.id)}
                className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                    : 'border-zinc-200 bg-zinc-50/60 text-zinc-800 hover:border-zinc-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl border border-zinc-200 shadow-sm">
                    {network.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black">{network.name}</span>
                      <span className={`text-[11px] font-mono ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        ID: {network.chainId}
                      </span>
                    </div>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      Native token: {network.symbol}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-extrabold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Connected
                  </span>
                ) : (
                  <span className="text-xs font-extrabold text-zinc-600 hover:text-zinc-900">Switch</span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
