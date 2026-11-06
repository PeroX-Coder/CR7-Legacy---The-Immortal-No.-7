import React, { useState } from 'react';
import { ChevronDown, Trophy, Shield, Flame, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroProps {
  onEnterLegacy: () => void;
  onSecretClick: () => void;
  secretClicks: number;
}

export const Hero: React.FC<HeroProps> = ({ onEnterLegacy, onSecretClick, secretClicks }) => {
  const [sevenBouncing, setSevenBouncing] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);

  const handleSevenClick = () => {
    sound.playClick(900);
    setSevenBouncing(true);
    setTimeout(() => setSevenBouncing(false), 500);
    onSecretClick();
  };

  const handleStartAtmosphere = () => {
    sound.startStadiumAtmosphere();
    setSoundStarted(true);
    sound.playClick(700);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Stadium Background Atmosphere & Spotlight Beams */}
      <div className="absolute inset-0 bg-[#040407] pointer-events-none">
        {/* Subtle Pitch Grass pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Dramatic Portugal Red Spotlight */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-red-600/15 rounded-full blur-[140px]" />
        
        {/* Emerald green beam accent (representing Portugal flag) */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px]" />

        {/* Golden halo beam from above */}
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[140px]" />

        {/* Diagonal Stadium Floodlight Beams */}
        <div className="absolute -top-20 left-1/4 w-32 h-[800px] bg-gradient-to-b from-white/10 to-transparent rotate-45 blur-2xl transform-gpu pointer-events-none" />
        <div className="absolute -top-20 right-1/4 w-32 h-[800px] bg-gradient-to-b from-red-500/10 to-transparent -rotate-45 blur-2xl transform-gpu pointer-events-none" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-10 flex flex-col items-center">
        {/* Stadium Audio Warmup Banner (if audio not active yet) */}
        {!soundStarted && (
          <button
            onClick={handleStartAtmosphere}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold hover:bg-red-900/60 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-red-950/50"
          >
            <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>ENABLE CINEMATIC STADIUM AUDIO EXPERIENCE</span>
          </button>
        )}

        {/* Cinematic Opening Motto */}
        <div className="inline-flex flex-col items-center mb-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-[11px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>PORTUGAL SELEÇÃO 2003 – 2026</span>
          </div>
          <h2 className="mt-4 font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-[0.35em] text-zinc-300 uppercase">
            ONE NATION. ONE NUMBER. ONE LEGACY.
          </h2>
        </div>

        {/* Main Display: CR7 & THE IMMORTAL NO. 7 */}
        <div className="relative my-2 select-none">
          {/* Animated Glowing Number 7 Centerpiece */}
          <div
            onClick={handleSevenClick}
            title="Click the 7! (Secrets await)"
            className={`cursor-pointer inline-block transition-transform duration-300 ${
              sevenBouncing ? 'scale-110 rotate-3' : 'hover:scale-105'
            }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-red-600/30 blur-3xl rounded-full scale-125 pointer-events-none" />

              {/* Massive 3D-Style No. 7 Typography */}
              <div className="relative flex flex-col items-center">
                <span className="font-bebas text-[110px] sm:text-[160px] md:text-[210px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-red-500 to-red-950 drop-shadow-[0_15px_30px_rgba(228,37,24,0.6)]">
                  CR7
                </span>

                {/* Subtitle Badge */}
                <div className="relative -mt-6 sm:-mt-10 md:-mt-14 px-6 py-2 rounded-xl bg-[#09090e]/90 border border-red-500/40 backdrop-blur-xl shadow-2xl shadow-black">
                  <h1 className="font-bebas text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] text-white flex items-center gap-3">
                    <span className="text-red-500">THE IMMORTAL</span>
                    <span className="text-amber-400 font-cinzel font-black">NO. 7</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Hint indicator for Secret Clicker */}
          <div className="mt-3 text-[11px] text-zinc-500 font-medium tracking-wider flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400/80" />
            <span>Interactive Artifact: Tap the 7 ({secretClicks}/7)</span>
          </div>
        </div>

        {/* Narrative Lead */}
        <p className="mt-6 max-w-2xl text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
          From an 18-year-old prodigy debuting in Chaves to football’s all-time international scoring world record.
          Explore the epic 23-year international saga of Portugal’s immortal captain, his trophies, and his iron mentality.
        </p>

        {/* Key International Trophies Pill Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/70 border border-red-500/20 shadow-md">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase font-semibold">Trophies</div>
              <div className="text-xs font-bold text-white font-bebas tracking-wide">Euro 2016 · Nations League &apos;19 & &apos;25</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/70 border border-red-500/20 shadow-md">
            <Flame className="w-4 h-4 text-red-500" />
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase font-semibold">All-Time World Record</div>
              <div className="text-xs font-bold text-white font-bebas tracking-wide">146 International Goals</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/70 border border-red-500/20 shadow-md">
            <Shield className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase font-semibold">Caps & Loyalty</div>
              <div className="text-xs font-bold text-white font-bebas tracking-wide">234 Portugal Appearances</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              sound.playClick(650);
              onEnterLegacy();
            }}
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-red-900 text-white font-bebas text-lg tracking-widest uppercase hover:brightness-110 transition-all duration-300 shadow-xl shadow-red-900/40 hover:shadow-red-600/50 cursor-pointer flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span>ENTER THE LEGACY</span>
            <ChevronDown className="w-5 h-5 text-red-200 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#challenge"
            onClick={() => sound.playClick(750)}
            className="px-6 py-3.5 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 font-bebas text-lg tracking-widest uppercase hover:text-white hover:border-red-500/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-red-400" />
            <span>PLAY NO. 7 CHALLENGE</span>
          </a>
        </div>
      </div>
    </section>
  );
};
