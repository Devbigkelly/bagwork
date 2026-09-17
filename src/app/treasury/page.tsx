'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWeb3 } from '../../context/Web3Context';
import { useNotification } from '../../context/NotificationContext';
import { 
  Landmark, 
  ShieldCheck, 
  ArrowUpRight, 
  Coins, 
  TrendingUp, 
  DollarSign, 
  ExternalLink, 
  Lock, 
  Layers, 
  CheckCircle2, 
  Wallet, 
  Clock,
  Send,
  PieChart
} from 'lucide-react';

export default function TreasuryPage() {
  const { isWalletConnected, openWalletModal, truncatedAddress } = useWeb3();
  const { addToast } = useNotification();

  const [depositAmount, setDepositAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Treasury Holdings Data
  const holdings = [
    { symbol: 'USDC', name: 'USD Coin', balance: '245,000.00', usdValue: '$245,000.00', chain: 'Ethereum / Base', type: 'Stablecoin', allocation: '50.7%' },
    { symbol: 'ETH', name: 'Ethereum', balance: '45.20 ETH', usdValue: '$120,400.00', chain: 'Ethereum', type: 'Native Crypto', allocation: '24.9%' },
    { symbol: 'HOOD', name: 'Robinhood Tokenized Stock', balance: '1,250 HOOD', usdValue: '$62,500.00', chain: 'Robinhood Chain 🏹', type: 'Stock Reward', allocation: '12.9%' },
    { symbol: 'AAPL', name: 'Apple Stock Tokens', balance: '150 AAPL', usdValue: '$35,250.00', chain: 'Robinhood Chain 🏹', type: 'Stock Reward', allocation: '7.3%' },
    { symbol: 'NVDA', name: 'Nvidia Stock Tokens', balance: '180 NVDA', usdValue: '$23,400.00', chain: 'Robinhood Chain 🏹', type: 'Stock Reward', allocation: '4.8%' },
    { symbol: 'TSLA', name: 'Tesla Stock Tokens', balance: '85 TSLA', usdValue: '$16,400.00', chain: 'Robinhood Chain 🏹', type: 'Stock Reward', allocation: '3.4%' },
  ];

  // Allocation Breakdown
  const allocations = [
    { category: 'Bounty Escrow Pool', amount: '$210,000.00', percentage: 41, color: 'bg-emerald-600' },
    { category: 'Robinhood Stock Reserve', amount: '$137,550.00', percentage: 28, color: 'bg-zinc-900' },
    { category: 'Ecosystem & Grants Fund', amount: '$95,400.00', percentage: 20, color: 'bg-indigo-600' },
    { category: 'Security & Audit Reserves', amount: '$60,000.00', percentage: 11, color: 'bg-amber-600' },
  ];

  // On-Chain Treasury Audit Log
  const transactions = [
    { id: 'tx-1', type: 'Escrow Lock', label: 'Funded Robinhood Chain Stock Bounty', amount: '50 HOOD ($2,500)', txHash: '0x8f3a...b49c', time: '12 mins ago', status: 'Confirmed' },
    { id: 'tx-2', type: 'Bounty Payout', label: 'Released Escrow to 0x3A8F...91B2', amount: '1,500 USDC', txHash: '0x1c2b...8e7f', time: '1 hour ago', status: 'Confirmed' },
    { id: 'tx-3', type: 'Treasury Deposit', label: 'Community Grant Deposit by 0x98C1...42A1', amount: '10.0 ETH ($26,600)', txHash: '0x7e9a...3d2c', time: '4 hours ago', status: 'Confirmed' },
    { id: 'tx-4', type: 'Escrow Lock', label: 'Funded AI Agent Audit Bounty', amount: '5,000 USDC', txHash: '0x4d5e...9f1a', time: '1 day ago', status: 'Confirmed' },
  ];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWalletConnected) {
      openWalletModal();
      return;
    }

    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      addToast('error', 'Please enter a valid deposit amount.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('success', `Successfully deposited ${depositAmount} ${selectedToken} into bagwork Community Treasury!`);
      setDepositAmount('');
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 font-extrabold text-white text-sm shadow-sm">
              $
            </span>
            <h1 className="text-3xl font-black text-zinc-900 sm:text-4xl">Protocol Treasury</h1>
          </div>
          <p className="mt-2 text-sm font-semibold text-zinc-600 max-w-2xl">
            Transparent, on-chain protocol reserves, active escrow funds, Robinhood stock tokens, and ecosystem grant pools.
          </p>
        </div>

        {/* Multi-Sig Vault Badge */}
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <div className="flex items-center gap-1.5 font-mono font-extrabold text-zinc-900">
              <span>0x71C4...49A2</span>
              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">4-of-7 Multi-Sig</span>
            </div>
            <span className="text-[11px] font-semibold text-zinc-600">bagwork Vault Address</span>
          </div>
        </div>
      </div>

      {/* Top TVL & Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-600">
            <span>Total Treasury Value (TVL)</span>
            <Coins className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-zinc-900">$502,950.00</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <span>+14.2% this month</span>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-600">
            <span>Active Bounty Escrow</span>
            <Lock className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-zinc-900">$210,000.00</div>
          <p className="text-[11px] font-semibold text-zinc-600">14 active bounties locked in contracts</p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-600">
            <span>Robinhood Stock Reserves 🏹</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-zinc-900">$137,550.00</div>
          <p className="text-[11px] font-semibold text-zinc-600">HOOD, AAPL, NVDA, TSLA tokenized shares</p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-600">
            <span>Community Grants Pool</span>
            <Landmark className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-zinc-900">$95,400.00</div>
          <p className="text-[11px] font-semibold text-zinc-600">Reserved for open contributor bounties</p>
        </div>

      </div>

      {/* Main Grid: Holdings & Deposit Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left (2 cols): Holdings Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-zinc-900">Treasury Asset Holdings</h2>
                <p className="text-xs font-semibold text-zinc-600">Verifiable reserve balances across crypto and stock tokens.</p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">
                6 Verified Assets
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-600 font-extrabold">
                    <th className="pb-3">Asset</th>
                    <th className="pb-3">Chain</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Balance</th>
                    <th className="pb-3 text-right">USD Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-800">
                  {holdings.map((h, i) => (
                    <tr key={i} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white font-extrabold text-xs">
                            {h.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-extrabold text-zinc-900">{h.symbol}</div>
                            <div className="text-[10px] text-zinc-600">{h.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-zinc-700">{h.chain}</td>
                      <td className="py-4">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          h.type === 'Stock Reward' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-zinc-100 text-zinc-700'
                        }`}>
                          {h.type}
                        </span>
                      </td>
                      <td className="py-4 font-mono font-bold text-zinc-900">{h.balance}</td>
                      <td className="py-4 text-right font-black text-zinc-900">{h.usdValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Allocation Breakdown Bar */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-zinc-900">Treasury Capital Allocation</h3>
              <PieChart className="h-4 w-4 text-zinc-600" />
            </div>

            {/* Progress Stacked Bar */}
            <div className="h-4 w-full rounded-full bg-zinc-100 overflow-hidden flex">
              {allocations.map((a, i) => (
                <div 
                  key={i} 
                  className={`${a.color} h-full`} 
                  style={{ width: `${a.percentage}%` }}
                  title={`${a.category}: ${a.percentage}%`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {allocations.map((a, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                    <span className={`h-2.5 w-2.5 rounded-full ${a.color}`} />
                    <span>{a.category}</span>
                  </div>
                  <div className="text-sm font-black text-zinc-900">{a.amount}</div>
                  <div className="text-[10px] font-semibold text-zinc-600">{a.percentage}% of Treasury</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (1 col): Deposit to Treasury Form */}
        <div className="space-y-6">
          
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-black text-zinc-900">Fund Community Treasury</h2>
              </div>
              <p className="mt-1 text-xs font-semibold text-zinc-600">
                Deposit tokens into the protocol treasury to back open ecosystem bounties and reward contributors.
              </p>
            </div>

            <form onSubmit={handleDeposit} className="space-y-4">
              
              {/* Select Token */}
              <div>
                <label className="block text-xs font-extrabold text-zinc-900 mb-1.5">
                  Select Token to Deposit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['USDC', 'ETH', 'HOOD'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedToken(t)}
                      className={`rounded-xl border py-2.5 text-xs font-extrabold transition-all ${
                        selectedToken === t
                          ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-extrabold text-zinc-900 mb-1.5">
                  Deposit Amount ({selectedToken})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-bold text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                  <button
                    type="button"
                    onClick={() => setDepositAmount('1000')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-bold text-zinc-700 hover:bg-zinc-200"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs font-black text-white shadow-sm transition-all hover:bg-zinc-800 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Signing On-Chain Tx...</span>
                ) : isWalletConnected ? (
                  <>
                    <Wallet className="h-4 w-4 text-emerald-400" />
                    <span>Deposit into Treasury</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet to Deposit</span>
                  </>
                )}
              </button>
            </form>

            <div className="rounded-2xl bg-zinc-50 p-3.5 border border-zinc-200/80 text-[11px] font-semibold text-zinc-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Non-Custodial Escrow Contract</span>
              </div>
              <p>Deposited funds are locked in the bagwork verified multi-sig vault and can only be allocated via signed bounty proposals.</p>
            </div>
          </div>

        </div>

      </div>

      {/* On-Chain Audit Log Table */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-zinc-900">Recent On-Chain Treasury Activity</h2>
            <p className="text-xs font-semibold text-zinc-600">Real-time log of deposits, bounty escrow locks, and payouts.</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-600 font-extrabold">
                <th className="pb-3">Event Type</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Tx Hash</th>
                <th className="pb-3 text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-800">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      tx.type === 'Escrow Lock' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      tx.type === 'Bounty Payout' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-zinc-900">{tx.label}</td>
                  <td className="py-4 font-mono font-black text-zinc-900">{tx.amount}</td>
                  <td className="py-4 font-mono text-zinc-600 hover:text-zinc-900">
                    <a href="#" className="inline-flex items-center gap-1 hover:underline">
                      {tx.txHash}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="py-4 text-right text-zinc-600">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
