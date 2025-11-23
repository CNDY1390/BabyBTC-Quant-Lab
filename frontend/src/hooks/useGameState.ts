// Game state polling hook

import { useState, useEffect, useRef } from 'react';
import { GameStateSnapshot } from '../lib/types';
import { getState } from '../lib/apiGame';

interface UseGameStateOptions {
  playerId: string;
  intervalMs?: number;
  enabled?: boolean;
}

interface UseGameStateResult {
  gameState: GameStateSnapshot | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useGameState({
  playerId,
  intervalMs = 3000,
  enabled = true
}: UseGameStateOptions): UseGameStateResult {
  const [gameState, setGameState] = useState<GameStateSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const fetchGameState = async () => {
    try {
      const state = await getState(playerId);
      setGameState(state);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch game state');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchGameState();

    // Set up polling
    intervalRef.current = setInterval(fetchGameState, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playerId, intervalMs, enabled]);

  return {
    gameState,
    loading,
    error,
    refresh: fetchGameState
  };
}
