# Global in-memory state management for BabyBTC

from typing import Dict, List, Optional
from datetime import datetime
from .models import Player, Block, Transaction, Event
from .config import INITIAL_DIFFICULTY, INITIAL_BALANCE
import threading

class ChainState:
    """Global state container for the BabyBTC blockchain"""
    
    def __init__(self):
        self.lock = threading.Lock()  # Thread safety for concurrent requests
        self.reset()
    
    def reset(self):
        """Reset the entire chain state"""
        with self.lock:
            # Genesis block
            genesis_block = Block(
                index=0,
                timestamp=datetime.now(),
                prev_hash="0",
                nonce=0,
                miner_id="system",
                transactions=[],
                hash_value=0,
                difficulty=INITIAL_DIFFICULTY
            )
            
            self.blocks: List[Block] = [genesis_block]
            self.pending_transactions: List[Transaction] = []
            self.players: Dict[str, Player] = {}
            self.current_difficulty: int = INITIAL_DIFFICULTY
            self.reward_per_block: float = 10.0
            self.events: List[Event] = []
            
            # Track addresses to player IDs for lookup
            self.address_to_player_id: Dict[str, str] = {}
    
    def add_player(self, player: Player) -> None:
        """Add a new player to the state"""
        with self.lock:
            self.players[player.id] = player
            self.address_to_player_id[player.address] = player.id
    
    def get_player(self, player_id: str) -> Optional[Player]:
        """Get a player by ID"""
        return self.players.get(player_id)
    
    def get_player_by_address(self, address: str) -> Optional[Player]:
        """Get a player by address"""
        player_id = self.address_to_player_id.get(address)
        if player_id:
            return self.players.get(player_id)
        return None
    
    def add_block(self, block: Block) -> None:
        """Add a new block to the chain"""
        with self.lock:
            self.blocks.append(block)
            # Clear pending transactions that were included in the block
            tx_ids = {tx.id for tx in block.transactions}
            self.pending_transactions = [
                tx for tx in self.pending_transactions 
                if tx.id not in tx_ids
            ]
    
    def add_pending_transaction(self, tx: Transaction) -> None:
        """Add a transaction to the pending pool"""
        with self.lock:
            self.pending_transactions.append(tx)
    
    def get_recent_blocks(self, limit: int = 10) -> List[Block]:
        """Get the most recent blocks"""
        with self.lock:
            return list(reversed(self.blocks[-limit:]))
    
    def get_chain_height(self) -> int:
        """Get the current blockchain height"""
        return len(self.blocks)
    
    def get_latest_block(self) -> Block:
        """Get the latest block"""
        return self.blocks[-1] if self.blocks else None
    
    def update_player_balance(self, player_id: str, amount: float) -> None:
        """Update a player's balance"""
        with self.lock:
            if player_id in self.players:
                self.players[player_id].balance_baby += amount
    
    def add_event(self, event: Event) -> None:
        """Add an event to the log"""
        with self.lock:
            self.events.append(event)
    
    def get_recent_events(self, limit: int = 20) -> List[Event]:
        """Get recent events"""
        with self.lock:
            return list(reversed(self.events[-limit:]))
    
    def get_game_state_snapshot(self, player_id: Optional[str] = None) -> dict:
        """Get a snapshot of the current game state"""
        recent_blocks = []
        for block in self.get_recent_blocks(5):
            miner = self.get_player(block.miner_id)
            recent_blocks.append({
                "index": block.index,
                "miner_name": miner.name if miner else "Unknown",
                "miner_id": block.miner_id,
                "timestamp": block.timestamp.isoformat(),
                "tx_count": len(block.transactions),
                "reward": self.reward_per_block
            })
        
        player_data = None
        if player_id and player_id in self.players:
            player = self.players[player_id]
            player_data = {
                "id": player.id,
                "name": player.name,
                "address": player.address,
                "balance_baby": player.balance_baby,
                "stats": {
                    "blocks_mined": player.stats.blocks_mined,
                    "mining_attempts": player.stats.mining_attempts,
                    "last_active_at": player.stats.last_active_at.isoformat() if player.stats.last_active_at else None
                }
            }
        
        return {
            "chain_height": self.get_chain_height(),
            "current_difficulty": self.current_difficulty,
            "recent_blocks": recent_blocks,
            "player": player_data
        }

# Global state instance
chain_state = ChainState()
