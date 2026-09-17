'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { MOCK_CONTRIBUTORS } from '../../../data/mockData';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Coins, 
  ArrowLeft,
  Copy,
  Code2,
  Globe
} from 'lucide-react';
import { useNotification } from '../../../context/NotificationContext';

export default function ContributorProfilePage({ params }: { params: Promise<{ address: string }> }) {
  const resolvedParams = use(params);
  const { addToast } = useNotification();

  const profile = MOCK_CONTRIBUTORS.find(c => 
    c.walletAddress.toLowerCase() === resolvedParams.address.toLowerCase()
  ) || MOCK_CONTRIBUTORS[0];

  const copyAddress = () => {
    navigator.clipboard.writeText(profile.walletAddress);
    addToast('Copied Address', profile.walletAddress, 'info');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <Link href="/leaderboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Leaderboard
      </Link>

      {/* Profile Header Banner */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 text-4xl border border-indigo-500/40 shadow-xl shrink-0">
              {profile.avatar}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{profile.username}</h1>
                {profile.isVerified && <ShieldCheck className="h-5 w-5 text-indigo-400" />}
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/20">
                  Rank #{profile.rank}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>{profile.walletAddress.slice(0, 10)}...{profile.walletAddress.slice(-8)}</span>
                <button onClick={copyAddress} className="text-slate-400 hover:text-white">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-300 max-w-xl leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0 space-y-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Earned</span>
              <div className="text-2xl font-extrabold text-white">${profile.totalEarnedUsd.toLocaleString()}</div>
            </div>

            <div className="flex gap-2">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white" title="GitHub Code">
                  <Code2 className="h-4 w-4" />
                </a>
              )}
              {profile.twitterUrl && (
                <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white" title="X / Twitter">
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Reputation Score</span>
          <div className="mt-1 text-2xl font-extrabold text-indigo-400">{profile.reputationScore} PTS</div>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Bounties Completed</span>
          <div className="mt-1 text-2xl font-extrabold text-white">{profile.bountiesCompleted}</div>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Approval Rate</span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-400">{profile.approvalRate}%</div>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Member Since</span>
          <div className="mt-1 text-2xl font-extrabold text-slate-200">{profile.joinedDate}</div>
        </div>
      </div>

      {/* Badges & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Badges */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Earned Web3 Badges</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 px-3 py-1.5 text-xs font-bold text-indigo-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Verified Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s, i) => (
              <span key={i} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-300">
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
