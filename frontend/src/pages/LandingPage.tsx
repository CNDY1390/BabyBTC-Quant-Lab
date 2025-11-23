// Landing Page component
import React from 'react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-900">BabyBTC</div>
            <div className="flex space-x-6">
              <a href="#overview" className="text-gray-600 hover:text-gray-900">Overview</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#demo" className="text-gray-600 hover:text-gray-900">Demo</a>
              <a href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Launch Game
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                BabyBTC Quant Lab
              </h1>
              <p className="text-xl text-indigo-600 font-medium mb-4">
                A Baby PoW Chain + AI Coach for On-chain Finance Education
              </p>
              <p className="text-gray-600 mb-8">
                A toy blockchain playground with an AI coach to help you understand on-chain finance concepts. 
                Built for the Scoop AI Hackathon, Autonomous Finance & Quant AI track.
              </p>
              <div className="flex space-x-4">
                <a href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Launch Game
                </a>
                <a href="https://github.com/CNDY1390/BabyBTC-Quant-Lab" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                  View GitHub
                </a>
              </div>
            </div>
            
            {/* Mock Illustration */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Block #42</div>
                  <div className="font-mono text-xs text-gray-700">
                    hash: 000000abc...123
                    <br />
                    nonce: 1337
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-xs text-green-600 font-semibold mb-1">Mining Success!</div>
                  <div className="text-xs text-gray-600">Reward: 12.5 BTC</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <div className="text-xs text-indigo-600 font-semibold mb-1">AI Coach</div>
                  <div className="text-xs text-gray-600">"Great work! You just validated a block..."</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="overview" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Problem</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain is Abstract</h3>
                <p className="text-gray-600">
                  People can't see blocks being mined, can't touch the chain linking, 
                  can't feel the computational work.
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">PoW is Energy-Intensive</h3>
                <p className="text-gray-600">
                  Real mining requires expensive hardware and consumes massive electricity, 
                  making it inaccessible for learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Solution</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Baby PoW Chain</h3>
                <p className="text-gray-600">
                  A simplified blockchain with instant visual feedback, 
                  where mining takes seconds instead of minutes.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Coach</h3>
                <p className="text-gray-600">
                  Real-time guidance that explains what's happening, 
                  celebrating successes and helping through failures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Guess Nonce</h3>
                <p className="text-gray-600">Try different numbers to find the golden nonce</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Hash Calculation</h3>
                <p className="text-gray-600">MD5 hash simulates the mining process</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Chain Update</h3>
                <p className="text-gray-600">Success adds a new block to the chain</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tech Stack</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <p className="text-sm text-gray-600">React + TypeScript + Vite + Tailwind CSS</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <p className="text-sm text-gray-600">FastAPI + Python</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">AI Coach</h3>
                <p className="text-sm text-gray-600">OpenAI GPT via SpoonOS</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Blockchain</h3>
                <p className="text-sm text-gray-600">Custom Baby PoW Implementation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Mining?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience blockchain mining with instant feedback and AI guidance
            </p>
            <a href="/" className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
              Launch BabyBTC Game →
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">© 2024 BabyBTC Quant Lab</p>
            <div className="flex space-x-6">
              <a href="https://github.com/CNDY1390/BabyBTC-Quant-Lab" className="text-gray-600 hover:text-gray-900">
                GitHub
              </a>
              <span className="text-gray-600">
                Built for Scoop AI Hackathon
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
