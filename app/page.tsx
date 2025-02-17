import React from 'react';
import { Bot, MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-black text-white">
        <nav className="container mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-10 h-10" />
            <span className="text-2xl font-bold tracking-tight">AIChat</span>
          </div>
          <Link href={'/chat'} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200">
            Get Started
          </Link>
        </nav>
        
        <div className="container mx-auto px-20 py-32">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">Experience the Future of Conversation</h1>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
              Engage with our advanced AI chatbot that understands context, learns from conversations, and provides intelligent responses in real-time.
            </p>
            <div className="flex space-x-6">
              <Link href={'/chat'} className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center text-lg">
                Try Now <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-24">Why Choose Our AI Chatbot?</h2>
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="bg-black text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 transform transition-transform duration-200 group-hover:rotate-6">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-6">Natural Conversations</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Engage in fluid, context-aware conversations that feel natural and human-like.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-black text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 transform transition-transform duration-200 group-hover:rotate-6">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-6">Lightning Fast</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Get instant responses powered by our advanced AI technology.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-black text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 transform transition-transform duration-200 group-hover:rotate-6">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-6">Secure & Private</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Your conversations are encrypted and completely private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-8 text-center text-gray-600">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Bot className="w-8 h-8" />
            <span className="text-xl font-bold text-black">AIChat</span>
          </div>
          <p className="text-lg">© 2024 Swaparup Mukherjee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;