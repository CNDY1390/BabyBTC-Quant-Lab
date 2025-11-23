import React from 'react';

function App() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold">BabyBTC</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Hackathon</span>
            </div>
            <div className="flex space-x-6">
              <a href="#problem" className="text-gray-700 hover:text-indigo-600 transition">Problem</a>
              <a href="#solution" className="text-gray-700 hover:text-indigo-600 transition">Solution</a>
              <a href="#demo" className="text-gray-700 hover:text-indigo-600 transition">Demo</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">GitHub</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
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
                    <div className="font-mono text-sm">Hash: 0xabc123...</div>
                    <div className="text-xs text-gray-600 mt-1">Miner: Alice</div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-start space-x-2">
                      <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">AI</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">"This block was mined using MD5 hash with difficulty 400,000..."</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Block #43</div>
                    <div className="font-mono text-sm">Hash: 0xdef456...</div>
                    <div className="text-xs text-gray-600 mt-1">Miner: Bob</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why we built this</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Concepts are hard to internalize</h3>
                  <p className="text-gray-600">On-chain concepts like PoW, blocks, and double-spend attacks remain abstract without hands-on experience.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Real chains are risky</h3>
                  <p className="text-gray-600">Real blockchains involve real money—unsafe for experimentation and learning through trial and error.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Knowledge gap in teams</h3>
                  <p className="text-gray-600">Teams have a knowledge gap between infrastructure engineers and everyone else, slowing down collaboration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">A safe playground for on-chain finance</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">What is BabyBTC?</h3>
                <p className="text-gray-600 leading-relaxed">
                  BabyBTC is a local/LAN toy Proof-of-Work blockchain with virtual BABY tokens. 
                  It simulates real blockchain mechanics—mining, transactions, and consensus—without 
                  any real monetary risk. Perfect for education, demos, and safe experimentation.
                </p>
              </div>
              
              <div className="grid gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-1">🔨 Toy PoW Chain</h4>
                  <p className="text-sm text-gray-600">MD5-based hash, 4-digit nonce, fast blocks for instant feedback.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-1">🖥️ Interactive Web UI</h4>
                  <p className="text-sm text-gray-600">Mine blocks, transfer tokens, watch the chain evolve in real-time.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-1">🤖 AI Coach</h4>
                  <p className="text-sm text-gray-600">SpoonOS agent explains what just happened on the chain.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h4 className="font-semibold mb-2">Auto Registration</h4>
                <p className="text-sm text-gray-600">Player opens the web app and gets auto-registered on the Baby chain.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h4 className="font-semibold mb-2">Mine & Transfer</h4>
                <p className="text-sm text-gray-600">Player mines blocks and sends BABY tokens to other players.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h4 className="font-semibold mb-2">AI Explains</h4>
                <p className="text-sm text-gray-600">The AI coach reads events and explains blocks, transactions, and risks.</p>
              </div>
            </div>
            
            <div className="bg-gray-900 text-gray-300 rounded-xl p-6 font-mono text-sm">
              <div className="text-green-400 mb-2"># Mining Algorithm (Simplified)</div>
              <div>header = index : prev_hash : merkle_root : timestamp : nonce</div>
              <div>hash   = MD5(header) % 1_000_000</div>
              <div className="text-yellow-400 mt-2">success if hash &lt; difficulty</div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Architecture</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-indigo-600 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <p className="text-sm text-gray-600 mb-3">React + Tailwind, ChatGPT-like UI</p>
                <div className="text-xs text-gray-500">
                  <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-1">React</span>
                  <span className="inline-block bg-gray-100 rounded px-2 py-1">Tailwind</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-indigo-600 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">BabyBTC Node</h3>
                <p className="text-sm text-gray-600 mb-3">FastAPI, toy PoW, in-memory chain</p>
                <div className="text-xs text-gray-500">
                  <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-1">Python</span>
                  <span className="inline-block bg-gray-100 rounded px-2 py-1">FastAPI</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-indigo-600 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Agent Service</h3>
                <p className="text-sm text-gray-600 mb-3">FastAPI + SpoonOS/spoon_ai tools</p>
                <div className="text-xs text-gray-500">
                  <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-1">SpoonOS</span>
                  <span className="inline-block bg-gray-100 rounded px-2 py-1">AI</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                <span>Browser</span>
                <span>→</span>
                <span className="font-semibold">Frontend</span>
                <span>→</span>
                <span className="font-semibold">Agent</span>
                <span>→</span>
                <span className="font-semibold">Node</span>
              </div>
            </div>
          </div>
        </section>

        {/* Demo & Links Section */}
        <section id="demo" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Demo & Links</h2>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 p-8 text-center">
                <div className="inline-block bg-gray-200 rounded-lg px-20 py-16 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Demo Video Placeholder</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center space-x-4 mb-4">
                  <a href="#" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Watch Demo Video
                  </a>
                  <a href="#" className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                    GitHub Repository
                  </a>
                </div>
                
                <p className="text-center text-sm text-gray-500">
                  ⚠️ All tokens are purely virtual. Educational use only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack & Credits Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Built with</h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm">Python</span>
              <span className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm">FastAPI</span>
              <span className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm">React</span>
              <span className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm">TypeScript</span>
              <span className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm">Tailwind CSS</span>
              <span className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm">SpoonOS / spoon_ai</span>
            </div>
            
            <p className="text-gray-600">
              Created for the <span className="font-semibold">Scoop AI Hackathon</span> – Autonomous Finance & Quant AI Track
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            © 2025 BabyBTC Quant Lab. For educational purposes only. Not a real cryptocurrency.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
