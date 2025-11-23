// Token transfer component

import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { transfer } from '../../lib/apiGame';

interface TransferPanelProps {
  currentPlayerId: string;
  onTransferComplete?: () => void;
}

export const TransferPanel: React.FC<TransferPanelProps> = ({ 
  currentPlayerId,
  onTransferComplete 
}) => {
  const [toPlayerId, setToPlayerId] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (!toPlayerId.trim()) {
      setError('Please enter recipient player ID');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await transfer(currentPlayerId, toPlayerId, amountNum);
      setSuccess(true);
      setToPlayerId('');
      setAmount('');
      if (onTransferComplete) {
        onTransferComplete();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Send BABY Tokens">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm">
            Transfer sent successfully! It will be included in the next block.
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Player ID
          </label>
          <input
            type="text"
            value={toPlayerId}
            onChange={(e) => setToPlayerId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter player ID"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (BABY)
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="0.00"
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Transfer'}
        </Button>
      </form>
    </Card>
  );
};
