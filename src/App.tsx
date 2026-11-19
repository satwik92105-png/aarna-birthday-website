import React, { useState } from 'react';
import { LovelyNavbar } from '@/components/Header/LovelyNavbar';
import { LovelyHero } from '@/components/Hero/LovelyHero';
import { Desk12Story } from '@/components/SchoolBond/Desk12Story';
import { ScrapbookWall } from '@/components/Scrapbook/ScrapbookWall';
import { SisterFunZone } from '@/components/InteractiveFun/SisterFunZone';
import { EmotionalLetter } from '@/components/Letter/EmotionalLetter';
import { SisterCertificate } from '@/components/Certificate/SisterCertificate';
import { sound } from '@/utils/soundEngine';

export const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      sound.stopPianoSoundtrack();
      sound.setMuted(true);
      setIsMusicPlaying(false);
    } else {
      sound.setMuted(false);
      sound.startPianoSoundtrack();
      setIsMusicPlaying(true);
    }
  };

  const scrollToBond = () => {
    const el = document.getElementById('bond');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fff5f7] text-[#4c0519] relative selection:bg-pink-500 selection:text-white">
      {/* Top Floating Pink Navigation */}
      <LovelyNavbar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      <main className="w-full">
        {/* 1. Lovely Hero Section */}
        <LovelyHero onExplore={scrollToBond} />

        {/* 2. School Friend to Sister Bond Story */}
        <Desk12Story />

        {/* 3. Photo Scrapbook (All 12+ real photos scattered with popups) */}
        <ScrapbookWall />

        {/* 4. Interactive Cake Cutting & Sister Fact Generator */}
        <SisterFunZone />

        {/* 5. The Emotional Brother-Sister Letter (Happy tears guaranteed) */}
        <EmotionalLetter />

        {/* 6. Sister of the Century Award Certificate */}
        <SisterCertificate />
      </main>
    </div>
  );
};

export default App;
