'use client';

import React from 'react';
import { useBounty } from '../../context/BountyContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Coins, 
  Users, 
  CheckCircle2, 
  XCircle, 
  FileText,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { disputes, resolveDispute } = useBounty();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
            <h1 className="text-2xl font-extrabold text-white sm:text-4xl">Admin & Dispute Protocol</h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Monitor global escrow balances, resolve contributor disputes, and manage protocol settings.
          </p>
        </div>
      </div>

      {/* Admin Platform Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Total Escrow Volume</span>
          <div className="mt-1 text-2xl font-extrabold text-white">$1,850,000</div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Active Escrow Pools</span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-400">$48,500</div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Pending Disputes</span>
          <div className="mt-1 text-2xl font-extrabold text-amber-400">{disputes.filter(d => d.status === 'OPEN').length}</div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Protocol Fee</span>
          <div className="mt-1 text-2xl font-extrabold text-indigo-400">0.0%</div>
        </div>
      </div>

      {/* Disputes Panel */}
      <div className="rounded-2xl border border-amber-500/30 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Dispute Resolution Queue</h2>
        </div>

        {disputes.length === 0 ? (
          <p className="text-xs text-slate-400">No active disputes reported.</p>
        ) : (
          <div className="space-y-4">
            {disputes.map((disp) => (
              <div key={disp.id} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                  <span className="font-bold text-indigo-300">Bounty: {disp.bountyTitle}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                    disp.status === 'OPEN' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {disp.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <div><strong>Contributor:</strong> {disp.contributorWallet}</div>
                  <div><strong>Claim Reason:</strong> {disp.reason}</div>
                  <div>
                    <strong>Submitted On-Chain Evidence:</strong>{' '}
                    <a href={disp.evidence} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-mono">
                      <span>{disp.evidence}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {disp.status === 'OPEN' && (
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => resolveDispute(disp.id, 'reject')}
                      className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/20"
                    >
                      Maintain Rejection
                    </button>
                    <button
                      onClick={() => resolveDispute(disp.id, 'approve')}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500"
                    >
                      Approve & Force Payout
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
