'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  Bounty, 
  BountyCategory, 
  Submission, 
  Dispute, 
  Web3Transaction 
} from '../types';
import { 
  MOCK_BOUNTIES, 
  MOCK_SUBMISSIONS, 
  MOCK_DISPUTES, 
  MOCK_TRANSACTIONS 
} from '../data/mockData';
import { useNotification } from './NotificationContext';
import { useWeb3 } from './Web3Context';

interface BountyContextType {
  bounties: Bounty[];
  submissions: Submission[];
  disputes: Dispute[];
  transactions: Web3Transaction[];
  acceptedBountyIds: string[];
  selectedCategory: BountyCategory;
  searchQuery: string;
  setSelectedCategory: (cat: BountyCategory) => void;
  setSearchQuery: (query: string) => void;
  getBountyById: (id: string) => Bounty | undefined;
  acceptBounty: (bountyId: string) => boolean;
  submitTaskProof: (payload: {
    bountyId: string;
    taskId: string;
    proofType: 'screenshot' | 'url' | 'github' | 'tx_hash' | 'text';
    proofValue: string;
    proofUrl?: string;
    txHash?: string;
    additionalNotes?: string;
  }) => Promise<boolean>;
  createNewBounty: (newBountyData: Partial<Bounty>) => Promise<{ success: boolean; bountyId: string }>;
  approveSubmission: (submissionId: string) => Promise<boolean>;
  rejectSubmission: (submissionId: string, reason: string) => Promise<boolean>;
  raiseDispute: (submissionId: string, reason: string, evidence: string) => boolean;
  resolveDispute: (disputeId: string, action: 'approve' | 'reject') => boolean;
}

const BountyContext = createContext<BountyContextType | undefined>(undefined);

export function BountyProvider({ children }: { children: React.ReactNode }) {
  const [bounties, setBounties] = useState<Bounty[]>(MOCK_BOUNTIES);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [disputes, setDisputes] = useState<Dispute[]>(MOCK_DISPUTES);
  const [transactions, setTransactions] = useState<Web3Transaction[]>(MOCK_TRANSACTIONS);
  const [acceptedBountyIds, setAcceptedBountyIds] = useState<string[]>(['bounty-1']);
  const [selectedCategory, setSelectedCategory] = useState<BountyCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { addToast, addNotification } = useNotification();
  const { walletAddress, simulateTransaction } = useWeb3();

  const getBountyById = (id: string) => bounties.find(b => b.id === id || b.slug === id);

  const acceptBounty = (bountyId: string): boolean => {
    if (!acceptedBountyIds.includes(bountyId)) {
      setAcceptedBountyIds(prev => [...prev, bountyId]);
      addToast('Bounty Accepted!', 'You can now complete tasks and submit your proof.', 'success');
      addNotification({
        title: 'Bounty Started',
        message: `You accepted bounty "${getBountyById(bountyId)?.title || 'Task'}"`,
        type: 'info',
      });
      return true;
    }
    return false;
  };

  const submitTaskProof = async (payload: {
    bountyId: string;
    taskId: string;
    proofType: 'screenshot' | 'url' | 'github' | 'tx_hash' | 'text';
    proofValue: string;
    proofUrl?: string;
    txHash?: string;
    additionalNotes?: string;
  }): Promise<boolean> => {
    const bounty = getBountyById(payload.bountyId);
    if (!bounty) return false;

    const task = bounty.tasks.find(t => t.id === payload.taskId);

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      bountyId: bounty.id,
      bountyTitle: bounty.title,
      projectName: bounty.projectName,
      taskId: payload.taskId,
      taskTitle: task?.title || 'Task Contribution',
      contributorWallet: walletAddress || '0x8A82C9814271A3542B7100bF91a27e774F2199AF',
      contributorUsername: 'alex_sol',
      contributorAvatar: '⚡',
      contributorReputation: 984,
      submittedAt: new Date().toISOString(),
      proofType: payload.proofType,
      proofValue: payload.proofValue,
      proofUrl: payload.proofUrl,
      txHash: payload.txHash,
      additionalNotes: payload.additionalNotes,
      status: 'PENDING',
      rewardAmount: task?.reward || bounty.rewardPerContributor,
      rewardToken: bounty.rewardToken,
    };

    setSubmissions(prev => [newSub, ...prev]);
    addToast('Proof Submitted!', 'Your contribution has been logged and is under creator review.', 'success');
    addNotification({
      title: 'Submission Received',
      message: `Proof for "${task?.title || bounty.title}" submitted successfully.`,
      type: 'submission',
    });

    return true;
  };

  const createNewBounty = async (data: Partial<Bounty>): Promise<{ success: boolean; bountyId: string }> => {
    // Escrow funding simulation
    await simulateTransaction('Fund Smart Contract Escrow');

    const newId = `bounty-${Date.now()}`;
    const newBounty: Bounty = {
      id: newId,
      title: data.title || 'New Web3 Bounty',
      slug: (data.title || 'new-bounty').toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      overview: data.overview || data.description || '',
      projectLogo: data.projectLogo || '🚀',
      projectName: data.projectName || 'My Protocol',
      projectSlug: (data.projectName || 'my-protocol').toLowerCase().replace(/\s+/g, '-'),
      isVerifiedProject: true,
      isEscrowFunded: true,
      isOnChainVerified: true,
      category: data.category || 'Development',
      difficulty: data.difficulty || 'Intermediate',
      network: data.network || 'Base',
      rewardToken: data.rewardToken || 'USDC',
      rewardPerContributor: data.rewardPerContributor || 100,
      totalPool: (data.rewardPerContributor || 100) * (data.totalSlots || 5),
      fundedAmount: (data.rewardPerContributor || 100) * (data.totalSlots || 5),
      distributedAmount: 0,
      totalSlots: data.totalSlots || 5,
      filledSlots: 0,
      deadline: data.deadline || '2026-10-31T23:59:59Z',
      createdAt: new Date().toISOString(),
      contractAddress: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      escrowTxHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      creatorWallet: walletAddress || '0x3F82C9814271A3542B7100bF91a27e77',
      tasks: data.tasks || [
        {
          id: `task-${Date.now()}-1`,
          title: 'Deliver Core Requirement',
          reward: data.rewardPerContributor || 100,
          token: data.rewardToken || 'USDC',
          type: 'Development',
          estimatedTime: '2 hours',
          requirements: ['Deliver complete solution'],
          instructions: 'Submit GitHub repository or working demo URL.',
          proofRequired: ['github', 'url'],
        }
      ],
      requirements: data.requirements || ['Quality submission'],
      deliverables: data.deliverables || ['Verified proof link'],
      eligibility: ['Open to all contributors'],
      rules: ['Standard submission guidelines'],
      faqs: [{ question: 'When are funds released?', answer: 'Immediately upon creator review approval.' }],
      tags: data.tags || ['Web3', 'Escrow', 'Bounty'],
    };

    setBounties(prev => [newBounty, ...prev]);

    // Add Escrow Tx Log
    const newTx: Web3Transaction = {
      id: `tx-${Date.now()}`,
      type: 'Escrow Funding',
      amount: newBounty.totalPool,
      token: newBounty.rewardToken,
      network: newBounty.network,
      status: 'Confirmed',
      date: new Date().toISOString(),
      txHash: newBounty.escrowTxHash,
      recipientWallet: newBounty.contractAddress,
      bountyTitle: newBounty.title,
    };
    setTransactions(prev => [newTx, ...prev]);

    addToast('Escrow Funded & Bounty Published! 🎉', `${newBounty.totalPool} ${newBounty.rewardToken} locked on ${newBounty.network}.`, 'success');
    addNotification({
      title: 'Bounty Published',
      message: `Bounty "${newBounty.title}" is now active with ${newBounty.totalPool} ${newBounty.rewardToken} in smart contract escrow.`,
      type: 'escrow',
    });

    return { success: true, bountyId: newId };
  };

  const approveSubmission = async (submissionId: string): Promise<boolean> => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return false;

    // Simulate Payout On-Chain Tx
    await simulateTransaction(`Release ${sub.rewardAmount} ${sub.rewardToken} from Escrow`);

    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'APPROVED' } : s));

    // Update Bounty stats
    setBounties(prev => prev.map(b => {
      if (b.id === sub.bountyId) {
        return {
          ...b,
          distributedAmount: b.distributedAmount + sub.rewardAmount,
          filledSlots: Math.min(b.filledSlots + 1, b.totalSlots),
        };
      }
      return b;
    }));

    // Record Payout Tx
    const payoutTx: Web3Transaction = {
      id: `tx-${Date.now()}`,
      type: 'Bounty Reward',
      amount: sub.rewardAmount,
      token: sub.rewardToken,
      network: 'Base',
      status: 'Confirmed',
      date: new Date().toISOString(),
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      recipientWallet: sub.contributorWallet,
      bountyTitle: sub.bountyTitle,
    };
    setTransactions(prev => [payoutTx, ...prev]);

    addToast('Reward Released! 💎', `${sub.rewardAmount} ${sub.rewardToken} transferred to ${sub.contributorUsername}.`, 'success');
    addNotification({
      title: 'Reward Released',
      message: `Payout of ${sub.rewardAmount} ${sub.rewardToken} released to ${sub.contributorWallet.slice(0, 6)}...`,
      type: 'reward',
    });

    return true;
  };

  const rejectSubmission = async (submissionId: string, reason: string): Promise<boolean> => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'REJECTED', rejectionReason: reason } : s));
    addToast('Submission Rejected', 'Feedback provided to contributor.', 'warning');
    return true;
  };

  const raiseDispute = (submissionId: string, reason: string, evidence: string): boolean => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return false;

    const newDispute: Dispute = {
      id: `disp-${Date.now()}`,
      submissionId,
      bountyTitle: sub.bountyTitle,
      contributorWallet: sub.contributorWallet,
      creatorWallet: '0x3F82C9814271A3542B7100bF91a27e77',
      reason,
      evidence,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    setDisputes(prev => [newDispute, ...prev]);
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'DISPUTED' } : s));
    addToast('Dispute Submitted', 'Platform moderators will review on-chain logs & evidence within 24h.', 'info');
    return true;
  };

  const resolveDispute = (disputeId: string, action: 'approve' | 'reject'): boolean => {
    const disp = disputes.find(d => d.id === disputeId);
    if (!disp) return false;

    setDisputes(prev => prev.map(d => d.id === disputeId ? { 
      ...d, 
      status: action === 'approve' ? 'RESOLVED_APPROVE' : 'RESOLVED_REJECT' 
    } : d));

    if (action === 'approve') {
      approveSubmission(disp.submissionId);
    } else {
      setSubmissions(prev => prev.map(s => s.id === disp.submissionId ? { ...s, status: 'REJECTED' } : s));
    }

    addToast('Dispute Resolved', `Claim resolved with action: ${action.toUpperCase()}`, 'success');
    return true;
  };

  return (
    <BountyContext.Provider
      value={{
        bounties,
        submissions,
        disputes,
        transactions,
        acceptedBountyIds,
        selectedCategory,
        searchQuery,
        setSelectedCategory,
        setSearchQuery,
        getBountyById,
        acceptBounty,
        submitTaskProof,
        createNewBounty,
        approveSubmission,
        rejectSubmission,
        raiseDispute,
        resolveDispute,
      }}
    >
      {children}
    </BountyContext.Provider>
  );
}

export function useBounty() {
  const context = useContext(BountyContext);
  if (!context) {
    throw new Error('useBounty must be used within a BountyProvider');
  }
  return context;
}
