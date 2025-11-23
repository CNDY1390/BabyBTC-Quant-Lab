// AI API functions for BabyBTC

import { fetchApi } from './apiClient';
import { AiAnswerResponse, EventSummary } from './types';

export async function askAiCoach(
  playerId: string,
  question: string
): Promise<AiAnswerResponse> {
  // For hackathon demo, return mock response if AI service is not available
  try {
    return await fetchApi<AiAnswerResponse>('/api/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ player_id: playerId, question }),
    });
  } catch (error) {
    // Fallback to mock response for demo
    return {
      answer: generateMockAnswer(question),
      related_events: []
    };
  }
}

export async function getRecentEvents(limit: number = 20): Promise<{
  events: EventSummary[];
  total_events: number;
  chain_height: number;
}> {
  return fetchApi(`/api/ai/recent_events?limit=${limit}`);
}

function generateMockAnswer(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('mining') || lowerQuestion.includes('mine')) {
    return "Mining in BabyBTC works through a simplified Proof-of-Work mechanism. You submit a nonce value, and if it produces a hash below the difficulty threshold, you successfully mine a block and earn BABY tokens as a reward.";
  }
  
  if (lowerQuestion.includes('transfer') || lowerQuestion.includes('send')) {
    return "To transfer BABY tokens, you need the recipient's player ID. The transaction will be added to the pending pool and included in the next mined block. Your balance is updated once the block is confirmed.";
  }
  
  if (lowerQuestion.includes('block')) {
    return "Each block contains a list of transactions, a reference to the previous block (creating the chain), and metadata like the miner's ID and timestamp. This structure ensures the integrity and immutability of the blockchain.";
  }
  
  if (lowerQuestion.includes('attack') || lowerQuestion.includes('security')) {
    return "BabyBTC is designed for educational purposes and intentionally includes vulnerabilities to demonstrate blockchain security concepts. In a real blockchain, mechanisms like distributed consensus and cryptographic signatures prevent attacks.";
  }
  
  return "BabyBTC is an educational blockchain that demonstrates key concepts like mining, transactions, and consensus. Feel free to ask about specific aspects like mining strategy, transaction validation, or blockchain security!";
}
