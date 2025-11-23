// Type definitions for BabyBTC frontend

export interface LocalProfile {
  playerId: string;
  address: string;
  mnemonic: string;
  createdAt: string;
}

export interface PlayerStats {
  blocks_mined: number;
  mining_attempts: number;
  last_active_at: string | null;
}

export interface PlayerState {
  id: string;
  name?: string;
  address: string;
  balance_baby: number;
  stats: PlayerStats;
}

export interface BlockSummary {
  index: number;
  miner_name?: string;
  miner_id: string;
  timestamp: string;
  tx_count: number;
  reward: number;
}

export interface GameStateSnapshot {
  chain_height: number;
  current_difficulty: number;
  recent_blocks: BlockSummary[];
  player: PlayerState | null;
}

export interface RegisterResponse {
  player_id: string;
  address: string;
  mnemonic: string;
  state: GameStateSnapshot;
}

export interface MiningDetails {
  formula: string;
  block_header?: string;
  components?: {
    index: number;
    prev_hash: string;
    merkle_root: string;
    timestamp: string;
    nonce: number;
  };
  hash_value: number;
  difficulty: number;
  equation: string;
  solved: boolean;
}

export interface MineResponse {
  success: boolean;
  block_index?: number;
  reward?: number;
  message?: string;
  details?: MiningDetails;
}

export interface TransferResponse {
  tx_id: string;
  from_address: string;
  to_address: string;
  amount: number;
  status: string;
}

export interface EventSummary {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  data: Record<string, any>;
}

export interface AiMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface AiAnswerResponse {
  answer: string;
  related_events?: EventSummary[];
}
