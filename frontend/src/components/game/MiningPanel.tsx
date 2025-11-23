// Mining control panel component

import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useMining } from '../../hooks/useMining';

interface MiningPanelProps {
  playerId: string;
  onBlockMined?: () => void;
}

export const MiningPanel: React.FC<MiningPanelProps> = ({ playerId, onBlockMined }) => {
  const { 
    isMining,
    attempts,
    successes,
    lastMessage,
    lastMiningDetails,
    currentNonce,
    startMining,
    stopMining
  } = useMining({ playerId, onBlockMined });

  const successRate = attempts > 0 ? ((successes / attempts) * 100).toFixed(1) : '0.0';
  const toggleMining = () => isMining ? stopMining() : startMining();

  return (
    <Card title="Mining Control">
      {lastMessage && (
        <div className={`p-3 rounded-lg mb-4 ${
          lastMessage.includes('successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          <div className="flex items-center gap-2">
            {lastMessage.includes('successfully') && (
              <span>🎉</span>
            )}
            <span className="font-medium">{lastMessage}</span>
          </div>
        </div>
      )}
      
      {/* Math Visualization */}
      {lastMiningDetails && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-sm font-semibold mb-2 text-slate-700">Mining Challenge (Block Header Hash):</div>
          <div className="space-y-2">
            {lastMiningDetails.components && (
              <div className="font-mono text-xs bg-white p-2 rounded border border-slate-300">
                <div className="text-slate-600 mb-1">Block Header Components:</div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <div><span className="text-slate-500">Index:</span> {lastMiningDetails.components.index}</div>
                  <div><span className="text-slate-500">Nonce:</span> <span className="text-blue-600 font-bold">{lastMiningDetails.components.nonce}</span></div>
                  <div><span className="text-slate-500">Prev:</span> {lastMiningDetails.components.prev_hash}</div>
                  <div><span className="text-slate-500">Merkle:</span> {lastMiningDetails.components.merkle_root}</div>
                </div>
              </div>
            )}
            <div className="font-mono text-xs bg-white p-2 rounded border border-slate-300">
              <div className="text-slate-600">Hash Calculation:</div>
              <div className="text-black text-[10px] break-all">{lastMiningDetails.block_header || lastMiningDetails.formula}</div>
            </div>
            <div className="font-mono text-xs bg-white p-2 rounded border border-slate-300">
              <div className="text-slate-600">Result:</div>
              <div className={`text-lg font-bold ${
                lastMiningDetails.solved ? 'text-green-600' : 'text-red-600'
              }`}>
                {lastMiningDetails.equation} = {lastMiningDetails.solved ? '✓' : '✗'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-1">Status</div>
          <div className="text-xl font-bold">
            {isMining ? 'Mining...' : 'Idle'}
          </div>
          {isMining && currentNonce && (
            <div className="text-xs text-gray-500 mt-1">
              Testing nonce: <span className="font-mono">{currentNonce}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Attempts</div>
            <div className="text-xl font-bold">{attempts}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Blocks Mined</div>
            <div className="text-xl font-bold text-green-600">{successes}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Success Rate</div>
            <div className="text-xl font-bold">{successRate}%</div>
          </div>
        </div>

        <Button
          variant={isMining ? 'danger' : 'primary'}
          size="lg"
          onClick={toggleMining}
          className="w-full"
        >
          {isMining ? 'Stop Mining' : 'Start Mining'}
        </Button>
      </div>
    </Card>
  );
};
