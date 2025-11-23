# Admin API routes for BabyBTC (placeholder for future attack simulations)

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from ..state import chain_state
from ..events import log_attack_mutation, log_chain_snapshot

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/chain_snapshot")
async def get_chain_snapshot():
    """Get complete snapshot of the blockchain state"""
    
    # Log snapshot event
    event = log_chain_snapshot()
    chain_state.add_event(event)
    
    # Prepare chain data
    blocks_data = []
    for block in chain_state.blocks:
        blocks_data.append({
            "index": block.index,
            "timestamp": block.timestamp.isoformat(),
            "prev_hash": block.prev_hash,
            "hash_value": block.hash_value,
            "nonce": block.nonce,
            "miner_id": block.miner_id,
            "difficulty": block.difficulty,
            "transactions": [
                {
                    "id": tx.id,
                    "from": tx.from_address,
                    "to": tx.to_address,
                    "amount": tx.amount,
                    "memo": tx.memo
                }
                for tx in block.transactions
            ]
        })
    
    # Prepare players data
    players_data = {}
    for player_id, player in chain_state.players.items():
        players_data[player_id] = {
            "id": player.id,
            "name": player.name,
            "address": player.address,
            "balance": player.balance_baby,
            "blocks_mined": player.stats.blocks_mined,
            "mining_attempts": player.stats.mining_attempts
        }
    
    # Prepare pending transactions
    pending_txs = [
        {
            "id": tx.id,
            "from": tx.from_address,
            "to": tx.to_address,
            "amount": tx.amount
        }
        for tx in chain_state.pending_transactions
    ]
    
    return {
        "chain_height": chain_state.get_chain_height(),
        "current_difficulty": chain_state.current_difficulty,
        "reward_per_block": chain_state.reward_per_block,
        "blocks": blocks_data,
        "players": players_data,
        "pending_transactions": pending_txs,
        "total_events": len(chain_state.events)
    }

@router.post("/attack/mutate_player")
async def mutate_player_balance(player_id: str, new_balance: float):
    """[DEMO ONLY] Mutate a player's balance for attack simulation"""
    
    player = chain_state.get_player(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    old_balance = player.balance_baby
    player.balance_baby = new_balance
    
    # Log attack event
    event = log_attack_mutation(
        attack_type="balance_mutation",
        target_id=player_id,
        details={
            "old_balance": old_balance,
            "new_balance": new_balance,
            "player_name": player.name
        }
    )
    chain_state.add_event(event)
    
    return {
        "success": True,
        "player_id": player_id,
        "old_balance": old_balance,
        "new_balance": new_balance
    }

@router.post("/attack/rollback")
async def rollback_blocks(blocks_to_remove: int = 1):
    """[DEMO ONLY] Rollback the last N blocks for attack simulation"""
    
    if blocks_to_remove <= 0:
        raise HTTPException(status_code=400, detail="Must rollback at least 1 block")
    
    if blocks_to_remove >= len(chain_state.blocks):
        raise HTTPException(status_code=400, detail="Cannot rollback genesis block")
    
    # Store info about removed blocks
    removed_blocks = []
    for i in range(blocks_to_remove):
        if len(chain_state.blocks) > 1:  # Keep genesis
            removed_block = chain_state.blocks.pop()
            removed_blocks.append({
                "index": removed_block.index,
                "miner_id": removed_block.miner_id
            })
    
    # Log attack event
    event = log_attack_mutation(
        attack_type="chain_rollback",
        target_id="blockchain",
        details={
            "blocks_removed": blocks_to_remove,
            "removed_blocks": removed_blocks
        }
    )
    chain_state.add_event(event)
    
    return {
        "success": True,
        "blocks_removed": blocks_to_remove,
        "new_chain_height": chain_state.get_chain_height()
    }
