import React from 'react';
import { Shield, Trophy, Sparkles, ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

export const ClosingSection: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="closing" className="relative py-28 bg-[#030305] overflow-hidden border-t border-zinc-900">
      {/* Stadium Beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-emerald-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Armillary & Shield Emblem */}
        <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-gradient-to-b from-red-600 to-red-950 border border-amber-400/50 shadow-2xl shadow-red-900/40">
          <span className="font-bebas text-4xl text-amber-300 font-black">7</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-black" />
        </div>

        {/* Required Closing Motto */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="font-cinzel text-base sm:text-xl md:text-2xl text-zinc-300 font-semibold tracking-[0.25em] leading-relaxed uppercase">
            &ldquo;THE SHIRT MAY CHANGE HANDS.<br />
            THE NUMBER MAY BELONG TO THE FUTURE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-red-500 font-black">
              BUT THE LEGACY WILL ALWAYS BELONG TO HISTORY.&rdquo;
            </span>
          </p>
        </div>

        {/* Name Lockup */}
        <div className="mt-10">
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.2em] text-white">
            CRISTIANO RONALDO
          </h2>
          <div className="mt-2 inline-flex items-center gap-3">
            <span className="h-px w-12 bg-red-600" />
            <h3 className="font-cinzel text-base sm:text-xl font-black text-amber-400 tracking-[0.3em]">
              THE IMMORTAL NO. 7
            </h3>
            <span className="h-px w-12 bg-red-600" />
          </div>
          <p className="mt-3 text-xs tracking-[0.3em] text-zinc-500 uppercase font-mono">
            PORTUGAL SELEÇÃO · 2003 – 2026 · 234 CAPS · 146 GOALS
          </p>
        </div>

        {/* Back to Top */}
        <div className="mt-12">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold tracking-widest uppercase transition-all cursor-pointer shadow-lg hover:border-red-500/50"
          >
            <ArrowUp className="w-4 h-4 text-red-500" />
            <span>BACK TO TOP</span>
          </button>
        </div>
      </div>
    </section>
  );
};
