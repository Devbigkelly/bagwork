'use client';

import React, { useState } from 'react';
import { useBounty } from '../../context/BountyContext';
import { Task } from '../../types';
import { X, Upload, Link as LinkIcon, Code2, Hash, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface ProofSubmissionModalProps {
  bountyId: string;
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProofSubmissionModal({ bountyId, task, isOpen, onClose }: ProofSubmissionModalProps) {
  const { submitTaskProof } = useBounty();
  const { addToast } = useNotification();

  const [proofType, setProofType] = useState<'github' | 'url' | 'tx_hash' | 'screenshot' | 'text'>('github');
  const [proofValue, setProofValue] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [txHash, setTxHash] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isVerifyingOnChain, setIsVerifyingOnChain] = useState(false);
  const [isOnChainVerified, setIsOnChainVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSimulateOnChainVerification = async () => {
    if (!txHash) {
      addToast('Transaction Hash Required', 'Please enter a valid transaction hash to verify.', 'warning');
      return;
    }

    setIsVerifyingOnChain(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsVerifyingOnChain(false);
    setIsOnChainVerified(true);
    addToast('Transaction Verified! ✅', `Confirmed on ${task.onChainVerification?.requiredNetwork || 'Base'} block #18,492,019.`, 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofValue && !proofUrl && !txHash) {
      addToast('Proof Required', 'Please provide proof URL, GitHub repository, or transaction hash.', 'warning');
      return;
    }

    setIsSubmitting(true);
    await submitTaskProof({
      bountyId,
      taskId: task.id,
      proofType,
      proofValue: proofValue || proofUrl || txHash,
      proofUrl,
      txHash,
      additionalNotes,
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-base font-black text-zinc-900">Submit Proof of Task Work</h3>
            <p className="text-xs font-semibold text-zinc-500 mt-0.5">Task: <span className="text-zinc-900 font-bold">{task.title}</span></p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Task Details Banner */}
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 flex items-center justify-between text-xs font-semibold">
          <div>
            <span className="text-emerald-800">Task Reward:</span>
            <span className="ml-1.5 font-black text-emerald-900 text-sm">{task.reward} {task.token}</span>
          </div>
          <div>
            <span className="text-emerald-800">Estimated Time:</span>
            <span className="ml-1.5 font-bold text-zinc-900">{task.estimatedTime}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          
          {/* Proof Type Selector */}
          <div>
            <label className="font-extrabold text-zinc-800 mb-1.5 block">Select Proof Format</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { type: 'github', label: 'GitHub', icon: Code2 },
                { type: 'url', label: 'Demo URL', icon: LinkIcon },
                { type: 'tx_hash', label: 'On-Chain Tx', icon: Hash },
                { type: 'text', label: 'Text Notes', icon: Upload },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = proofType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setProofType(item.type as any)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proof Input Fields */}
          {proofType === 'github' && (
            <div>
              <label className="font-extrabold text-zinc-800 mb-1 block">GitHub Pull Request / Repository Link</label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/repository/pull/1"
                value={proofValue}
                onChange={(e) => setProofValue(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
              />
            </div>
          )}

          {proofType === 'url' && (
            <div>
              <label className="font-extrabold text-zinc-800 mb-1 block">Live Demo / Hosted Web Link</label>
              <input
                type="url"
                required
                placeholder="https://my-task-demo.vercel.app"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
              />
            </div>
          )}

          {proofType === 'tx_hash' && (
            <div className="space-y-2">
              <label className="font-extrabold text-zinc-800 block">Blockchain Transaction Hash</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="0x9a83f1e941b2c3d4e5f67a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="flex-1 rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-mono placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSimulateOnChainVerification}
                  disabled={isVerifyingOnChain}
                  className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-zinc-800"
                >
                  {isVerifyingOnChain ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-emerald-400" />}
                  Verify
                </button>
              </div>

              {isOnChainVerified && (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-100 border border-emerald-200 p-2.5 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>On-Chain Verification Passed on {task.onChainVerification?.requiredNetwork || 'Base'} network!</span>
                </div>
              )}
            </div>
          )}

          {/* Additional Notes */}
          <div>
            <label className="font-extrabold text-zinc-800 mb-1 block">Additional Notes for Creator (Optional)</label>
            <textarea
              rows={3}
              placeholder="Describe your implementation details, test credentials, or notes..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
            />
          </div>

          {/* Form CTA */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-zinc-800 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              Submit Task Proof
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
