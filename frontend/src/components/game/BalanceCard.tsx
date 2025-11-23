// Balance display component

import React from 'react';
import { Card } from '../common/Card';
import { PlayerState } from '../../lib/types';

interface BalanceCardProps {
  player: PlayerState | null;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ player }) => {
  if (!player) {
    return (
      <Card title="Balance">
        <div className="text-center text-gray-500">Loading...</div>
      </Card>
    );
  }

  return (
    <Card title="Your Balance">
      <div className="space-y-3">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">
            {player.balance_baby.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 mt-1">BABY tokens</div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Statistics</div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Blocks Mined</span>
              <span className="font-semibold">{player.stats.blocks_mined}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mining Attempts</span>
              <span className="font-semibold">{player.stats.mining_attempts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address</span>
              <span className="font-mono text-xs">
                {player.address.slice(0, 8)}...{player.address.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
