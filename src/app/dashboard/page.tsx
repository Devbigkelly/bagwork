'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWeb3 } from '../../context/Web3Context';
import { useBounty } from '../../context/BountyContext';
import EarningsChart from '../../components/ui/EarningsChart';
import { 
  Compass, 
  ExternalLink, 
  Copy,
  Wallet,
  Lock
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function ContributorDashboardPage() {
  const { isWalletConnected, walletAddress, truncatedAddress, selectedNetwork, totalUsdBalance, openWalletModal } = useWeb3();
  const { submissions, transactions, bounties } = useBounty();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState<'contributions' | 'submissions' | 'transactions'>('contributions');

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      addToast('Copied Address', walletAddress, 'info');
    }
  };

  // WALLET GATED STATE FOR DISCONNECTED USERS
  if (!isWalletConnected) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-6 bg-[#fffdf9]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-100 border border-zinc-200 shadow-sm text-zinc-900">
          <Lock className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-zinc-900">Connect Your Wallet</h1>
          <p className="text-sm font-semibold text-zinc-600 max-w-md mx-auto">
            Connect your Web3 wallet to access your contributor earnings, track active task submissions, and view payout history.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={openWalletModal}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-4 text-sm font-black text-white shadow-md hover:bg-zinc-800 transition-all hover:scale-105"
          >
            <Wallet className="h-4 w-4 text-emerald-400" />
            <span>Connect Wallet Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#fffdf9]">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <h1 className="text-2xl font-black text-zinc-900 sm:text-4xl">Contributor Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="font-mono font-bold text-zinc-800">{truncatedAddress}</span>
            <button onClick={copyAddress} className="text-zinc-400 hover:text-zinc-900">
              <Copy className="h-3.5 w-3.5" />
            </button>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-extrabold text-emerald-800 border border-emerald-200">
              Verified Contributor
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/bounties"
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-zinc-800"
          >
            <Compass className="h-4 w-4" />
            Explore Bounties
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Total Earned</span>
          <div className="mt-1 text-2xl font-black text-zinc-900">$4,820.00</div>
          <span className="text-[10px] font-bold text-emerald-700">On-Chain Payouts</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Pending Rewards</span>
          <div className="mt-1 text-2xl font-black text-amber-600">$350.00</div>
          <span className="text-[10px] font-semibold text-zinc-500">Under Review</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Completed</span>
          <div className="mt-1 text-2xl font-black text-zinc-900">42</div>
          <span className="text-[10px] font-semibold text-zinc-500">Bounties & Tasks</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Approval Rate</span>
          <div className="mt-1 text-2xl font-black text-emerald-600">96.5%</div>
          <span className="text-[10px] font-semibold text-zinc-500">Top 5% Rank</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm col-span-2 md:col-span-1">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Wallet Balance</span>
          <div className="mt-1 text-2xl font-black text-zinc-900">${totalUsdBalance.toLocaleString()}</div>
          <span className="text-[10px] font-bold text-zinc-700">{selectedNetwork.name} Native</span>
        </div>

      </div>

      {/* Interactive Earnings Analytics Chart */}
      <EarningsChart />

      {/* Dashboard Section Tabs */}
      <div className="space-y-6">
        
        <div className="flex border-b border-zinc-200 space-x-6 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('contributions')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'contributions'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Active Contributions
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'submissions'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'transactions'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Reward Transaction History ({transactions.length})
          </button>
        </div>

        {/* TAB 1: CONTRIBUTIONS */}
        {activeTab === 'contributions' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-zinc-900">In-Progress Bounties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bounties.slice(0, 2).map((b) => (
                <div key={b.id} className="rounded-3xl border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900">{b.projectName}</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200">
                      IN PROGRESS
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-zinc-900">{b.title}</h4>
                  <p className="text-xs text-zinc-600 font-medium line-clamp-2">{b.description}</p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-black text-zinc-900">{b.rewardPerContributor} {b.rewardToken}</span>
                    <Link href={`/bounties/${b.id}`} className="text-xs font-extrabold text-emerald-700 hover:underline">
                      View Tasks & Submit Proof →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-extrabold">
                  <tr>
                    <th className="p-4">Bounty / Task</th>
                    <th className="p-4">Proof</th>
                    <th className="p-4">Submitted At</th>
                    <th className="p-4">Reward</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-800">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-50">
                      <td className="p-4 font-extrabold text-zinc-900">
                        <div>{sub.taskTitle}</div>
                        <span className="text-[10px] font-semibold text-zinc-500">{sub.projectName}</span>
                      </td>
                      <td className="p-4">
                        <a href={sub.proofValue} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 font-mono font-bold">
                          <span>{sub.proofType.toUpperCase()} Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="p-4 text-zinc-500 font-semibold">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                      <td className="p-4 font-black text-emerald-700">{sub.rewardAmount} {sub.rewardToken}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold border ${
                          sub.status === 'APPROVED' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' :
                          sub.status === 'PENDING' ? 'bg-amber-100 border-amber-200 text-amber-800' :
                          'bg-rose-100 border-rose-200 text-rose-800'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-extrabold">
                  <tr>
                    <th className="p-4">Type</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Network</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-50">
                      <td className="p-4 font-black text-zinc-900">{tx.type}</td>
                      <td className="p-4 font-black text-emerald-700">+{tx.amount} {tx.token}</td>
                      <td className="p-4 font-bold text-zinc-700">{tx.network}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <a
                          href={`https://basescan.org/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <span>{tx.txHash.slice(0, 10)}...</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
