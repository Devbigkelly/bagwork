'use client';

import React from 'react';
import { Bounty } from '../../types';
import { ShieldCheck, ExternalLink, Lock, CheckCircle2, Copy } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface EscrowCardProps {
  bounty: Bounty;
}

export default function EscrowCard({ bounty }: EscrowCardProps) {
  const { addToast } = useNotification();
  const remainingBudget = bounty.totalPool - bounty.distributedAmount;
  const percentageDistributed = Math.round((bounty.distributedAmount / bounty.totalPool) * 100);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    addToast('Copied to Clipboard!', 'Contract address copied.', 'info');
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-inner">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-zinc-900">Smart Contract Escrow</h4>
            <p className="text-xs font-semibold text-zinc-500">On-Chain Reward Pool Lock</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {bounty.isEscrowFunded ? 'FUNDED & LOCKED' : 'UNFUNDED'}
        </span>
      </div>

      {/* Financial Pool Metrics */}
      <div className="mt-5 grid grid-cols-3 gap-4 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-center">
        <div>
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Total Pool</span>
          <p className="mt-1 text-lg font-black text-zinc-900">{bounty.totalPool.toLocaleString()} <span className="text-xs font-bold text-emerald-600">{bounty.rewardToken}</span></p>
        </div>
        <div className="border-x border-zinc-200">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Distributed</span>
          <p className="mt-1 text-lg font-black text-emerald-600">{bounty.distributedAmount.toLocaleString()} <span className="text-xs font-bold text-emerald-600">{bounty.rewardToken}</span></p>
        </div>
        <div>
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Remaining</span>
          <p className="mt-1 text-lg font-black text-zinc-900">{remainingBudget.toLocaleString()} <span className="text-xs font-bold text-zinc-600">{bounty.rewardToken}</span></p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-[11px] font-bold text-zinc-600 mb-1.5">
          <span>Escrow Distribution Progress</span>
          <span>{percentageDistributed}% Released</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${percentageDistributed}%` }}
          />
        </div>
      </div>

      {/* On-Chain Contract Hash Details */}
      <div className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-xs font-semibold">
        
        {/* Contract Address */}
        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2 border border-zinc-200">
          <span className="text-zinc-500">Escrow Contract:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-900 font-bold">{bounty.contractAddress.slice(0, 10)}...{bounty.contractAddress.slice(-8)}</span>
            <button onClick={() => copyAddress(bounty.contractAddress)} className="text-zinc-400 hover:text-zinc-900">
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Escrow Transaction Hash */}
        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2 border border-zinc-200">
          <span className="text-zinc-500">Funding Transaction:</span>
          <a
            href={`https://basescan.org/tx/${bounty.escrowTxHash}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-mono text-emerald-700 font-bold hover:underline"
          >
            <span>{bounty.escrowTxHash.slice(0, 10)}...</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Network & Verification badge */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-zinc-500">Network: <strong className="text-zinc-900">{bounty.network} Mainnet</strong></span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Smart Contract
          </span>
        </div>

      </div>

    </div>
  );
}
