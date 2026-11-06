import React from 'react';
import { Heart, Trophy, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020204] border-t border-zinc-900/80 py-10 text-center text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-red-600/20 border border-red-500/40 flex items-center justify-center font-bebas text-sm text-red-400">
            7
          </div>
          <span className="font-bebas text-base text-zinc-300 tracking-wider">CR7 LEGACY</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[11px] text-zinc-400">The Immortal No. 7</span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>Crafted in tribute to the Seleção das Quinas</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          <span>Madeira to the World</span>
        </div>

        <div className="text-[11px] font-mono text-zinc-600">
          Euro 2016 · Nations League 2019 & 2025 · 146 Goals
        </div>
      </div>
    </footer>
  );
};
