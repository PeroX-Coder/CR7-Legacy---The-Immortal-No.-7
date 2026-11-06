/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { GameChallenge } from './components/GameChallenge';
import { MentalityRoom } from './components/MentalityRoom';
import { StatsSection } from './components/StatsSection';
import { ClosingSection } from './components/ClosingSection';
import { Footer } from './components/Footer';
import { SecretModal } from './components/SecretModal';
import { sound } from './utils/audio';

export default function App() {
  const [secretClicks, setSecretClicks] = useState<number>(0);
  const [isSecretOpen, setIsSecretOpen] = useState<boolean>(false);

  // Load previously saved secret clicks or achievement
  useEffect(() => {
    try {
      const savedClicks = localStorage.getItem('cr7_secret_clicks');
      if (savedClicks) setSecretClicks(parseInt(savedClicks, 10));
    } catch {}
  }, []);

  const handleSecretClick = () => {
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next >= 7) {
        setIsSecretOpen(true);
        try {
          localStorage.setItem('cr7_secret_clicks', '7');
        } catch {}
        return 7;
      }
      try {
        localStorage.setItem('cr7_secret_clicks', next.toString());
      } catch {}
      return next;
    });
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f3f4f6] font-montserrat selection:bg-[#E42518] selection:text-white">
      {/* Floating Glass Navigation */}
      <Navbar
        onSecretTrigger={handleSecretClick}
        secretClicks={secretClicks}
        onNavigate={handleNavigate}
      />

      {/* Hero Landing Experience */}
      <Hero
        onEnterLegacy={() => handleNavigate('timeline')}
        onSecretClick={handleSecretClick}
        secretClicks={secretClicks}
      />

      {/* Interactive Career Timeline Museum (2003–2026) */}
      <Timeline />

      {/* Playable Football Challenge (60s Match) */}
      <GameChallenge />

      {/* The Mentality Room (5 Principles & Daily Protocol) */}
      <MentalityRoom />

      {/* Verified Numbers & Statistics */}
      <StatsSection />

      {/* Cinematic Farewell Closing */}
      <ClosingSection />

      {/* Footer */}
      <Footer />

      {/* Hidden Secret Tribute Screen (Triggered by 7 clicks on No. 7) */}
      <SecretModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
      />
    </div>
  );
}
