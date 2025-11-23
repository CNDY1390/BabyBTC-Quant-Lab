// AI Coach chat management hook

import { useState, useCallback } from 'react';
import { AiMessage } from '../lib/types';
import { askAiCoach } from '../lib/apiAi';

interface UseAiCoachOptions {
  playerId: string;
}

interface UseAiCoachResult {
  messages: AiMessage[];
  isSending: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useAiCoach({ playerId }: UseAiCoachOptions): UseAiCoachResult {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to BabyBTC! I\'m your AI coach. Ask me anything about blockchain, mining, or trading strategies.',
      createdAt: new Date().toISOString()
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isSending) return;

    const userMessage: AiMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    };

    setMessages((prev: AiMessage[]) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const response = await askAiCoach(playerId, content);
      
      const assistantMessage: AiMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        createdAt: new Date().toISOString()
      };

      setMessages((prev: AiMessage[]) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: AiMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        createdAt: new Date().toISOString()
      };

      setMessages((prev: AiMessage[]) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }, [playerId, isSending]);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Chat cleared. How can I help you?',
      createdAt: new Date().toISOString()
    }]);
  }, []);

  return {
    messages,
    isSending,
    sendMessage,
    clearMessages
  };
}
