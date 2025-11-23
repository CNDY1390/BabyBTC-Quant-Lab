// Bootstrap hook for auto-initialization

import { useState, useEffect } from 'react';
import { LocalProfile } from '../lib/types';
import { loadProfile, saveProfile } from '../lib/storage';
import { register } from '../lib/apiGame';

export interface BootstrapResult {
  status: 'booting' | 'ready' | 'error';
  profile: LocalProfile | null;
  isFirstTime: boolean;
  error?: string;
}

export function useBootstrap(): BootstrapResult {
  const [result, setResult] = useState<BootstrapResult>({
    status: 'booting',
    profile: null,
    isFirstTime: false
  });

  useEffect(() => {
    async function bootstrap() {
      try {
        // Check for existing profile
        const existingProfile = loadProfile();
        
        if (existingProfile) {
          setResult({
            status: 'ready',
            profile: existingProfile,
            isFirstTime: false
          });
        } else {
          // Generate random name for new player
          const randomNum = Math.floor(Math.random() * 10000);
          const playerName = `miner-${randomNum}`;
          
          // Register new player
          const response = await register(playerName);
          
          // Create and save profile
          const newProfile: LocalProfile = {
            playerId: response.player_id,
            address: response.address,
            mnemonic: response.mnemonic,
            createdAt: new Date().toISOString()
          };
          
          saveProfile(newProfile);
          
          setResult({
            status: 'ready',
            profile: newProfile,
            isFirstTime: true
          });
        }
      } catch (error) {
        console.error('Bootstrap error:', error);
        setResult({
          status: 'error',
          profile: null,
          isFirstTime: false,
          error: error instanceof Error ? error.message : 'Failed to initialize'
        });
      }
    }
    
    bootstrap();
  }, []);

  return result;
}
