// Main game page component

import React from 'react';
import { MiningPanel } from '../components/game/MiningPanel';
import { BalanceCard } from '../components/game/BalanceCard';
import { ChainTimeline } from '../components/game/ChainTimeline';
import { TransferPanel } from '../components/game/TransferPanel';
import { AiCoachPanel } from '../components/ai/AiCoachPanel';
import { useGameState } from '../hooks/useGameState';
import { LocalProfile } from '../lib/types';

interface GamePageProps {
  profile: LocalProfile;
}

export const GamePage: React.FC<GamePageProps> = ({ profile }) => {
  const { gameState, refresh } = useGameState({
    playerId: profile.playerId,
    intervalMs: 3000
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="space-y-6">
        <MiningPanel 
          playerId={profile.playerId}
          onBlockMined={refresh}
        />
        <BalanceCard 
          player={gameState?.player || null}
        />
      </section>

      <section className="space-y-6">
        <ChainTimeline 
          blocks={gameState?.recent_blocks || []}
          currentPlayerId={profile.playerId}
        />
        <TransferPanel 
          currentPlayerId={profile.playerId}
          onTransferComplete={refresh}
        />
      </section>

      <section>
        <AiCoachPanel 
          playerId={profile.playerId}
        />
      </section>
    </div>
  );
};
