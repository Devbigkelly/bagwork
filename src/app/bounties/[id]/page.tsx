'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useBounty } from '../../../context/BountyContext';
import { useWeb3 } from '../../../context/Web3Context';
import EscrowCard from '../../../components/ui/EscrowCard';
import ProofSubmissionModal from '../../../components/ui/ProofSubmissionModal';
import { Task } from '../../../types';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Wallet,
  Lock
} from 'lucide-react';
import { useNotification } from '../../../context/NotificationContext';

export default function BountyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getBountyById, acceptedBountyIds, acceptBounty } = useBounty();
  const { isWalletConnected, openWalletModal } = useWeb3();
  const { addToast } = useNotification();

  const bounty = getBountyById(resolvedParams.id) || getBountyById('bounty-1');

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'requirements' | 'rules' | 'faq'>('overview');
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState<Task | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  if (!bounty) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-zinc-900">Bounty Not Found</h2>
        <Link href="/bounties" className="mt-4 inline-block text-xs font-bold text-emerald-600 hover:underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isAccepted = acceptedBountyIds.includes(bounty.id);

  const handleConfirmAccept = () => {
    acceptBounty(bounty.id);
    setIsAcceptModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#fffdf9]">
      
      {/* Back Button Link */}
      <Link href="/bounties" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-zinc-600 hover:text-zinc-900">
        <ArrowLeft className="h-4 w-4" />
        Back to All Bounties
      </Link>

      {/* Top Banner Header */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Project & Title Info */}
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-3xl border border-zinc-200 shadow-inner shrink-0">
              {bounty.projectLogo}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-zinc-900">{bounty.projectName}</span>
                {bounty.isVerifiedProject && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  {bounty.category}
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl leading-tight">
                {bounty.title}
              </h1>

              <p className="mt-2 text-xs font-medium text-zinc-600 max-w-2xl leading-relaxed">
                {bounty.description}
              </p>
            </div>
          </div>

          {/* Reward & Action Panel */}
          <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0 md:pl-6 shrink-0">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Total Reward</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-zinc-900">{bounty.rewardPerContributor}</span>
                <span className="text-sm font-black text-emerald-600">{bounty.rewardToken}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs font-bold text-zinc-600">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-zinc-500" />
                <span>{bounty.filledSlots} / {bounty.totalSlots} Slots</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-zinc-500" />
                <span>Ends in 4 days</span>
              </div>
            </div>

            {/* Accept / Wallet Gated Button */}
            <div className="mt-5 w-full md:w-auto">
              {!isWalletConnected ? (
                <button
                  onClick={openWalletModal}
                  className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-7 py-3 text-xs font-black text-white shadow-md hover:bg-zinc-800"
                >
                  <Wallet className="h-4 w-4 text-emerald-400" />
                  <span>Connect Wallet to Accept & Start Task</span>
                </button>
              ) : isAccepted ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-100 border border-emerald-200 px-5 py-2.5 text-xs font-extrabold text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>IN PROGRESS (Accepted)</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsAcceptModalOpen(true)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-7 py-3 text-xs font-black text-white shadow-md hover:bg-zinc-800"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Accept & Start Bounty</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Main Grid: Left Tabs & Details / Right Escrow Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Details & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-200 space-x-6 text-xs font-extrabold">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tasks', label: `Tasks (${bounty.tasks.length})` },
              { id: 'requirements', label: 'Requirements & Deliverables' },
              { id: 'rules', label: 'Rules' },
              { id: 'faq', label: 'FAQ' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-6 text-xs text-zinc-700 font-medium shadow-sm">
              <div>
                <h3 className="text-sm font-black text-zinc-900 mb-2">Project Overview</h3>
                <p className="leading-relaxed">{bounty.overview}</p>
              </div>

              <div>
                <h3 className="text-sm font-black text-zinc-900 mb-2">Bounty Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {bounty.tags.map((tag, idx) => (
                    <span key={idx} className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-800 border border-zinc-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zinc-900">Bounty Tasks ({bounty.tasks.length})</h3>
              
              {bounty.tasks.map((task) => (
                <div 
                  key={task.id}
                  className="rounded-3xl border border-zinc-200 bg-white p-5 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                    <div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200">
                        {task.type}
                      </span>
                      <h4 className="mt-1 text-sm font-black text-zinc-900">{task.title}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-emerald-700">{task.reward} {task.token}</span>
                      
                      {!isWalletConnected ? (
                        <button
                          onClick={openWalletModal}
                          className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-extrabold text-white hover:bg-zinc-800"
                        >
                          Connect Wallet
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (!isAccepted) {
                              addToast('Start Bounty First', 'Click "Accept & Start Bounty" at the top before submitting proof.', 'info');
                              return;
                            }
                            setSelectedTaskForSubmission(task);
                          }}
                          className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-extrabold text-white hover:bg-zinc-800"
                        >
                          Submit Task Proof
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 font-medium leading-relaxed">{task.instructions}</p>

                  <div className="grid grid-cols-2 gap-4 text-[11px] font-semibold text-zinc-600 bg-zinc-50 p-3 rounded-2xl border border-zinc-200">
                    <div>
                      <span className="font-extrabold text-zinc-900">Estimated Time:</span> {task.estimatedTime}
                    </div>
                    <div>
                      <span className="font-extrabold text-zinc-900">Required Proof:</span> {task.proofRequired.join(', ').toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: REQUIREMENTS & DELIVERABLES */}
          {activeTab === 'requirements' && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-6 text-xs text-zinc-700 font-medium shadow-sm">
              <div>
                <h3 className="text-sm font-black text-zinc-900 mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  {bounty.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-black text-zinc-900 mb-2">Expected Deliverables</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  {bounty.deliverables.map((del, i) => (
                    <li key={i}>{del}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: RULES */}
          {activeTab === 'rules' && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-xs text-zinc-700 font-medium shadow-sm">
              <h3 className="text-sm font-black text-zinc-900 mb-3">Submission Rules & Policies</h3>
              <ul className="list-disc pl-5 space-y-2">
                {bounty.rules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-4 text-xs font-medium text-zinc-700 shadow-sm">
              <h3 className="text-sm font-black text-zinc-900 mb-2">Frequently Asked Questions</h3>
              {bounty.faqs.map((faq, i) => (
                <div key={i} className="border-b border-zinc-100 pb-3">
                  <h4 className="font-extrabold text-zinc-900">{faq.question}</h4>
                  <p className="mt-1 text-zinc-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (1 Col): Smart Contract Escrow Sidebar */}
        <div className="space-y-6">
          <EscrowCard bounty={bounty} />
        </div>

      </div>

      {/* Acceptance Confirmation Modal */}
      {isAcceptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <h3 className="text-base font-black text-zinc-900">Accept Bounty Confirmation</h3>
            <p className="mt-2 text-xs font-medium text-zinc-600">
              You are about to start <strong className="text-zinc-900">{bounty.title}</strong>.
            </p>

            <div className="mt-4 rounded-2xl bg-zinc-50 p-3.5 text-xs space-y-1.5 text-zinc-700 font-medium border border-zinc-200">
              <div>Reward per contributor: <strong className="text-zinc-900 font-bold">{bounty.rewardPerContributor} {bounty.rewardToken}</strong></div>
              <div>Available slots: <strong className="text-zinc-900 font-bold">{bounty.totalSlots - bounty.filledSlots} remaining</strong></div>
              <div>Deadline: <strong className="text-zinc-900 font-bold">4 days</strong></div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccept}
                className="rounded-xl bg-zinc-900 px-5 py-2 text-xs font-black text-white hover:bg-zinc-800"
              >
                Accept & Start Bounty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proof Submission Modal */}
      {selectedTaskForSubmission && (
        <ProofSubmissionModal
          bountyId={bounty.id}
          task={selectedTaskForSubmission}
          isOpen={!!selectedTaskForSubmission}
          onClose={() => setSelectedTaskForSubmission(null)}
        />
      )}

    </div>
  );
}
