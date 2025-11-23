// Main App component

import { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { GamePage } from './pages/GamePage';
import { LandingPage } from './pages/LandingPage';
import { Modal } from './components/common/Modal';
import { useBootstrap } from './hooks/useBootstrap';
import './styles/index.css';

function App() {
  const { status, profile, isFirstTime } = useBootstrap();
  const [showMnemonicModal, setShowMnemonicModal] = useState(isFirstTime);
  const [currentPage, setCurrentPage] = useState<'landing' | 'game'>('game');

  useEffect(() => {
    // Simple routing based on pathname
    const path = window.location.pathname;
    if (path === '/landingpage') {
      setCurrentPage('landing');
    } else {
      setCurrentPage('game');
    }

    // Handle navigation
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/landingpage') {
        setCurrentPage('landing');
      } else {
        setCurrentPage('game');
      }
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  if (status === 'booting') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            B
          </div>
          <p className="text-gray-600">Initializing BabyBTC...</p>
        </div>
      </div>
    );
  }

  // Show landing page first, no need for backend connection
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  // For game page, check backend connection
  if (status === 'error' || !profile) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            !
          </div>
          <p className="text-red-600 mb-4">Failed to connect to backend</p>
          <p className="text-gray-600 text-sm">Please make sure the backend server is running</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AppShell profile={profile}>
        <GamePage profile={profile} />
      </AppShell>

      <Modal
        isOpen={showMnemonicModal && isFirstTime}
        onClose={() => setShowMnemonicModal(false)}
        title="Welcome to BabyBTC!"
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> This is your mnemonic phrase. Save it securely!
              This is for educational purposes only - never use these words for real wallets.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-2">
              {profile.mnemonic.split(' ').map((word, index) => (
                <div key={index} className="text-center">
                  <span className="text-xs text-gray-500">{index + 1}.</span>
                  <span className="ml-1 font-mono text-sm">{word}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(profile.mnemonic);
              alert('Mnemonic copied to clipboard!');
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Copy Mnemonic
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;
