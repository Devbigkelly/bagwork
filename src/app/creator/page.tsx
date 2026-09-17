'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBounty } from '../../context/BountyContext';
import { Submission } from '../../types';
import { 
  PlusCircle, 
  Coins, 
  Users, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ExternalLink, 
  SlidersHorizontal,
  Loader2,
  FileCode
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function CreatorHubPage() {
  const { bounties, submissions, approveSubmission, rejectSubmission } = useBounty();
  const { addToast } = useNotification();

  const [reviewingSubmission, setReviewingSubmission] = useState<Submission | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingSubmissions = submissions.filter(s => s.status === 'PENDING');

  const handleApprovePayout = async (submissionId: string) => {
    setIsProcessing(true);
    await approveSubmission(submissionId);
    setIsProcessing(false);
    setReviewingSubmission(null);
  };

  const handleReject = async (submissionId: string) => {
    if (!rejectReason) {
      addToast('Reason Required', 'Please state a reason for rejecting.', 'warning');
      return;
    }
    setIsProcessing(true);
    await rejectSubmission(submissionId, rejectReason);
    setIsProcessing(false);
    setReviewingSubmission(null);
    setRejectReason('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            <h1 className="text-2xl font-extrabold text-white sm:text-4xl">Creator & Protocol Hub</h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Manage active bounties, review contributor proof submissions, and release smart contract escrow rewards.
          </p>
        </div>

        <Link
          href="/creator/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-indigo-600/30 hover:brightness-110"
        >
          <PlusCircle className="h-4 w-4" />
          Create & Fund New Bounty
        </Link>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total Funded</span>
          <div className="mt-1 text-2xl font-extrabold text-white">$45,000.00</div>
          <span className="text-[10px] text-indigo-400">Locked in Escrow</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Distributed</span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-400">$32,500.00</div>
          <span className="text-[10px] text-slate-400">Released to Contributors</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Active Bounties</span>
          <div className="mt-1 text-2xl font-extrabold text-white">12</div>
          <span className="text-[10px] text-slate-400">Live on Marketplace</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pending Reviews</span>
          <div className="mt-1 text-2xl font-extrabold text-amber-400">{pendingSubmissions.length}</div>
          <span className="text-[10px] text-slate-400">Requires Decision</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 col-span-2 md:col-span-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contributors</span>
          <div className="mt-1 text-2xl font-extrabold text-white">1,284</div>
          <span className="text-[10px] text-slate-400">Global Builders</span>
        </div>
      </div>

      {/* SECTION 1: Pending Submissions for Review */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Pending Proof Submissions ({pendingSubmissions.length})</h2>
          </div>
        </div>

        {pendingSubmissions.length === 0 ? (
          <p className="text-xs text-slate-400">No pending submissions to review right now.</p>
        ) : (
          <div className="space-y-3">
            {pendingSubmissions.map((sub) => (
              <div 
                key={sub.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{sub.contributorUsername}</span>
                    <span className="font-mono text-[11px] text-slate-400">({sub.contributorWallet.slice(0, 6)}...{sub.contributorWallet.slice(-4)})</span>
                    <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                      Reputation: {sub.contributorReputation}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-indigo-300">{sub.taskTitle} ({sub.bountyTitle})</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span>Proof:</span>
                    <a href={sub.proofValue} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline flex items-center gap-1 font-mono">
                      <span>{sub.proofType.toUpperCase()} Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-extrabold text-emerald-400">{sub.rewardAmount} {sub.rewardToken}</span>
                  <button
                    onClick={() => setReviewingSubmission(sub)}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    Review Submission
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Active Created Bounties Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Your Managed Protocol Bounties ({bounties.length})</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5">Bounty Title</th>
                <th className="p-3.5">Network</th>
                <th className="p-3.5">Pool / Distributed</th>
                <th className="p-3.5">Slots</th>
                <th className="p-3.5">Escrow Status</th>
                <th className="p-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {bounties.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-white">{b.title}</td>
                  <td className="p-3.5">{b.network}</td>
                  <td className="p-3.5 font-mono">{b.distributedAmount} / {b.totalPool} {b.rewardToken}</td>
                  <td className="p-3.5">{b.filledSlots} / {b.totalSlots}</td>
                  <td className="p-3.5">
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      FUNDED
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Link href={`/bounties/${b.id}`} className="text-indigo-400 font-bold hover:underline">
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Submission Modal */}
      {reviewingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0c101c] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Review & Approve Payout</h3>

            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div>Contributor: <strong className="text-white">{reviewingSubmission.contributorUsername}</strong> ({reviewingSubmission.contributorWallet})</div>
              <div>Task: <strong className="text-indigo-300">{reviewingSubmission.taskTitle}</strong></div>
              <div>Proof Deliverable: <a href={reviewingSubmission.proofValue} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">{reviewingSubmission.proofValue}</a></div>
              <div>Notes: {reviewingSubmission.additionalNotes || 'No notes provided.'}</div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Reason for Rejection (Optional if approving)</label>
              <input
                type="text"
                placeholder="State reason if rejecting..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setReviewingSubmission(null)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>

              <button
                onClick={() => handleReject(reviewingSubmission.id)}
                disabled={isProcessing}
                className="rounded-xl bg-rose-600/20 border border-rose-500/30 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-600/40"
              >
                Reject
              </button>

              <button
                onClick={() => handleApprovePayout(reviewingSubmission.id)}
                disabled={isProcessing}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Coins className="h-4 w-4" />}
                Approve & Release {reviewingSubmission.rewardAmount} {reviewingSubmission.rewardToken}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
