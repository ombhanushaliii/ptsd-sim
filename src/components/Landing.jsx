import React from 'react';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-white text-2xl font-bold">YourApp</div>
        <div className="flex gap-8">
          <a href="#research" className="text-white/80 hover:text-white">Research</a>
          <a href="#product" className="text-white/80 hover:text-white">Product</a>
          <a href="#studios" className="text-white/80 hover:text-white">Studios</a>
          <a href="#company" className="text-white/80 hover:text-white">Company</a>
          <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start justify-center h-[calc(100vh-80px)] px-16">
        <div className="text-white space-y-6 max-w-2xl">
          <div className="text-sm font-medium tracking-wider opacity-80">NEW RELEASES</div>
          <h1 className="text-6xl font-serif">
            Frames
            <br />
            <span className="text-5xl text-white/80">Gen-3 Alpha</span>
            <br />
            <span className="text-4xl text-white/60">Act-One</span>
          </h1>
          <p className="text-xl text-white/80 mt-4">
            A new frontier for fast, high-fidelity, controllable video generation.
          </p>
          <button className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 mt-8">
            Try Runway Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
      </main>

      {/* Decorative gradient orb */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl"></div>
    </div>
  );
};

export default Landing;