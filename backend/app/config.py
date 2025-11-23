# Configuration for BabyBTC blockchain

# Chain parameters
INITIAL_DIFFICULTY = 400_000  # Initial mining difficulty threshold (40% success rate with MD5)
REWARD_PER_BLOCK = 10.0  # BABY tokens reward per block mined
INITIAL_BALANCE = 100.0  # Initial balance for new players

# Hash parameters  
HASH_MODULO = 1_000_000  # Normalize hash to 0-999,999 range
MAX_NONCE = 9999  # Limit nonce to 4 digits for reasonable mining time

# API settings
API_PREFIX = "/api"
CORS_ORIGINS = ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"]

# Mnemonic word list (simplified for demo)
MNEMONIC_WORDS = [
    "apple", "brave", "candy", "dream", "eagle", "fiber", "giant", "happy",
    "island", "jungle", "kitten", "lemon", "mango", "noble", "ocean", "piano",
    "queen", "river", "sunset", "tiger", "umbrella", "valley", "window", "yellow",
    "zebra", "anchor", "bridge", "castle", "diamond", "engine", "forest", "garden",
    "harbor", "igloo", "jacket", "kernel", "ladder", "marble", "needle", "office",
    "palace", "quartz", "rocket", "shadow", "temple", "unique", "violin", "wallet",
    "xenon", "yacht", "zodiac", "bronze", "copper", "delta", "emerald", "flame",
    "globe", "horizon", "impact", "journal", "knight", "legacy", "mirror", "nexus"
]
