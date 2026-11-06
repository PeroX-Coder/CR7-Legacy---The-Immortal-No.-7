import React, { useEffect } from 'react';
import { X, Sparkles, Heart, Trophy, Quote, Share2 } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretModal: React.FC<SecretModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      sound.playSecretUnlock();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.4 },
          colors: ['#E42518', '#EAB308', '#10B981', '#FFFFFF'],
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#13111a] via-[#09080d] to-[#040407] border border-amber-500/50 shadow-[0_0_80px_rgba(234,179,8,0.25)] p-6 sm:p-10 overflow-hidden text-center">
        {/* Golden Aura Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Secret Badge Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>SECRET ARTIFACT UNLOCKED · 7/7 TAPS</span>
        </div>

        {/* Golden Number 7 Icon */}
        <div className="relative w-24 h-24 mx-auto my-3 flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-600 to-amber-900 shadow-xl shadow-amber-900/40 border border-yellow-300/40">
          <span className="font-bebas text-6xl text-white font-black drop-shadow-md">7</span>
          <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-black text-[9px] font-bold text-amber-300 tracking-widest border border-amber-500/30">
            ETERNO
          </span>
        </div>

        {/* Required Headline */}
        <h2 className="font-bebas text-3xl sm:text-5xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mt-2">
          &ldquo;LEGENDS NEVER REALLY SAY GOODBYE.&rdquo;
        </h2>

        <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-zinc-300 uppercase mt-2">
          AN EMOTIONAL TRIBUTE TO THE PORTUGAL NO. 7
        </p>

        {/* Touching Poetic Letter */}
        <div className="my-6 p-5 sm:p-6 rounded-2xl bg-black/60 border border-zinc-800/80 text-left text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-3 font-normal max-h-[300px] overflow-y-auto">
          <p>
            To the skinny kid with braces and blond streaks from Santo António, Funchal, who landed in Lisbon with a cardboard suitcase and a dream too vast for the Atlantic Ocean:
          </p>
          <p>
            You didn&apos;t just wear the red and green jersey of Portugal—you carried the beating heart of ten million people across twenty-three unforgettable years. You gave us Paris on that July night in 2016, limping along the touchline, coaching with tears in your eyes, demanding nothing less than immortality.
          </p>
          <p>
            You gave us the free-kick against Spain in Sochi. The Porto hat-trick against Switzerland. The 146 times you made the world stop, run to the corner flag, leap into the heavens, and roar: <strong className="text-amber-400 font-bold">&ldquo;SIUUU!&rdquo;</strong>
          </p>
          <p className="italic text-zinc-400 border-t border-zinc-800 pt-3">
            The shirt will be worn by others. Future stars will inherit the squad list. But there will only ever be one Cristiano Ronaldo dos Santos Aveiro.
          </p>
        </div>

        {/* Commemorative Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>Obrigado, Capitão · Para Sempre Nosso 7</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bebas text-base tracking-wider uppercase hover:brightness-110 transition-all font-bold cursor-pointer"
          >
            RETURN TO ARCHIVES
          </button>
        </div>
      </div>
    </div>
  );
};
