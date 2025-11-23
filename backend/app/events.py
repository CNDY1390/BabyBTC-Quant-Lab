# Event logging system for BabyBTC

import uuid
from datetime import datetime
from typing import Dict, Any, Optional
from .models import Event, EventType, Block, Transaction, Player

def create_event(
    event_type: EventType,
    player_id: Optional[str] = None,
    data: Optional[Dict[str, Any]] = None
) -> Event:
    """Create a new event"""
    return Event(
        id=str(uuid.uuid4()),
        timestamp=datetime.now(),
        type=event_type,
        player_id=player_id,
        data=data or {}
    )

def log_block_mined(block: Block, miner: Player, reward: float) -> Event:
    """Log a block mining event"""
    return create_event(
        event_type=EventType.BLOCK_MINED,
        player_id=miner.id,
        data={
            "block_index": block.index,
            "block_hash": block.hash_value,
            "miner_name": miner.name or f"Player {miner.id[:8]}",
            "miner_address": miner.address,
            "reward": reward,
            "difficulty": block.difficulty,
            "nonce": block.nonce,
            "tx_count": len(block.transactions)
        }
    )

def log_transaction_created(tx: Transaction, from_player: Optional[Player], to_player: Optional[Player]) -> Event:
    """Log a transaction creation event"""
    return create_event(
        event_type=EventType.TX_CREATED,
        player_id=from_player.id if from_player else None,
        data={
            "tx_id": tx.id,
            "from_address": tx.from_address,
            "from_name": from_player.name if from_player else "System",
            "to_address": tx.to_address,
            "to_name": to_player.name if to_player else "Unknown",
            "amount": tx.amount,
            "memo": tx.memo
        }
    )

def log_attack_mutation(attack_type: str, target_id: str, details: Dict[str, Any]) -> Event:
    """Log an attack/mutation event (for future extension)"""
    return create_event(
        event_type=EventType.ATTACK_MUTATION,
        data={
            "attack_type": attack_type,
            "target_id": target_id,
            "details": details
        }
    )

def log_chain_snapshot() -> Event:
    """Log a chain snapshot event"""
    return create_event(
        event_type=EventType.CHAIN_SNAPSHOT_PRINTED,
        data={
            "timestamp": datetime.now().isoformat(),
            "purpose": "debug"
        }
    )

def format_event_for_ai(event: Event) -> Dict[str, Any]:
    """Format an event for AI consumption"""
    formatted = {
        "id": event.id,
        "timestamp": event.timestamp.isoformat(),
        "type": event.type.value,
        "player_id": event.player_id
    }
    
    # Add human-readable description
    if event.type == EventType.BLOCK_MINED:
        formatted["description"] = (
            f"{event.data.get('miner_name', 'Unknown')} mined block #{event.data.get('block_index', 0)} "
            f"and earned {event.data.get('reward', 0)} BABY tokens"
        )
    elif event.type == EventType.TX_CREATED:
        formatted["description"] = (
            f"{event.data.get('from_name', 'Unknown')} sent {event.data.get('amount', 0)} BABY to "
            f"{event.data.get('to_name', 'Unknown')}"
        )
    elif event.type == EventType.ATTACK_MUTATION:
        formatted["description"] = (
            f"Attack simulation: {event.data.get('attack_type', 'Unknown')} on "
            f"{event.data.get('target_id', 'Unknown')}"
        )
    else:
        formatted["description"] = "System event"
    
    formatted["data"] = event.data
    return formatted
