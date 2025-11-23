# AI tool interface routes for SpoonOS Agent

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
from ..state import chain_state
from ..events import format_event_for_ai

router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.get("/recent_events")
async def get_recent_events(limit: int = 20):
    """Get recent events formatted for AI consumption"""
    
    events = chain_state.get_recent_events(limit)
    formatted_events = [format_event_for_ai(event) for event in events]
    
    return {
        "events": formatted_events,
        "total_events": len(chain_state.events),
        "chain_height": chain_state.get_chain_height()
    }

@router.get("/player_stats/{player_id}")
async def get_player_stats_for_ai(player_id: str):
    """Get player statistics for AI analysis"""
    
    player = chain_state.get_player(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Calculate additional stats
    total_players = len(chain_state.players)
    player_rank_by_balance = sorted(
        chain_state.players.values(),
        key=lambda p: p.balance_baby,
        reverse=True
    ).index(player) + 1
    
    return {
        "player_id": player.id,
        "name": player.name,
        "address": player.address,
        "balance": player.balance_baby,
        "blocks_mined": player.stats.blocks_mined,
        "mining_attempts": player.stats.mining_attempts,
        "mining_success_rate": (
            player.stats.blocks_mined / player.stats.mining_attempts * 100
            if player.stats.mining_attempts > 0 else 0
        ),
        "rank_by_balance": player_rank_by_balance,
        "total_players": total_players,
        "last_active": player.stats.last_active_at.isoformat() if player.stats.last_active_at else None
    }

@router.get("/chain_summary")
async def get_chain_summary_for_ai():
    """Get blockchain summary for AI analysis"""
    
    # Calculate mining distribution
    mining_distribution = {}
    for block in chain_state.blocks[1:]:  # Skip genesis
        miner = chain_state.get_player(block.miner_id)
        miner_name = miner.name if miner else "Unknown"
        mining_distribution[miner_name] = mining_distribution.get(miner_name, 0) + 1
    
    # Calculate transaction volume
    total_tx_volume = 0
    total_tx_count = 0
    for block in chain_state.blocks:
        for tx in block.transactions:
            if tx.from_address:  # Not coinbase
                total_tx_volume += tx.amount
                total_tx_count += 1
    
    # Get top miners
    top_miners = sorted(
        [(name, count) for name, count in mining_distribution.items()],
        key=lambda x: x[1],
        reverse=True
    )[:5]
    
    # Get richest players
    richest_players = sorted(
        chain_state.players.values(),
        key=lambda p: p.balance_baby,
        reverse=True
    )[:5]
    
    return {
        "chain_height": chain_state.get_chain_height(),
        "total_players": len(chain_state.players),
        "current_difficulty": chain_state.current_difficulty,
        "pending_tx_count": len(chain_state.pending_transactions),
        "total_tx_count": total_tx_count,
        "total_tx_volume": total_tx_volume,
        "avg_tx_amount": total_tx_volume / total_tx_count if total_tx_count > 0 else 0,
        "top_miners": [
            {"name": name, "blocks_mined": count}
            for name, count in top_miners
        ],
        "richest_players": [
            {"name": p.name, "balance": p.balance_baby}
            for p in richest_players
        ],
        "total_money_supply": sum(p.balance_baby for p in chain_state.players.values())
    }

@router.post("/analyze_scenario")
async def analyze_scenario(scenario: str, context: Optional[Dict[str, Any]] = None):
    """Analyze a specific scenario for educational purposes"""
    
    # This is a placeholder for AI integration
    # In production, this would call SpoonOS or another AI service
    
    scenarios = {
        "double_spend": {
            "explanation": "A double-spend attack occurs when someone tries to spend the same tokens twice. In our Baby chain, this is prevented by the blockchain's sequential block structure.",
            "risk_level": "high",
            "prevention": "Each transaction is validated and included in a block. Once mined, it cannot be reversed without rolling back the entire chain."
        },
        "51_attack": {
            "explanation": "A 51% attack happens when one entity controls more than half of the mining power. They could potentially rewrite history by mining a longer alternative chain.",
            "risk_level": "critical",
            "prevention": "In real blockchains, this is prevented by having many distributed miners. Our toy chain is vulnerable since we have few participants."
        },
        "mining_strategy": {
            "explanation": "Optimal mining strategy involves finding the right balance between nonce attempts and computational resources.",
            "risk_level": "low",
            "prevention": "Not a risk, but understanding mining economics helps optimize rewards."
        }
    }
    
    scenario_info = scenarios.get(scenario, {
        "explanation": "This scenario is not yet documented in our educational system.",
        "risk_level": "unknown",
        "prevention": "Please consult with the instructor for more information."
    })
    
    return {
        "scenario": scenario,
        "analysis": scenario_info,
        "context": context,
        "chain_state": {
            "height": chain_state.get_chain_height(),
            "difficulty": chain_state.current_difficulty
        }
    }
