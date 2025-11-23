// Mining control hook for managing mining operations

import { useState, useRef, useCallback } from 'react';
import { mine } from '../lib/apiGame';
import { MiningDetails } from '../lib/types';

export interface UseMiningOptions {
  playerId: string;
  onBlockMined?: () => void;
}

export interface UseMiningResult {
  isMining: boolean;
  attempts: number;
  successes: number;
  lastMessage: string | null;
  lastMiningDetails: MiningDetails | null;
  currentNonce: number | null;
  startMining: () => void;
  stopMining: () => void;
}

export function useMining({ playerId, onBlockMined }: UseMiningOptions): UseMiningResult {
  const [isMining, setIsMining] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [lastMiningDetails, setLastMiningDetails] = useState<MiningDetails | null>(null);
  const [currentNonce, setCurrentNonce] = useState<number | null>(null);
  const intervalRef = useRef<number>();
  const intervalMs = 500; // Faster mining with limited nonce range

  const stopMiningRef = useRef<() => void>();
  
  const attemptMine = useCallback(async () => {
    // Generate random nonce (limited to 4 digits)
    const nonce = Math.floor(Math.random() * 10000);  // 0-9999
    setCurrentNonce(nonce);
    
    try {
      const response = await mine(playerId, nonce);
      setAttempts((prev: number) => prev + 1);
      
      // Update message and details
      if (response.message) {
        setLastMessage(response.message);
      }
      if (response.details) {
        setLastMiningDetails(response.details);
      }
      
      if (response.success) {
        setSuccesses((prev: number) => prev + 1);
        if (onBlockMined) {
          onBlockMined();
        }
        // Stop mining on success to show the result
        if (stopMiningRef.current) {
          stopMiningRef.current();
        }
      }
    } catch (error) {
      console.error('Mining error:', error);
      setLastMessage('Mining error occurred');
    }
  }, [playerId, onBlockMined]);

  const startMining = useCallback(() => {
    if (isMining) return;
    
    setIsMining(true);
    setLastMessage('Mining started...');
    
    // Start mining loop
    attemptMine(); // First attempt immediately
    intervalRef.current = window.setInterval(attemptMine, intervalMs);
  }, [isMining, attemptMine, intervalMs]);

  const stopMining = useCallback(() => {
    if (!isMining) return;
    
    setIsMining(false);
    setCurrentNonce(null);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [isMining]);
  
  // Assign stopMining to ref so it can be called from attemptMine
  stopMiningRef.current = stopMining;

  return {
    isMining,
    attempts,
    successes,
    lastMessage,
    lastMiningDetails,
    currentNonce,
    startMining,
    stopMining
  };
}
