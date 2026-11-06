import React, { useState, useEffect } from 'react';
import { MENTALITY_PRINCIPLES, DAILY_CHALLENGES } from '../data/cr7Data';
import { MentalityPrinciple, DailyChallenge } from '../types';
import { ShieldCheck, Repeat, Flame, Sparkles, Trophy, Shuffle, CheckCircle, Quote, Dumbbell } from 'lucide-react';
import { sound } from '../utils/audio';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Repeat: Repeat,
  Flame: Flame,
  Sparkles: Sparkles,
  Trophy: Trophy,
};

export const MentalityRoom: React.FC = () => {
  const [activePrincipleId, setActivePrincipleId] = useState<string>(MENTALITY_PRINCIPLES[0].id);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>(DAILY_CHALLENGES[0]);
  const [isCompletedToday, setIsCompletedToday] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(1);

  // Load streak from localStorage
  useEffect(() => {
    try {
      const savedStreak = localStorage.getItem('cr7_mentality_streak');
      if (savedStreak) setStreakCount(parseInt(savedStreak, 10));

      const lastCompletedDate = localStorage.getItem('cr7_challenge_completed_date');
      const today = new Date().toDateString();
      if (lastCompletedDate === today) {
        setIsCompletedToday(true);
      }
    } catch {}
  }, []);

  const handleRollChallenge = () => {
    sound.playClick(750);
    const available = DAILY_CHALLENGES.filter((c) => c.id !== dailyChallenge.id);
    const randomChallenge = available[Math.floor(Math.random() * available.length)];
    setDailyChallenge(randomChallenge);
    setIsCompletedToday(false);
  };

  const handleAcceptChallenge = () => {
    sound.playMentalityChime();
    setIsCompletedToday(true);
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);

    try {
      localStorage.setItem('cr7_mentality_streak', newStreak.toString());
      localStorage.setItem('cr7_challenge_completed_date', new Date().toDateString());
    } catch {}
  };

  const activePrinciple = MENTALITY_PRINCIPLES.find((p) => p.id === activePrincipleId) || MENTALITY_PRINCIPLES[0];
  const IconComponent = iconMap[activePrinciple.icon as keyof typeof iconMap] || ShieldCheck;

  return (
    <section id="mentality" className="relative py-24 bg-[#050508] overflow-hidden border-t border-zinc-900">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>THE CR7 PSYCHOLOGY</span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl tracking-wider text-white">
            &ldquo;IT&apos;S NOT ABOUT TALENT. <span className="text-red-500">IT&apos;S ABOUT THE WORK.&rdquo;</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            The five foundational pillars that transformed a young boy from Madeira into football&apos;s greatest international immortal.
          </p>
        </div>

        {/* 5 Principles Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {MENTALITY_PRINCIPLES.map((principle) => {
            const isSelected = principle.id === activePrinciple.id;
            const PIcon = iconMap[principle.icon as keyof typeof iconMap] || ShieldCheck;
            return (
              <button
                key={principle.id}
                onClick={() => {
                  sound.playClick(620);
                  setActivePrincipleId(principle.id);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-red-950/80 to-zinc-900 border-red-500/70 shadow-lg shadow-red-950/50 scale-[1.02]'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`}>
                    {principle.number}
                  </span>
                  <PIcon className={`w-5 h-5 ${isSelected ? 'text-red-400' : 'text-zinc-500'}`} />
                </div>
                <div>
                  <h3 className={`font-bebas text-lg tracking-wider ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {principle.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{principle.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Principle Presentation Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900/90 via-[#0a0a0f] to-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Number & Core Rule */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-black/60 border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="font-bebas text-6xl text-red-500">{activePrinciple.number}</span>
                <div className="p-3 rounded-xl bg-red-600/10 border border-red-500/30">
                  <IconComponent className="w-8 h-8 text-red-400" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-bold tracking-widest text-amber-400 uppercase">THE CR7 RULE:</div>
                <p className="font-bebas text-xl text-white tracking-wide mt-1 leading-snug">
                  {activePrinciple.actionRule}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <div className="text-[11px] text-zinc-500 uppercase font-semibold">Core Habit Architecture</div>
                <ul className="mt-2 space-y-2">
                  {activePrinciple.keyHabits.map((habit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{habit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Deep Explanation & Motivational Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                  PRINCIPLE {activePrinciple.number}
                </span>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                  {activePrinciple.title}
                </h3>
                <p className="text-amber-400 font-medium text-xs mt-0.5 tracking-wider uppercase">
                  {activePrinciple.subtitle}
                </p>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activePrinciple.description}
              </p>

              {/* Quote Box */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-red-950/40 via-zinc-900/60 to-transparent border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-cinzel text-base sm:text-lg text-white font-bold italic leading-snug">
                    {activePrinciple.quote}
                  </p>
                </div>
                <div className="mt-2 text-right text-xs text-zinc-400 font-mono tracking-widest">
                  — CRISTIANO RONALDO DOS SANTOS AVEIRO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Mentality Challenge Module */}
        <div className="rounded-2xl bg-gradient-to-r from-zinc-900 via-red-950/30 to-zinc-900 border border-red-500/30 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/20 text-red-300 text-xs font-bold tracking-widest uppercase">
                <Dumbbell className="w-3.5 h-3.5 text-red-400" />
                <span>DAILY DISCIPLINE PROTOCOL</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-zinc-900 text-amber-400 font-mono text-[10px]">
                  STREAK: {streakCount} DAYS
                </span>
              </div>
              <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                {dailyChallenge.title}
              </h3>
              <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
                {dailyChallenge.challenge}
              </p>
              <div className="text-xs text-amber-300/90 italic pt-1">
                {dailyChallenge.ronaldoInsight}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row md:flex-col items-center gap-3 shrink-0">
              <button
                onClick={handleAcceptChallenge}
                disabled={isCompletedToday}
                className={`px-6 py-3 rounded-xl font-bebas text-base tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  isCompletedToday
                    ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isCompletedToday ? 'ACCEPTED TODAY ✓' : 'ACCEPT PROTOCOL'}</span>
              </button>

              <button
                onClick={handleRollChallenge}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>ROLL ANOTHER</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
