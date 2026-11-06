import React, { useState } from 'react';
import { MILESTONES } from '../data/cr7Data';
import { Milestone } from '../types';
import { Trophy, Calendar, Award, ChevronLeft, ChevronRight, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const Timeline: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(MILESTONES[3].id); // Default to Euro 2016!
  const [filter, setFilter] = useState<'all' | 'trophy' | 'tournament' | 'debut'>('all');

  const filteredMilestones = MILESTONES.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'trophy') return m.category === 'trophy';
    if (filter === 'tournament') return m.category === 'tournament' || m.category === 'farewell';
    if (filter === 'debut') return m.category === 'debut';
    return true;
  });

  const activeMilestone: Milestone = MILESTONES.find((m) => m.id === selectedId) || MILESTONES[0];
  const currentIndex = MILESTONES.findIndex((m) => m.id === activeMilestone.id);

  const handleNext = () => {
    sound.playClick(600);
    const nextIdx = (currentIndex + 1) % MILESTONES.length;
    setSelectedId(MILESTONES[nextIdx].id);
  };

  const handlePrev = () => {
    sound.playClick(550);
    const prevIdx = (currentIndex - 1 + MILESTONES.length) % MILESTONES.length;
    setSelectedId(MILESTONES[prevIdx].id);
  };

  return (
    <section id="timeline" className="relative py-24 bg-[#060609] overflow-hidden border-t border-zinc-900">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>THE HISTORIC ARCHIVES</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-wider text-white">
            THE LEGACY <span className="text-red-500">TIMELINE</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            From his 2003 debut under Scolari to continental immortality and 146 goals for the Seleção das Quinas.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Milestones (7)' },
              { id: 'trophy', label: 'Major Trophies (3)' },
              { id: 'tournament', label: 'World Cups & Euros' },
              { id: 'debut', label: 'The Debut (2003)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  sound.playClick();
                  setFilter(f.id as typeof filter);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  filter === f.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Year Timeline Track */}
        <div className="relative mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center justify-between min-w-[700px] border-b border-zinc-800/80 px-4 pb-6">
            {MILESTONES.map((item) => {
              const isSelected = item.id === activeMilestone.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick(650);
                    setSelectedId(item.id);
                  }}
                  className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  {/* Category mini indicator */}
                  <span
                    className={`text-[10px] font-bold tracking-wider mb-2 uppercase transition-colors ${
                      isSelected ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  >
                    {item.badge}
                  </span>

                  {/* Year Node Circle */}
                  <div
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center font-bebas text-lg tracking-wider transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-red-600 to-red-800 text-white scale-110 shadow-lg shadow-red-600/50 ring-2 ring-red-400'
                        : 'bg-zinc-900 border border-zinc-700/60 text-zinc-400 group-hover:text-white group-hover:border-zinc-500'
                    }`}
                  >
                    {item.year}
                    {item.category === 'trophy' && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-400 text-black rounded-full flex items-center justify-center text-[9px] font-bold">
                        ★
                      </span>
                    )}
                  </div>

                  {/* Line anchor point */}
                  <div
                    className={`w-2 h-2 rounded-full mt-3 transition-colors ${
                      isSelected ? 'bg-red-500 shadow-sm shadow-red-500' : 'bg-zinc-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Showcase Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900/90 via-[#0e0e14] to-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-10">
          {/* Subtle Ambient Glow corresponding to milestone category */}
          <div
            className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 ${
              activeMilestone.category === 'trophy' ? 'bg-amber-500' : 'bg-red-600'
            }`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Visual Badge & Summary */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              {/* Year & Badge Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bebas text-5xl sm:text-6xl text-white tracking-wide">
                  {activeMilestone.year}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${
                    activeMilestone.category === 'trophy'
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {activeMilestone.badge}
                </span>
              </div>

              {/* Decorative Jersey Shield Artifact */}
              <div className="relative w-40 h-48 my-4 flex items-center justify-center rounded-2xl bg-gradient-to-b from-red-600 via-red-800 to-red-950 border border-red-500/40 shadow-xl shadow-red-950/60 group">
                {/* Armillary sphere / Portugal crest hint */}
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full border border-yellow-400/50 flex items-center justify-center text-[10px] text-yellow-300 font-bold">
                  FPF
                </div>
                {/* Jersey Number */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-red-200 uppercase">RONALDO</span>
                  <span className="font-bebas text-7xl text-white font-black leading-none drop-shadow-md">
                    {activeMilestone.year === 2003 ? '17' : '7'}
                  </span>
                  <span className="text-[10px] tracking-widest text-amber-300 font-semibold mt-1">CAPITÃO</span>
                </div>
              </div>

              {/* Stats Highlight Banner */}
              <div className="w-full mt-4 p-3 rounded-lg bg-black/50 border border-zinc-800">
                <div className="text-[11px] text-zinc-400 uppercase font-semibold">Match Stat Line</div>
                <div className="font-bebas text-lg text-amber-400 tracking-wider">
                  {activeMilestone.statsHighlight}
                </div>
              </div>

              {activeMilestone.opponent && (
                <div className="mt-2 text-xs text-zinc-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-400" />
                  <span>{activeMilestone.opponent}</span>
                </div>
              )}
            </div>

            {/* Right Column: Historical Narrative & Key Takeaways */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeMilestone.subtitle}
                </div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                  {activeMilestone.title}
                </h3>
                <div className="mt-2 inline-block px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-medium text-xs">
                  🏆 Achievement: {activeMilestone.achievement}
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeMilestone.description}
              </p>

              {/* Tactical Points */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Historical Context:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeMilestone.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Iconic Quote */}
              {activeMilestone.quote && (
                <div className="relative p-4 rounded-xl bg-gradient-to-r from-red-950/30 to-zinc-900/60 border-l-4 border-red-500 italic text-zinc-300 text-xs sm:text-sm">
                  <Quote className="w-4 h-4 text-red-400 mb-1 inline mr-1 opacity-75" />
                  {activeMilestone.quote}
                </div>
              )}

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Milestone
                </button>

                <div className="text-xs text-zinc-500 font-mono">
                  {currentIndex + 1} / {MILESTONES.length}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md shadow-red-900/30"
                >
                  Next Milestone
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
