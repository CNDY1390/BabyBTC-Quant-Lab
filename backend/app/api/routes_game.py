# Game-related API routes for BabyBTC

from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid
from typing import Optional

from ..models import (
    RegisterRequest, RegisterResponse,
    MineRequest, MineResponse,
    TransferRequest, TransferResponse,
    Player, PlayerStats, Transaction,
    GameStateSnapshot
)
from ..state import chain_state
from ..blockchain import (
    create_player_credentials,
    attempt_mining,
    validate_transaction,
    create_coinbase_transaction,
    sign_message
)
from ..events import log_block_mined, log_transaction_created
from ..config import INITIAL_BALANCE

router = APIRouter(prefix="/api", tags=["game"])

@router.post("/register", response_model=RegisterResponse)
async def register_player(request: RegisterRequest):
    """Register a new player and return credentials"""
    
    # Generate unique player ID
    player_id = str(uuid.uuid4())[:8]  # Short ID for demo
    
    # Generate cryptographic credentials
    mnemonic, private_key, public_key, address = create_player_credentials()
    
    # Create player name if not provided
    player_name = request.name or f"miner-{player_id[:4]}"
    
    # Create new player
    player = Player(
        id=player_id,
        name=player_name,
        address=address,
        public_key=public_key,
        balance_baby=INITIAL_BALANCE,
        stats=PlayerStats()
    )
    
    # Add player to state
    chain_state.add_player(player)
    
    # Get initial game state
    game_state = chain_state.get_game_state_snapshot(player_id)
    
    return RegisterResponse(
        player_id=player_id,
        address=address,
        mnemonic=mnemonic,  # Only returned once!
        state=game_state
    )

@router.post("/mine", response_model=MineResponse)
async def mine_block(request: MineRequest):
    """Attempt to mine a new block"""
    
    # Validate nonce range
    from ..config import MAX_NONCE
    if request.nonce < 0 or request.nonce > MAX_NONCE:
        raise HTTPException(status_code=400, detail=f"Nonce must be between 0 and {MAX_NONCE}")
    
    # Get player
    player = chain_state.get_player(request.player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Update mining attempts
    player.stats.mining_attempts += 1
    player.stats.last_active_at = datetime.now()
    
    # Get current chain state
    latest_block = chain_state.get_latest_block()
    next_index = latest_block.index + 1
    prev_hash = str(latest_block.hash_value)
    
    # Get pending transactions (copy them)
    pending_txs = list(chain_state.pending_transactions)
    
    # Add coinbase transaction for miner reward
    coinbase_tx = create_coinbase_transaction(
        player.address,
        chain_state.reward_per_block
    )
    pending_txs.insert(0, coinbase_tx)  # Coinbase is always first
    
    # Calculate the hash for visualization
    from ..blockchain import toy_hash, calculate_merkle_root
    merkle_root = calculate_merkle_root(pending_txs)
    timestamp = datetime.now().isoformat()
    
    # Calculate toy hash for this attempt
    hash_value = toy_hash(next_index, prev_hash, merkle_root, timestamp, request.nonce)
    
    # Attempt mining with the provided nonce
    new_block = attempt_mining(
        index=next_index,
        prev_hash=prev_hash,
        nonce=request.nonce,
        pending_transactions=pending_txs,
        difficulty=chain_state.current_difficulty,
        miner_id=request.player_id
    )
    
    if new_block:
        # Success! Add block to chain
        chain_state.add_block(new_block)
        
        # Update miner's balance and stats
        chain_state.update_player_balance(request.player_id, chain_state.reward_per_block)
        player.stats.blocks_mined += 1
        
        # Process all transactions in the block
        for tx in new_block.transactions:
            if tx.from_address and tx.to_address:  # Regular transaction
                # Deduct from sender
                from_player = chain_state.get_player_by_address(tx.from_address)
                if from_player:
                    chain_state.update_player_balance(from_player.id, -tx.amount)
                
                # Add to receiver
                to_player = chain_state.get_player_by_address(tx.to_address)
                if to_player:
                    chain_state.update_player_balance(to_player.id, tx.amount)
        
        # Log event
        event = log_block_mined(new_block, player, chain_state.reward_per_block)
        chain_state.add_event(event)
        
        # Get updated balance
        updated_player = chain_state.get_player(request.player_id)
        
        return MineResponse(
            success=True,
            block_index=new_block.index,
            reward=chain_state.reward_per_block,
            message=f"Block #{new_block.index} mined successfully! Earned {chain_state.reward_per_block} BABY tokens.",
            details={
                "formula": f"MD5(BlockHeader) % 1000000",
                "block_header": f"{next_index}:{prev_hash[:8]}:{merkle_root[:8]}:{timestamp[:10]}:{request.nonce}",
                "components": {
                    "index": next_index,
                    "prev_hash": prev_hash[:8] + "...",
                    "merkle_root": merkle_root[:8] + "...",
                    "timestamp": timestamp[:19],
                    "nonce": request.nonce
                },
                "hash_value": hash_value,
                "difficulty": chain_state.current_difficulty,
                "equation": f"{hash_value} < {chain_state.current_difficulty}",
                "solved": True
            }
        )
    else:
        # Mining attempt failed
        return MineResponse(
            success=False,
            message="Mining attempt failed. Try again with a different nonce.",
            details={
                "formula": f"MD5(BlockHeader) % 1000000",
                "block_header": f"{next_index}:{prev_hash[:8]}:{merkle_root[:8]}:{timestamp[:10]}:{request.nonce}",
                "components": {
                    "index": next_index,
                    "prev_hash": prev_hash[:8] + "...",
                    "merkle_root": merkle_root[:8] + "...",
                    "timestamp": timestamp[:19],
                    "nonce": request.nonce
                },
                "hash_value": hash_value,
                "difficulty": chain_state.current_difficulty,
                "equation": f"{hash_value} < {chain_state.current_difficulty}",
                "solved": False
            }
        )

@router.post("/tx/transfer", response_model=TransferResponse)
async def transfer_tokens(request: TransferRequest):
    """Transfer BABY tokens between players"""
    
    # Get sender and receiver
    from_player = chain_state.get_player(request.from_player_id)
    if not from_player:
        raise HTTPException(status_code=404, detail="Sender not found")
    
    to_player = chain_state.get_player(request.to_player_id)
    if not to_player:
        raise HTTPException(status_code=404, detail="Receiver not found")
    
    # Check balance
    if from_player.balance_baby < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    if request.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    
    # Create transaction
    tx = Transaction(
        id=str(uuid.uuid4()),
        from_address=from_player.address,
        to_address=to_player.address,
        amount=request.amount,
        signature=request.signature or "demo_signature",  # Simplified for hackathon
        memo=f"Transfer from {from_player.name} to {to_player.name}",
        timestamp=datetime.now()
    )
    
    # Validate transaction
    if not validate_transaction(tx, from_player):
        raise HTTPException(status_code=400, detail="Invalid transaction")
    
    # Add to pending transactions
    chain_state.add_pending_transaction(tx)
    
    # Log event
    event = log_transaction_created(tx, from_player, to_player)
    chain_state.add_event(event)
    
    return TransferResponse(
        tx_id=tx.id,
        from_address=tx.from_address,
        to_address=tx.to_address,
        amount=tx.amount,
        status="pending"
    )

@router.get("/state/{player_id}")
async def get_player_state(player_id: str):
    """Get current game state for a player"""
    
    player = chain_state.get_player(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    return chain_state.get_game_state_snapshot(player_id)
