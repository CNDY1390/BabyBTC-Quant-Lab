
# BabyBTC Quant Lab

Educational Baby PoW chain + AI coach for the **Scoop AI Hackathon**  
Track: **Autonomous Finance & Quant AI**

> ⚠️ This is a toy blockchain for learning.  
> It is **not** a real cryptocurrency and must **never** be used for real money.

---

## Project Overview

BabyBTC is a simplified, educational blockchain implementation designed to teach
blockchain concepts through hands-on interaction.

- It runs locally / in a LAN.
- All assets are **virtual demo tokens**.
- It is deliberately insecure and simplified.
- It should **never** be used for real transactions or investment decisions.

The goal is to make concepts like **Proof-of-Work, blocks, transactions, and basic
attack scenarios** concrete for non-experts, while an **AI coach (powered by SpoonOS / spoon_ai)**
explains what is happening on the chain.

---

## Key Features

- 🧱 **Simplified Proof-of-Work mining mechanism**
- 👥 **Token transfers between players**
- 📊 **Real-time blockchain visualization**
- 🤖 **AI coach for explaining blockchain concepts**
- 🧪 **Attack simulation hooks (for educational purposes, optional in this version)**

---

## Core Concepts (核心概念)

### What is Proof-of-Work (PoW)?

工作量证明是一种共识机制，要求矿工解决计算难题来创建新区块：

1. **The Puzzle**  
   Find a nonce that makes `hash(block_header + nonce) < difficulty`.

2. **Why It Works**
   - Easy to verify (one hash calculation).
   - Hard to solve (must try many nonces).
   - Cannot cheat (hash functions are one-way & unpredictable).

3. **In BabyBTC**  
   We use a **MD5-based toy hash** with a **4-digit nonce** and a simple threshold
   for educational simplicity. It behaves like a tiny, fast, but insecure PoW chain.

---

## Mining Mechanism (详细挖矿流程)

### How Mining Works

#### 1. Mining Process Flow

```text
Player clicks "Start Mining"
    ↓
Frontend generates random nonce (0-9999)
    ↓
Sends to backend: { player_id, nonce }
    ↓
Backend builds block header:
    header = "index:prev_hash:merkle_root:timestamp:nonce"
    hash = MD5(header) % 1,000,000
    ↓
Check if hash < difficulty (e.g. 400,000)
    ↓
Success: Create new block → Reward miner
Failure: Try again with new nonce
````

#### 2. The Actual Mining Equation (simplified)

```python
# The actual mining equation in our system (improved version):
def mine_block(block_header_components):
    # Block header like real blockchain
    header = f"{index}:{prev_hash}:{merkle_root}:{timestamp}:{nonce}"
    hash_bytes = MD5(header)
    hash_int = int(first_4_bytes) % 1,000,000
    
    if hash_int < 400,000:  # 40% chance
        return "Success! Block mined!"
    else:
        return "Try again with different nonce"
```

* **Nonce range**: `0–9999`
* **Hash space**: we project MD5 to a 6-digit integer (`0–999,999`)
* **Difficulty**: e.g. `400,000` → ~40% success probability per attempt

#### 3. Why Mining Still Feels “Hard”

* **Randomness**: MD5 output is effectively random for our purposes.
* **Brute Force Only**: You must try different nonces until you get lucky.
* **No Shortcuts**: There is no way to predict the “correct” nonce.
* **Adjustable Difficulty**: Lower threshold ⇒ harder mining; higher ⇒ easier.

---

## Mining Visualization

前端会把挖矿过程可视化，帮助用户理解这是“真算出来的”而不是随便 RNG：

```text
Block Header Components:
- Index: 1
- Prev Hash: abc123ef...
- Merkle Root: def456ab...
- Timestamp: 2025-11-23T23:16:00
- Nonce: 5678

Hash Calculation:
  MD5("1:abc123ef:def456ab:2025-11-23T23:16:00:5678") % 1_000_000
Result:
  234567 < 400000  →  ✓  (Success!)
```

每次尝试都会展示：

* 区块头各个组成部分；
* 当前 nonce；
* 计算出来的 hash 数值；
* 是否通过 `hash < difficulty` 的检查。

---

## Real Development Challenges (实际开发难点)

### 1. Balancing Realism vs Usability

* Real Bitcoin uses SHA256, huge nonce space, ~10 minutes per block.
* For a hackathon demo that runs on phones, this is impossible.

**Our approach:**

* Use **MD5** instead of SHA256 → much faster.
* Use **4-digit nonce** (10,000 possibilities).
* Set success probability around **40%** so a block appears in a few seconds.
* Still keep the **real block header structure**: `prev_hash`, `merkle_root`, `timestamp`, `nonce`.

结果：既保留了真实链的结构，又保持了“5–10 秒内能挖出块”的体验。

### 2. Concurrent Mining

* Multiple players mining at the same time can cause race conditions.
* Backend uses **thread-safe operations / locks** when appending blocks and clearing
  the pending transaction pool.

### 3. Frontend–Backend Synchronization

* We deliberately avoid WebSockets for simplicity.
* Frontend polls `/api/state/{player_id}` every few seconds.
* Local mining animation is driven by real backend responses.

### 4. Making Mining “Feel Real”

* Users often suspect “this是不是纯随机？”。
* We address that by:

  * Showing the **exact block header** and hash calculation;
  * Displaying failed attempts with their hash values;
  * Visualizing the inequality check `hash < difficulty`;
  * Using a real hash function (MD5) instead of a toy formula.

### 5. Educational vs Secure

* This project chooses **education over security**:

  * Mnemonic stored in `localStorage` (bad in production!).
  * MD5 hash (cryptographically broken!).
  * Simplified signatures (not real ECDSA).
* All of this is acceptable here because:
  **we never touch real assets**, only classroom tokens.

---

## Repository Structure

```text
BabyBTC-Quant-Lab/
├── backend/          # Python FastAPI backend
│   ├── app/
│   │   ├── api/     # API routes
│   │   ├── models.py
│   │   ├── state.py
│   │   ├── blockchain.py
│   │   └── main.py
│   └── requirements.txt
├── frontend/        # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

Backend and frontend can run independently for local demos.
The `agent_service` talks to **SpoonOS / spoon_ai** and exposes a simple HTTP API
that the frontend uses for the AI coach.

---

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a Python virtual environment (recommended):

```bash
python -m venv venv
```

3. Activate the virtual environment:

* Windows:

  ```bash
  venv\Scripts\activate
  ```

* macOS / Linux:

  ```bash
  source venv/bin/activate
  ```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Run the backend server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`.

---

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install   # or npm/yarn if you prefer
```

3. Run the development server:

```bash
pnpm dev
```

Frontend will be available at `http://localhost:5173`.

> Make sure the backend is running first, otherwise the UI cannot load chain state.

---

### Agent Service (SpoonOS) Setup

1. Navigate to the agent service directory:

```bash
cd agent_service
```

2. Create and activate a virtual environment, then install requirements:

```bash
python -m venv venv
source venv/bin/activate      # or Windows equivalent
pip install -r requirements.txt
```

3. Set your LLM keys (e.g. OpenAI, etc.) required by SpoonOS / spoon_ai.

4. Run the agent service:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8100
```

The agent service exposes endpoints like `POST /agent/ask` and internally
uses a SpoonOS agent with tools that read BabyBTC chain events.

---

## Quick Start

1. **Start backend** (`localhost:8000`)
2. **Start agent_service** (`localhost:8100`)
3. **Start frontend** (`localhost:5173`)
4. Open your browser at `http://localhost:5173`

On first load, the app will:

* Automatically register you as a new player.
* Generate a **mnemonic phrase** (for educational purposes only).
* Store a local profile so you rejoin the same player next time.
* Allow you to start mining and earning demo BABY tokens.

---

## How to Play

### Mining
- Click "Start Mining" to begin mining blocks
- Successfully mined blocks reward you with BABY tokens
- The mining difficulty is set low for demonstration purposes

### Transferring Tokens
- Enter a recipient's Player ID
- Enter the amount of BABY tokens to send
- Transactions are added to pending pool and included in the next mined block

### AI Coach
- Ask questions about blockchain concepts
- Get explanations about what's happening on the chain
- Learn about security, consensus, and more

## Mining Mechanism (详细挖矿流程)

### How Mining Works

#### 1. Mining Process Flow
```
Player clicks "Start Mining"
    ↓
Frontend generates random nonce (0-9999)
    ↓
Sends to backend: {player_id, nonce}
    ↓
Backend builds block header:
    header = "index:prev_hash:merkle_root:timestamp:nonce"
    hash = MD5(header) % 1,000,000
    ↓
Check if hash < difficulty (400,000)
    ↓
Success: Create new block → Reward miner
Failure: Try again with new nonce
```

#### 2. Mathematical Challenge
The mining challenge is to find a nonce that produces a hash below the difficulty threshold:

- **Block Header**: `"1:abc123ef:def456ab:2024-11-23T23:16:00:5678"`
  - Components: index:prev_hash:merkle_root:timestamp:nonce
- **Hash**: MD5(block_header) → 128-bit output
- **Normalize**: First 4 bytes → integer → modulo 1,000,000
- **Success**: `hash_value < 400,000` (40% probability)

#### 3. Visual Feedback
Each mining attempt shows:
```
Block Header Components:
- Index: 1
- Prev Hash: abc123ef...
- Merkle Root: def456ab...
- Timestamp: 2024-11-23T23:16:00
- Nonce: 5678

Hash Calculation: MD5(1:abc123ef:def456ab:2024-11-23:5678) % 1000000
Result: 234567 < 400000 = ✓ (Success!)
```

### Technical Challenges & Solutions

#### Problem 1: Mining Too Difficult
**Initial Issue**: With 6-digit nonce and 20% success rate, mining took too long.
**Solution**: 
- Reduced nonce to 4 digits (0-9999)
- Increased success rate to 40%
- Mining now succeeds in 5-10 seconds on average

#### Problem 2: Not Real Enough
**Initial Issue**: Simple math formula was predictable, no block header structure.
**Solution**: 
- Implemented proper block header (prev_hash, merkle_root, timestamp, nonce)
- Used MD5 hash function with real cryptographic properties
- Transactions included via Merkle Root (not direct amount)
- Each block links to previous (chain structure)

#### Problem 3: Performance Balance
**Initial Issue**: SHA256 too slow for educational demo.
**Solution**: 
- Used MD5 (3-5x faster than SHA256)
- Still provides real hash experience
- Fast enough for smooth UI (500ms intervals)

#### Problem 4: Visualization
**Initial Issue**: Users couldn't see if mining was "real" or just random.
**Solution**: 
- Display complete block header components
- Show prev_hash and merkle_root (proves chain linkage)
- Highlight the changing nonce vs fixed components
- Real-time hash calculation display
- Color-coded success/failure indicator

### Mining Parameters

| Parameter | Value | Reason |
|-----------|-------|--------|
| Hash Algorithm | MD5 | Fast, real hash properties |
| Nonce Range | 0-9999 | ~10 attempts for success |
| Difficulty | 400,000/1M | 40% success rate |
| Mining Speed | 2 attempts/sec | Visible progress |
| Block Reward | 10 BABY | Meaningful incentive |

### Mining Statistics

With current settings:
- **Average time to mine**: 5-10 seconds
- **Success probability per attempt**: 40%
- **Expected attempts**: 2.5
- **Maximum attempts**: Theoretically 10,000 (all nonces)

### Real Development Challenges (实际开发难点)

#### 1. Balancing Realism vs Usability
**Challenge**: Real Bitcoin uses SHA256 with massive nonce space (2^32), taking 10 minutes per block.
**Our Approach**: 
- MD5 instead of SHA256 (faster)
- 4-digit nonce (10,000 possibilities)
- 40% success rate (vs Bitcoin's 0.00000000023%)
- Result: Educational but still "feels real"

#### 2. Concurrent Mining Issues
**Challenge**: Multiple users mining simultaneously could cause race conditions.
**Solution**: 
```python
# Backend uses thread-safe operations
with self.lock:
    self.blocks.append(new_block)
    self.pending_transactions.clear()
```

#### 3. Frontend-Backend Synchronization
**Challenge**: How to show real-time mining progress without WebSocket?
**Solution**: 
- Polling every 3 seconds for chain state
- Local mining animation with actual backend validation
- Optimistic UI updates with backend confirmation

#### 4. Making It "Feel" Like Real Mining
**Challenge**: Users questioned if the mining was real or just RNG.
**Solution**: 
- Show the exact hash calculation
- Display failed attempts with their hash values
- Visualize the inequality check
- Use real hash function (MD5) not just math

#### 5. Educational vs Secure
**Challenge**: Should we use secure practices or simplified ones?
**Decision**: Simplified for education
- Mnemonic stored in localStorage (bad for production!)
- MD5 hash (cryptographically broken!)
- Simple signatures (not real ECDSA!)
- But concepts remain valid!

### Quick Mining Summary (挖矿要点总结)

**What You See**: 
```
Block Header: 1:abc123:def456:2024-11-23:5678
Hash: MD5(header) % 1000000 = 234567
Check: 234567 < 400000 = ✓ Success!
```

**What Actually Happens**:
1. Frontend tries random 4-digit nonces
2. Backend builds block header with all components
3. Computes MD5(header) like real blockchain
4. If hash < 400,000 → Success! (40% chance)
5. Winner gets 10 BABY tokens
6. All pending transactions included via Merkle Root

**Why This Design**:
- **Real Block Header**: Contains prev_hash, merkle_root, timestamp, nonce
- **Chain Structure**: Each block links to previous via hash
- **Transaction Integrity**: Merkle root ensures all transactions included
- **True PoW**: Must brute-force nonces, cannot predict success
- **Educational Balance**: Complex enough to be real, simple enough to understand

## API Documentation

Once the backend is running, visit:
- API Documentation: `http://localhost:8000/docs`
- Alternative API Docs: `http://localhost:8000/redoc`

## Important Security Notice

⚠️ **This is an EDUCATIONAL PROJECT ONLY**

- Do NOT use this for real cryptocurrency
- Do NOT use the generated mnemonics for real wallets
- Do NOT deploy this to production
- This blockchain is intentionally simplified and insecure

## Technology Stack

### Backend
- Python 3.12.6
- FastAPI
- Pydantic
- uvicorn

### Frontend

* React 18
* TypeScript
* Tailwind CSS
* Vite

### AI / Agents

* SpoonOS / `spoon_ai` SDK
* Custom tools wrapping BabyBTC chain events, player stats, and chain summary.

## Troubleshooting

### Backend won't start
- Make sure Python 3.12+ is installed
- Ensure all requirements are installed: `pip install -r requirements.txt`
- Check that port 8000 is not in use

### Frontend won't connect to backend
- Ensure the backend is running on port 8000
- Check browser console for CORS errors
- Make sure you're accessing via `http://localhost:5173` not `127.0.0.1`

### Mining not working
- Check that you have a positive balance
- Ensure the backend is responding
- Try refreshing the page

## Development

### Adding New Features
1. Backend logic goes in `/backend/app/`
2. Frontend components go in `/frontend/src/components/`
3. API routes are defined in `/backend/app/api/`

### Testing
- Backend: Run `python -m pytest` (if tests are added)
- Frontend: Run `pnpm test` (if tests are added)

## License

This project is for educational purposes only as part of the Scoop AI Hackathon.

## Acknowledgments

Created for the Scoop AI Hackathon - Autonomous Finance & Quant AI Track
