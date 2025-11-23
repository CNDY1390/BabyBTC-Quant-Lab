// Main application layout shell

import React from 'react';
import { LocalProfile } from '../../lib/types';

interface AppShellProps {
  profile: LocalProfile;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ profile, children }) => {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
              B
            </div>
            <span className="font-semibold text-lg">BabyBTC Quant Lab</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <span className="text-gray-600">Player:</span>
              <span className="ml-1 font-semibold">{profile.playerId}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Address:</span>
              <span className="ml-1 font-mono text-xs">
                {profile.address.slice(0, 8)}...{profile.address.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
