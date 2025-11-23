// Blockchain timeline display component

import React from 'react';
import { Card } from '../common/Card';
import { BlockSummary } from '../../lib/types';

interface ChainTimelineProps {
  blocks: BlockSummary[];
  currentPlayerId?: string;
}

export const ChainTimeline: React.FC<ChainTimelineProps> = ({ blocks, currentPlayerId }) => {
  return (
    <Card title="Recent Blocks">
      <div className="space-y-3">
        {blocks.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No blocks mined yet</div>
        ) : (
          blocks.map((block, index) => (
            <div key={block.index} className="relative">
              {index < blocks.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
              )}
              
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    {block.index}
                  </div>
                </div>
                
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-sm">
                        Block #{block.index}
                        {block.miner_id === currentPlayerId && (
                          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">You</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Miner: {block.miner_name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(block.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Reward</div>
                      <div className="font-semibold text-sm">{block.reward} BABY</div>
                      {block.tx_count > 0 && (
                        <div className="text-xs text-gray-500 mt-1">{block.tx_count} tx</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
