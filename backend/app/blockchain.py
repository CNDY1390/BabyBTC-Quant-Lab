# Blockchain logic for BabyBTC

import hashlib
import hmac
import random
import uuid
from datetime import datetime
from typing import Optional, List, Tuple
from .models import Block, Transaction, Player
from .config import (
    INITIAL_DIFFICULTY,
    REWARD_PER_BLOCK,
    HASH_MODULO,
    MAX_NONCE,
    MNEMONIC_WORDS,
    INITIAL_BALANCE
)

def calculate_merkle_root(transactions: List[Transaction]) -> str:
    """Calculate merkle root of transactions (simplified)"""
    if not transactions:
        return "0" * 64
    
    # Simplified: just hash all transaction IDs together
    tx_data = "".join([tx.id for tx in transactions])
    return hashlib.sha256(tx_data.encode()).hexdigest()

def toy_hash(index: int, prev_hash: str, merkle_root: str, timestamp: str, nonce: int) -> int:
    """
    Educational hash function that mimics real blockchain header hashing.
    Uses MD5 for speed but follows real blockchain structure.
    """
    # Create a block header similar to real blockchain
    block_header = f"{index}:{prev_hash[:8]}:{merkle_root[:8]}:{timestamp}:{nonce}"
    
    # Use MD5 for speed (real Bitcoin uses double SHA256)
    hash_bytes = hashlib.md5(block_header.encode()).digest()
    
    # Convert first 4 bytes to integer for comparison with difficulty
    hash_int = int.from_bytes(hash_bytes[:4], 'big')
    
    # Normalize to our difficulty range (0-1,000,000)
    return hash_int % HASH_MODULO

def generate_mnemonic() -> str:
    """Generate a 12-word mnemonic phrase"""
    words = random.sample(MNEMONIC_WORDS, 12)
    return " ".join(words)

def mnemonic_to_private_key(mnemonic: str) -> str:
    """Derive a private key from mnemonic (simplified for demo)"""
    # In production, use BIP39/BIP32 derivation
    # This is a simplified educational version
    return hashlib.sha256(mnemonic.encode()).hexdigest()

def private_key_to_public_key(private_key: str) -> str:
    """Derive public key from private key (simplified)"""
    # In production, use elliptic curve cryptography
    # This is a simplified educational version
    return hashlib.sha256(private_key.encode()).hexdigest()

def public_key_to_address(public_key: str) -> str:
    """Generate address from public key"""
    # Use last 16 characters of public key for simplicity
    return f"BABY{public_key[-16:].upper()}"

def sign_message(private_key: str, message: str) -> str:
    """Sign a message with private key (simplified HMAC)"""
    # In production, use proper digital signatures
    # This is a simplified educational version
    return hmac.new(
        private_key.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

def verify_signature(public_key: str, message: str, signature: str) -> bool:
    """Verify signature with public key (simplified)"""
    # This is a simplified version for educational purposes
    # We'll use the public key as a proxy to verify
    # In a real system, we'd use proper signature verification
    
    # For demo purposes, we'll recreate the signature using public key
    # and check if it matches (this is NOT secure, only for education)
    expected_signature = hmac.new(
        public_key.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()
    
    # For now, always return True for demo simplicity
    # In a real implementation, this would verify against the actual signature
    return True  # Simplified for hackathon

def create_player_credentials() -> Tuple[str, str, str, str]:
    """Create a new player's cryptographic credentials"""
    mnemonic = generate_mnemonic()
    private_key = mnemonic_to_private_key(mnemonic)
    public_key = private_key_to_public_key(private_key)
    address = public_key_to_address(public_key)
    return mnemonic, private_key, public_key, address

def attempt_mining(
    index: int,
    prev_hash: str,
    nonce: int,
    pending_transactions: List[Transaction],
    difficulty: int,
    miner_id: str
) -> Optional[Block]:
    """Attempt to mine a block with given nonce"""
    
    # Calculate merkle root from transactions
    merkle_root = calculate_merkle_root(pending_transactions)
    timestamp = datetime.now().isoformat()
    
    # Calculate hash with block header components
    hash_value = toy_hash(index, prev_hash, merkle_root, timestamp, nonce)
    
    # Check if hash meets difficulty requirement
    if hash_value < difficulty:
        # Success! Create the new block
        new_block = Block(
            index=index,
            timestamp=datetime.now(),
            prev_hash=prev_hash,
            nonce=nonce,
            miner_id=miner_id,
            transactions=pending_transactions,
            hash_value=hash_value,
            difficulty=difficulty
        )
        return new_block
    
    return None

def validate_transaction(tx: Transaction, from_player: Player) -> bool:
    """Validate a transaction"""
    # Check if sender has enough balance
    if from_player.balance_baby < tx.amount:
        return False
    
    # Check if amount is positive
    if tx.amount <= 0:
        return False
    
    # Verify signature (simplified for hackathon)
    # In production, properly verify the signature
    # For now, just check that a signature exists
    if not tx.signature:
        return False
    
    return True

def create_coinbase_transaction(miner_address: str, reward: float) -> Transaction:
    """Create a coinbase transaction for block reward"""
    return Transaction(
        id=str(uuid.uuid4()),
        from_address=None,  # Coinbase has no sender
        to_address=miner_address,
        amount=reward,
        signature="coinbase",  # Special signature for coinbase
        memo="Block mining reward",
        timestamp=datetime.now()
    )
