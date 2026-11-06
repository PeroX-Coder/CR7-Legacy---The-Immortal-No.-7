import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Trophy, Sparkles, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onSecretTrigger: () => void;
  secretClicks: number;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSecretTrigger, secretClicks, onNavigate }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      sound.playClick(800);
      sound.startStadiumAtmosphere();
    }
  };

  const navItems = [
    { label: 'TIMELINE', id: 'timeline' },
    { label: 'NO. 7 CHALLENGE', id: 'challenge', highlight: true },
    { label: 'MENTALITY', id: 'mentality' },
    { label: 'THE NUMBERS', id: 'numbers' },
    { label: 'CLOSING', id: 'closing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070a]/90 backdrop-blur-md border-b border-red-950/40 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('hero')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-950 border border-red-500/30 shadow-lg shadow-red-900/30">
            <span className="font-bebas text-2xl font-bold tracking-wider text-white">CR7</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bebas text-xl tracking-widest text-white">THE IMMORTAL</span>
              <span className="font-cinzel text-lg font-black text-amber-400">NO. 7</span>
            </div>
            <p className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium">Portugal Tribute</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onNavigate(item.id);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200 cursor-pointer ${
                item.highlight
                  ? 'bg-red-600/20 text-red-400 border border-red-500/40 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-md shadow-red-950/50'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {item.highlight && <Flame className="w-3.5 h-3.5 text-red-400" />}
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Quick Actions: Audio Toggle & Secret Tracker */}
        <div className="flex items-center space-x-3">
          {/* Secret 7 Counter tracker button */}
          <button
            onClick={() => {
              onSecretTrigger();
            }}
            title="Click the 7 seven times to reveal the secret tribute"
            className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-yellow-500/20 hover:border-yellow-400/60 transition-all text-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="font-bebas text-amber-300 text-sm tracking-widest">
              #7 <span className="text-[10px] text-zinc-400">({secretClicks}/7)</span>
            </span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound"
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-2 ${
              isMuted
                ? 'bg-zinc-900/80 border-zinc-700/50 text-zinc-500 hover:text-zinc-300'
                : 'bg-red-950/40 border-red-500/40 text-red-400 shadow-lg shadow-red-950/40'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />}
            <span className="hidden sm:inline text-[11px] font-semibold tracking-wider">
              {isMuted ? 'SOUND OFF' : 'STADIUM ON'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
