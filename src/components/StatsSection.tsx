import React, { useState, useEffect } from 'react';
import { INTERNATIONAL_STATS, CLUB_STATS_COMPARISON } from '../data/cr7Data';
import { Trophy, Award, Flame, Globe2, Shield, BarChart3, Star, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export const StatsSection: React.FC = () => {
  const [mode, setMode] = useState<'international' | 'comparison'>('international');
  const [animated, setAnimated] = useState(false);

  // Trigger count-up animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('numbers');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="numbers" className="relative py-24 bg-[#040407] overflow-hidden border-t border-zinc-900">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>VERIFIED HISTORICAL DATA</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-wider text-white">
            THE NUMBERS OF <span className="text-red-500">AN IMMORTAL</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Verified international milestones with the Portugal national team, officially ratified by FIFA and UEFA.
          </p>

          {/* Mode Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => {
                sound.playClick();
                setMode('international');
              }}
              className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                mode === 'international'
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>International Career (Portugal)</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMode('comparison');
              }}
              className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                mode === 'comparison'
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Seleção vs Club Comparison</span>
            </button>
          </div>
        </div>

        {/* View 1: Primary International Milestones (Required 5 Key Stats) */}
        {mode === 'international' && (
          <div>
            {/* The 5 Key Figures Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {/* Appearances */}
              <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/40 transition-all text-center flex flex-col justify-between">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-xl bg-red-600/10 text-red-400">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-5xl sm:text-6xl text-white tracking-wider">
                    {animated ? INTERNATIONAL_STATS.caps : '0'}
                  </div>
                  <div className="text-xs font-bold text-red-400 uppercase tracking-widest mt-1">Appearances</div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">All-time men&apos;s world record caps</p>
              </div>

              {/* Goals */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-red-950/40 to-zinc-900/80 border border-red-500/50 hover:border-red-400 transition-all text-center flex flex-col justify-between shadow-xl shadow-red-950/30">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-md">
                    <Flame className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-5xl sm:text-6xl text-amber-400 tracking-wider">
                    {animated ? INTERNATIONAL_STATS.goals : '0'}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-widest mt-1">International Goals</div>
                </div>
                <p className="text-[11px] text-zinc-400 mt-2">All-time world scoring record</p>
              </div>

              {/* World Cups */}
              <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/40 transition-all text-center flex flex-col justify-between">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-amber-400">
                    <Globe2 className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-5xl sm:text-6xl text-white tracking-wider">
                    {animated ? INTERNATIONAL_STATS.worldCups : '0'}
                  </div>
                  <div className="text-xs font-bold text-yellow-500 uppercase tracking-widest mt-1">FIFA World Cups</div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">Scored across 5 distinct editions</p>
              </div>

              {/* Euro Championships */}
              <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/40 transition-all text-center flex flex-col justify-between">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Trophy className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-5xl sm:text-6xl text-white tracking-wider">
                    {animated ? INTERNATIONAL_STATS.euroTitles : '0'}
                  </div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1">European Championship</div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">Historic Euro 2016 triumph</p>
              </div>

              {/* Nations League */}
              <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/40 transition-all text-center flex flex-col justify-between">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-5xl sm:text-6xl text-white tracking-wider">
                    {animated ? INTERNATIONAL_STATS.nationsLeagueTitles : '0'}
                  </div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mt-1">Nations League Titles</div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">2019 & 2025 Champion</p>
              </div>
            </div>

            {/* Additional Verified Breakdown & World Records */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Goal Scoring Method Breakdown */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <h3 className="font-bebas text-xl text-white tracking-wider mb-4 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>HOW THE 146 GOALS WERE SCORED</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-zinc-300 font-semibold mb-1">
                      <span>Right Foot</span>
                      <span className="font-mono text-amber-400">84 Goals (58%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full" style={{ width: '58%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-zinc-300 font-semibold mb-1">
                      <span>Aerial / Headers</span>
                      <span className="font-mono text-amber-400">31 Goals (21%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '21%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-zinc-300 font-semibold mb-1">
                      <span>Left Foot</span>
                      <span className="font-mono text-amber-400">31 Goals (21%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '21%' }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between text-xs text-zinc-400">
                    <span>Direct Free-Kicks: <strong className="text-white">11</strong></span>
                    <span>Hat-Tricks: <strong className="text-white">10</strong></span>
                    <span>Assists: <strong className="text-white">45</strong></span>
                  </div>
                </div>
              </div>

              {/* Verified World Records List */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <h3 className="font-bebas text-xl text-white tracking-wider mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>GUINNESS & UEFA VERIFIED WORLD RECORDS</span>
                </h3>

                <div className="space-y-2.5">
                  {INTERNATIONAL_STATS.records.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: International vs Club Comparison */}
        {mode === 'comparison' && (
          <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                PERSPECTIVE & SCALE
              </span>
              <h3 className="font-bebas text-3xl text-white tracking-wider mt-1">
                PORTUGAL DUTY VS CLUB EMPIRES
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                While club teams sign foreign superstars, international football represents pure national grit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* International Portugal */}
              <div className="p-6 rounded-xl bg-red-950/30 border border-red-500/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-bebas text-xl text-white">
                    POR
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-white">PORTUGAL NATIONAL TEAM</h4>
                    <p className="text-xs text-red-300">2003 – 2026 (23 Years of Service)</p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">Total Caps:</span>
                    <span className="font-bold text-white">234</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">International Goals:</span>
                    <span className="font-bold text-amber-400">146 (World Record)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">Major Senior Trophies:</span>
                    <span className="font-bold text-emerald-400">3 (Euro 16, NL 19, NL 25)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">World Cup Tournaments:</span>
                    <span className="font-bold text-white">6</span>
                  </div>
                </div>
              </div>

              {/* Club Career */}
              <div className="p-6 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center font-bebas text-xl text-amber-400">
                    CLUB
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-white">COMBINED CLUB CAREER</h4>
                    <p className="text-xs text-zinc-400">Sporting, Man Utd, Real Madrid, Juventus, Al Nassr</p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">Club Appearances:</span>
                    <span className="font-bold text-white">{CLUB_STATS_COMPARISON.appearances}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">Club Goals:</span>
                    <span className="font-bold text-white">{CLUB_STATS_COMPARISON.goals}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">UEFA Champions Leagues:</span>
                    <span className="font-bold text-amber-400">{CLUB_STATS_COMPARISON.championsLeagueTitles} Titles</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-black/40">
                    <span className="text-zinc-400">Ballon d&apos;Or Trophies:</span>
                    <span className="font-bold text-amber-400">{CLUB_STATS_COMPARISON.ballonDors}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
