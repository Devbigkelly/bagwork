'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBounty } from '../../../context/BountyContext';
import { useWeb3 } from '../../../context/Web3Context';
import { BountyCategory, BountyDifficulty, TaskType } from '../../../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Coins, 
  Loader2 
} from 'lucide-react';

export default function CreateBountyWizardPage() {
  const router = useRouter();
  const { createNewBounty } = useBounty();
  const { selectedNetwork } = useWeb3();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [projectName, setProjectName] = useState('');
  const [projectLogo, setProjectLogo] = useState('🏹');
  const [projectDesc, setProjectDesc] = useState('');

  const [bountyTitle, setBountyTitle] = useState('');
  const [bountyDesc, setBountyDesc] = useState('');
  const [category, setCategory] = useState<BountyCategory>('Stock Rewards');
  const [difficulty, setDifficulty] = useState<BountyDifficulty>('Intermediate');
  const [deadline, setDeadline] = useState('2026-10-31');

  const [rewardToken, setRewardToken] = useState('HOOD');
  const [network, setNetwork] = useState('Robinhood Chain');
  const [rewardPerContributor, setRewardPerContributor] = useState(50);
  const [totalSlots, setTotalSlots] = useState(10);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskInstructions, setTaskInstructions] = useState('');
  const [taskType, setTaskType] = useState<TaskType>('Stock Reward');

  const totalBountyPool = rewardPerContributor * totalSlots;
  const estimatedGas = 0.001;

  const handlePublishAndFund = async () => {
    setIsSubmitting(true);
    const result = await createNewBounty({
      title: bountyTitle || 'Robinhood Chain Task Reward',
      description: bountyDesc,
      overview: bountyDesc,
      projectName: projectName || 'Robinhood Ecosystem Guild',
      projectLogo,
      category,
      difficulty,
      network,
      rewardToken,
      rewardPerContributor,
      totalSlots,
      deadline: `${deadline}T23:59:59Z`,
      tasks: [
        {
          id: `task-${Date.now()}`,
          title: taskTitle || 'Complete Task & Stock Transfer',
          reward: rewardPerContributor,
          token: rewardToken,
          type: taskType,
          estimatedTime: '20 mins',
          requirements: ['Follow submission instructions'],
          instructions: taskInstructions || 'Provide transaction hash or social proof link.',
          proofRequired: ['tx_hash', 'url'],
        }
      ],
    });
    setIsSubmitting(false);

    if (result.success) {
      router.push(`/bounties/${result.bountyId}`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8 bg-[#fffdf9]">
      
      {/* Back Button */}
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-xs font-extrabold text-zinc-600 hover:text-zinc-900">
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-zinc-900 sm:text-3xl">Create & Fund Bounty</h1>
        <p className="text-xs font-semibold text-zinc-500 mt-1">Set up task requirements, lock rewards in escrow, and publish to contributors.</p>
      </div>

      {/* Step Tracker Indicator */}
      <div className="grid grid-cols-6 gap-2 border-b border-zinc-200 pb-6">
        {[
          { num: 1, label: 'Project' },
          { num: 2, label: 'Bounty' },
          { num: 3, label: 'Rewards' },
          { num: 4, label: 'Tasks' },
          { num: 5, label: 'Review' },
          { num: 6, label: 'Fund Escrow' },
        ].map((s) => (
          <div 
            key={s.num} 
            onClick={() => s.num < step && setStep(s.num)}
            className={`flex flex-col items-center gap-1 cursor-pointer ${step === s.num ? 'text-zinc-900' : step > s.num ? 'text-emerald-700' : 'text-zinc-400'}`}
          >
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black border ${
              step === s.num ? 'border-zinc-900 bg-zinc-900 text-white' :
              step > s.num ? 'border-emerald-500 bg-emerald-100 text-emerald-800' :
              'border-zinc-200 bg-zinc-50 text-zinc-400'
            }`}>
              {step > s.num ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : s.num}
            </div>
            <span className="text-[10px] font-bold hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: PROJECT INFO */}
      {step === 1 && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-4 text-xs font-semibold shadow-sm">
          <h3 className="text-base font-black text-zinc-900">Step 1: Protocol / Project Info</h3>
          
          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Robinhood Ecosystem Guild"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
          </div>

          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Project Logo Emoji</label>
            <input
              type="text"
              placeholder="🏹"
              value={projectLogo}
              onChange={(e) => setProjectLogo(e.target.value)}
              className="w-20 rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 text-center font-bold"
            />
          </div>

          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Project Description</label>
            <textarea
              rows={3}
              placeholder="Brief description of your Web3 project or stock reward campaign..."
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 font-bold text-white hover:bg-zinc-800"
            >
              <span>Next: Bounty Info</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: BOUNTY DETAILS */}
      {step === 2 && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-4 text-xs font-semibold shadow-sm">
          <h3 className="text-base font-black text-zinc-900">Step 2: Bounty Details</h3>

          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Bounty Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Robinhood Chain Stock Rewards Integration"
              value={bountyTitle}
              onChange={(e) => setBountyTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
          </div>

          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Detailed Description</label>
            <textarea
              rows={4}
              placeholder="Explain task requirements and reward release criteria..."
              value={bountyDesc}
              onChange={(e) => setBountyDesc(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 mb-1 font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 font-bold"
              >
                {['Stock Rewards', 'Development', 'Design', 'Research', 'AI', 'Social', 'Testing', 'Content'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-700 mb-1 font-bold">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 font-bold"
              >
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 font-bold text-zinc-700 hover:bg-zinc-200">
              Back
            </button>
            <button onClick={() => setStep(3)} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 font-bold text-white hover:bg-zinc-800">
              <span>Next: Reward Setup</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REWARD & NETWORK SETUP */}
      {step === 3 && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-4 text-xs font-semibold shadow-sm">
          <h3 className="text-base font-black text-zinc-900">Step 3: Network & Reward Token</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 mb-1 font-bold">Blockchain Network</label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 font-bold"
              >
                {['Robinhood Chain', 'Base', 'Ethereum', 'Arbitrum', 'Polygon', 'BNB Chain'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-700 mb-1 font-bold">Payout Token / Stock Reward</label>
              <select
                value={rewardToken}
                onChange={(e) => setRewardToken(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 font-bold"
              >
                {['HOOD', 'AAPL', 'NVDA', 'TSLA', 'USDC', 'USDT', 'ETH', 'POL', 'BNB'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 mb-1 font-bold">Reward Per Contributor ({rewardToken})</label>
              <input
                type="number"
                value={rewardPerContributor}
                onChange={(e) => setRewardPerContributor(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-700 mb-1 font-bold">Number of Winners / Slots</label>
              <input
                type="number"
                value={totalSlots}
                onChange={(e) => setTotalSlots(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-bold"
              />
            </div>
          </div>

          {/* Automatic Calculation Card */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
            <span className="text-[11px] font-extrabold text-emerald-800 uppercase">Calculated Escrow Lock</span>
            <div className="text-xl font-black text-zinc-900">
              {rewardPerContributor} {rewardToken} × {totalSlots} contributors = <span className="text-emerald-700">{totalBountyPool.toLocaleString()} {rewardToken}</span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(2)} className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 font-bold text-zinc-700 hover:bg-zinc-200">
              Back
            </button>
            <button onClick={() => setStep(4)} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 font-bold text-white hover:bg-zinc-800">
              <span>Next: Tasks Setup</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TASKS DEFINITION */}
      {step === 4 && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-4 text-xs font-semibold shadow-sm">
          <h3 className="text-base font-black text-zinc-900">Step 4: Task Definition</h3>

          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Task Title</label>
            <input
              type="text"
              placeholder="e.g. Verify Robinhood Stock Wallet Transfer"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
          </div>

          <div>
            <label className="block text-zinc-700 mb-1 font-bold">Instructions for Contributor</label>
            <textarea
              rows={3}
              placeholder="Detail step-by-step instructions..."
              value={taskInstructions}
              onChange={(e) => setTaskInstructions(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(3)} className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 font-bold text-zinc-700 hover:bg-zinc-200">
              Back
            </button>
            <button onClick={() => setStep(5)} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 font-bold text-white hover:bg-zinc-800">
              <span>Next: Review Preview</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PREVIEW */}
      {step === 5 && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-4 text-xs font-semibold shadow-sm">
          <h3 className="text-base font-black text-zinc-900">Step 5: Bounty Preview</h3>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 space-y-2 text-zinc-800">
            <div><strong>Project:</strong> {projectName || 'Robinhood Ecosystem Guild'} ({projectLogo})</div>
            <div><strong>Title:</strong> {bountyTitle || 'Untitled Task Bounty'}</div>
            <div><strong>Category:</strong> {category} | <strong>Difficulty:</strong> {difficulty}</div>
            <div><strong>Escrow Lock:</strong> <span className="font-black text-emerald-700">{totalBountyPool} {rewardToken}</span> on {network}</div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(4)} className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 font-bold text-zinc-700 hover:bg-zinc-200">
              Back
            </button>
            <button onClick={() => setStep(6)} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-6 py-2.5 font-bold text-white shadow-sm hover:bg-zinc-800">
              <span>Proceed to Fund Escrow</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: ESCROW FUNDING */}
      {step === 6 && (
        <div className="rounded-3xl border border-emerald-300 bg-white p-6 space-y-6 text-xs font-semibold shadow-sm">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
            <Lock className="h-6 w-6 text-emerald-600" />
            <div>
              <h3 className="text-base font-black text-zinc-900">Step 6: Smart Contract Escrow Funding</h3>
              <p className="text-zinc-500">Sign wallet transaction to lock reward funds</p>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200 space-y-2.5 text-zinc-800 font-medium">
            <div className="flex justify-between">
              <span>Bounty Pool Amount:</span>
              <strong className="text-zinc-900 font-bold">{totalBountyPool} {rewardToken}</strong>
            </div>
            <div className="flex justify-between">
              <span>Platform Protocol Fee (0%):</span>
              <strong className="text-emerald-700 font-bold">0 {rewardToken}</strong>
            </div>
            <div className="flex justify-between">
              <span>Estimated Gas ({network}):</span>
              <strong className="text-zinc-900 font-bold">{estimatedGas} HOOD/ETH</strong>
            </div>
            <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-black text-zinc-900">
              <span>Total Lock Requirement:</span>
              <span className="text-emerald-700">{totalBountyPool} {rewardToken}</span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(5)} className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 font-bold text-zinc-700 hover:bg-zinc-200">
              Back
            </button>

            <button
              onClick={handlePublishAndFund}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 px-7 py-3 text-sm font-black text-white shadow-md hover:bg-zinc-800 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Coins className="h-5 w-5 text-emerald-400" />}
              <span>{isSubmitting ? 'Confirming Lock...' : 'Fund Escrow & Publish Bounty'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
