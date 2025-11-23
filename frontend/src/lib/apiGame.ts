// Game API functions for BabyBTC

import { fetchApi } from './apiClient';
import {
  RegisterResponse,
  MineResponse,
  TransferResponse,
  GameStateSnapshot
} from './types';

export async function register(name?: string): Promise<RegisterResponse> {
  return fetchApi<RegisterResponse>('/api/register', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function mine(playerId: string, nonce: number): Promise<MineResponse> {
  return fetchApi<MineResponse>('/api/mine', {
    method: 'POST',
    body: JSON.stringify({ player_id: playerId, nonce }),
  });
}

export async function getState(playerId: string): Promise<GameStateSnapshot> {
  return fetchApi<GameStateSnapshot>(`/api/state/${playerId}`);
}

export async function transfer(
  fromPlayerId: string,
  toPlayerId: string,
  amount: number,
  signature?: string
): Promise<TransferResponse> {
  return fetchApi<TransferResponse>('/api/tx/transfer', {
    method: 'POST',
    body: JSON.stringify({
      from_player_id: fromPlayerId,
      to_player_id: toPlayerId,
      amount,
      signature
    }),
  });
}
