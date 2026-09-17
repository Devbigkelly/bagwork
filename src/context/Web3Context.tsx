'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { formatEther } from 'viem';
import { Network, TokenBalance, WalletStatus, WalletType } from '../types';
import { SUPPORTED_NETWORKS } from '../data/mockData';
import { useNotification } from './NotificationContext';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  isWalletConnected: boolean;
  walletStatus: WalletStatus;
  walletType: WalletType | null;
  walletAddress: string | null;
  truncatedAddress: string;
  selectedNetwork: Network;
  tokenBalances: TokenBalance[];
  nativeBalance: number;
  totalUsdBalance: number;
  isWalletModalOpen: boolean;
  isNetworkModalOpen: boolean;
  activeTxHash: string | null;
  hasInjectedWallet: boolean;
  connectWallet: (type: WalletType) => Promise<boolean>;
  disconnectWallet: () => void;
  switchNetwork: (networkId: string) => Promise<void>;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  openNetworkModal: () => void;
  closeNetworkModal: () => void;
  simulateTransaction: (description: string) => Promise<{ success: boolean; txHash: string }>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  // STRICTLY DISCONNECTED BY DEFAULT (No demo wallet)
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletStatus, setWalletStatus] = useState<WalletStatus>('disconnected');
  const [walletType, setWalletType] = useState<WalletType | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(SUPPORTED_NETWORKS[0]);
  const [nativeBalance, setNativeBalance] = useState<number>(0);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([
    { symbol: 'USDC', name: 'USD Coin', balance: 0, usdValue: 0, icon: '💵' },
    { symbol: 'ETH', name: 'Ethereum', balance: 0, usdValue: 0, icon: '⧫' },
  ]);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState<boolean>(false);
  const [activeTxHash, setActiveTxHash] = useState<string | null>(null);
  const [hasInjectedWallet, setHasInjectedWallet] = useState<boolean>(false);

  const { addToast, addNotification } = useNotification();

  const truncatedAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  const totalUsdBalance = tokenBalances.reduce((acc, b) => acc + b.usdValue, 0);

  // Fetch real balance from window.ethereum provider
  const fetchRealBalance = useCallback(async (address: string) => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const balanceHex = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });
        const balanceWei = BigInt(balanceHex);
        const formatted = parseFloat(formatEther(balanceWei));
        setNativeBalance(parseFloat(formatted.toFixed(4)));

        setTokenBalances(prev => prev.map(tb => {
          if (tb.symbol === 'ETH') {
            return {
              ...tb,
              balance: parseFloat(formatted.toFixed(4)),
              usdValue: parseFloat((formatted * 2950).toFixed(2)),
            };
          }
          return tb;
        }));
      } catch (err) {
        console.error('Error reading wallet balance:', err);
      }
    }
  }, []);

  // Initial check for browser wallet
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setHasInjectedWallet(true);

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          setWalletStatus('connected');
          fetchRealBalance(accounts[0]);
          addToast('Account Changed', `Wallet: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`, 'info');
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [fetchRealBalance]);

  // Provider resolver helper
  const getEthereumProvider = (type: WalletType) => {
    if (typeof window === 'undefined') return null;

    if (window.ethereum?.providers && Array.isArray(window.ethereum.providers)) {
      if (type === 'metamask') {
        const provider = window.ethereum.providers.find((p: any) => p.isMetaMask && !p.isPhantom);
        if (provider) return provider;
      }
      if (type === 'coinbase') {
        const provider = window.ethereum.providers.find((p: any) => p.isCoinbaseWallet);
        if (provider) return provider;
      }
      if (type === 'phantom') {
        const provider = window.ethereum.providers.find((p: any) => p.isPhantom);
        if (provider) return provider;
      }
    }

    if (type === 'phantom' && (window as any).phantom?.ethereum) {
      return (window as any).phantom.ethereum;
    }

    return window.ethereum || null;
  };

  // Real Wallet Connect ONLY
  const connectWallet = async (type: WalletType): Promise<boolean> => {
    setWalletStatus('connecting');
    setWalletType(type);

    const provider = getEthereumProvider(type);

    if (provider) {
      try {
        let accounts: string[] = [];

        try {
          accounts = await provider.request({
            method: 'eth_requestAccounts',
          });
        } catch (reqErr: any) {
          // If coinType 60 or specific method fails, attempt fallback to eth_accounts
          if (reqErr?.message?.includes('60')) {
            accounts = await provider.request({ method: 'eth_accounts' });
          } else {
            throw reqErr;
          }
        }

        if (accounts && accounts.length > 0) {
          const realAddress = accounts[0];
          setWalletAddress(realAddress);
          setIsWalletConnected(true);
          setWalletStatus('connected');
          setIsWalletModalOpen(false);

          await fetchRealBalance(realAddress);

          addToast('Wallet Connected', `${realAddress.slice(0, 6)}...${realAddress.slice(-4)} linked`, 'success');
          addNotification({
            title: 'Wallet Connected',
            message: `Connected wallet ${realAddress.slice(0, 6)}...${realAddress.slice(-4)}`,
            type: 'reward',
          });

          return true;
        }
      } catch (error: any) {
        console.error('Wallet connection error:', error);
        let errorMsg = error?.message || 'User rejected wallet connection';
        if (errorMsg.includes('account for 60') || errorMsg.includes('60')) {
          errorMsg = 'No EVM/Ethereum account active in your wallet. Please unlock an Ethereum account in your wallet extension.';
        }
        addToast('Connection Error', errorMsg, 'error');
        setWalletStatus('disconnected');
        return false;
      }
    }

    setWalletStatus('disconnected');
    addToast('Wallet Extension Missing', 'Please install MetaMask or Coinbase Wallet extension in your browser to connect.', 'warning');
    return false;
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletStatus('disconnected');
    setWalletAddress(null);
    setWalletType(null);
    setNativeBalance(0);
    addToast('Wallet Disconnected', 'Your wallet connection has been cleared.', 'info');
  };

  const switchNetwork = async (networkId: string) => {
    const net = SUPPORTED_NETWORKS.find(n => n.id === networkId);
    if (!net) return;
    setSelectedNetwork(net);
    setIsNetworkModalOpen(false);
  };

  const simulateTransaction = async (description: string): Promise<{ success: boolean; txHash: string }> => {
    setWalletStatus('tx_pending');
    
    if (typeof window !== 'undefined' && window.ethereum && walletAddress) {
      try {
        const txParams = {
          from: walletAddress,
          to: walletAddress,
          value: '0x0',
          data: '0x',
        };

        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [txParams],
        });

        setActiveTxHash(txHash);
        setWalletStatus('tx_confirmed');
        setTimeout(() => setWalletStatus('connected'), 2000);
        return { success: true, txHash };
      } catch (err: any) {
        console.warn('Transaction cancelled by user:', err);
      }
    }

    const mockTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setActiveTxHash(mockTxHash);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setWalletStatus('tx_confirmed');
    setTimeout(() => setWalletStatus('connected'), 1500);

    return { success: true, txHash: mockTxHash };
  };

  return (
    <Web3Context.Provider
      value={{
        isWalletConnected,
        walletStatus,
        walletType,
        walletAddress,
        truncatedAddress,
        selectedNetwork,
        tokenBalances,
        nativeBalance,
        totalUsdBalance,
        isWalletModalOpen,
        isNetworkModalOpen,
        activeTxHash,
        hasInjectedWallet,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        openWalletModal: () => setIsWalletModalOpen(true),
        closeWalletModal: () => setIsWalletModalOpen(false),
        openNetworkModal: () => setIsNetworkModalOpen(true),
        closeNetworkModal: () => setIsNetworkModalOpen(false),
        simulateTransaction,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
