export type WalletType = 'metamask' | 'coinbase' | 'walletconnect' | 'rainbow' | 'phantom';

export type WalletStatus = 
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'wrong_network'
  | 'tx_pending'
  | 'tx_confirmed'
  | 'tx_failed';

export interface Network {
  id: string;
  name: string;
  chainId: number;
  symbol: string;
  icon: string;
  color: string;
  explorerUrl: string;
  isSupported: boolean;
}

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  icon: string;
}

export type BountyCategory = 
  | 'All'
  | 'Trending'
  | 'New'
  | 'Highest Reward'
  | 'Stock Rewards'
  | 'Protocol'
  | 'Social'
  | 'Development'
  | 'Design'
  | 'Content'
  | 'Research'
  | 'Testing'
  | 'Data'
  | 'AI'
  | 'Other';

export type BountyDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type EscrowStatus = 'FUNDED' | 'PARTIALLY_RELEASED' | 'RELEASED' | 'REFUNDED' | 'UNFUNDED';

export type TaskType = 
  | 'Social' 
  | 'Community' 
  | 'Development' 
  | 'Design' 
  | 'Content' 
  | 'Research' 
  | 'Testing' 
  | 'Data' 
  | 'AI' 
  | 'Marketing' 
  | 'Stock Reward'
  | 'On-Chain Activity';

export interface Task {
  id: string;
  title: string;
  reward: number;
  token: string;
  type: TaskType;
  estimatedTime: string;
  requirements: string[];
  instructions: string;
  proofRequired: ('screenshot' | 'url' | 'github' | 'tx_hash' | 'text')[];
  onChainVerification?: {
    requiredNetwork: string;
    contractAddress?: string;
    minAmount?: number;
    tokenSymbol?: string;
    txType?: string;
  };
  isCompleted?: boolean;
}

export interface Bounty {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  projectLogo: string;
  projectName: string;
  projectSlug: string;
  isVerifiedProject: boolean;
  isEscrowFunded: boolean;
  isOnChainVerified: boolean;
  isStockReward?: boolean;
  category: BountyCategory;
  difficulty: BountyDifficulty;
  network: string;
  rewardToken: string;
  rewardPerContributor: number;
  totalPool: number;
  fundedAmount: number;
  distributedAmount: number;
  totalSlots: number;
  filledSlots: number;
  deadline: string;
  createdAt: string;
  contractAddress: string;
  escrowTxHash: string;
  creatorWallet: string;
  tasks: Task[];
  requirements: string[];
  deliverables: string[];
  eligibility: string[];
  rules: string[];
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED' | 'DISPUTED';

export interface Submission {
  id: string;
  bountyId: string;
  bountyTitle: string;
  projectName: string;
  taskId: string;
  taskTitle: string;
  contributorWallet: string;
  contributorUsername: string;
  contributorAvatar: string;
  contributorReputation: number;
  submittedAt: string;
  proofType: 'screenshot' | 'url' | 'github' | 'tx_hash' | 'text';
  proofValue: string;
  proofUrl?: string;
  txHash?: string;
  additionalNotes?: string;
  status: SubmissionStatus;
  rewardAmount: number;
  rewardToken: string;
  rejectionReason?: string;
  feedback?: string;
}

export type TxType = 'Bounty Reward' | 'Withdrawal' | 'Escrow Funding' | 'Refund' | 'Bonus' | 'Referral' | 'Manual Stock Payout';
export type TxStatus = 'Pending' | 'Confirmed' | 'Failed';

export interface Web3Transaction {
  id: string;
  type: TxType;
  amount: number;
  token: string;
  network: string;
  status: TxStatus;
  date: string;
  txHash: string;
  recipientWallet?: string;
  bountyTitle?: string;
}

export interface Community {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  isVerified: boolean;
  membersCount: number;
  activeBountiesCount: number;
  totalRewardsDistributed: number;
  category: string;
  website: string;
  twitter: string;
  discord: string;
}

export interface ContributorProfile {
  username: string;
  walletAddress: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  joinedDate: string;
  reputationScore: number;
  bountiesCompleted: number;
  totalEarnedUsd: number;
  approvalRate: number;
  rank: number;
  badges: string[];
  skills: string[];
  communitiesJoined: string[];
  githubUrl?: string;
  twitterUrl?: string;
}

export interface Dispute {
  id: string;
  submissionId: string;
  bountyTitle: string;
  contributorWallet: string;
  creatorWallet: string;
  reason: string;
  evidence: string;
  status: 'OPEN' | 'RESOLVED_APPROVE' | 'RESOLVED_REJECT' | 'UNDER_REVIEW';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'reward' | 'submission' | 'escrow' | 'network' | 'info';
  timestamp: string;
  isRead: boolean;
  link?: string;
}
