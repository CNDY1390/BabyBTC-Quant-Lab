# Pydantic models for BabyBTC

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Literal, Dict, Any
from enum import Enum

# Player models
class PlayerStats(BaseModel):
    blocks_mined: int = 0
    mining_attempts: int = 0
    last_active_at: Optional[datetime] = None

class Player(BaseModel):
    id: str
    name: Optional[str] = None
    address: str
    public_key: str
    balance_baby: float = 0.0
    stats: PlayerStats = Field(default_factory=PlayerStats)

# Transaction model
class Transaction(BaseModel):
    id: str
    from_address: Optional[str] = None  # None for coinbase transactions
    to_address: Optional[str] = None
    amount: float
    signature: str = ""
    memo: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.now)

# Block model
class Block(BaseModel):
    index: int
    timestamp: datetime
    prev_hash: str
    nonce: int
    miner_id: str
    transactions: List[Transaction]
    hash_value: int
    difficulty: int

# Event types
class EventType(str, Enum):
    BLOCK_MINED = "block_mined"
    TX_CREATED = "tx_created"
    ATTACK_MUTATION = "attack_mutation"
    CHAIN_SNAPSHOT_PRINTED = "chain_snapshot_printed"

# Event model
class Event(BaseModel):
    id: str
    timestamp: datetime = Field(default_factory=datetime.now)
    type: EventType
    player_id: Optional[str] = None
    data: Dict[str, Any] = {}

# API request/response models
class RegisterRequest(BaseModel):
    name: Optional[str] = None

class RegisterResponse(BaseModel):
    player_id: str
    address: str
    mnemonic: str
    state: Dict[str, Any]  # GameStateSnapshot

class MineRequest(BaseModel):
    player_id: str
    nonce: int

class MineResponse(BaseModel):
    success: bool
    block_index: Optional[int] = None
    reward: int = 0
    message: str = ""
    details: Optional[dict] = None  # Mining calculation details

class TransferRequest(BaseModel):
    from_player_id: str
    to_player_id: str
    amount: float
    signature: Optional[str] = None  # Optional for now, can be required later

class TransferResponse(BaseModel):
    tx_id: str
    from_address: str
    to_address: str
    amount: float
    status: str = "pending"

class GameStateSnapshot(BaseModel):
    chain_height: int
    current_difficulty: int
    recent_blocks: List[Dict[str, Any]]
    player: Optional[Dict[str, Any]] = None
