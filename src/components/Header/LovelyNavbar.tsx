import React from 'react';
import { sound } from '@/utils/soundEngine';
import { Heart, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface LovelyNavbarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const LovelyNavbar: React.FC<LovelyNavbarProps> = ({ isMusicPlaying, onToggleMusic }) => {
  const scrollTo = (id: string) => {
    sound.playDiscoveryChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl px-4 sm:px-6 py-3 rounded-full bg-white/85 backdrop-blur-md border border-pink-200 shadow-[0_8px_30px_rgba(244,63,94,0.12)] flex items-center justify-between transition-all">
      {/* Cute Brand / Nickname */}
      <div 
        onClick={() => scrollTo('hero')} 
        className="flex items-center gap-2 cursor-pointer group select-none"
      >
        <span className="text-xl group-hover:scale-125 transition-transform">🌸</span>
        <span className="font-display font-bold text-base sm:text-lg bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
          Aarna's Day
        </span>
        <span className="hidden md:inline-block text-[11px] font-handwriting text-pink-500 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
          pgli gawar 💖
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex items-center gap-1 md:gap-2 text-xs font-semibold text-slate-600">
        <button 
          onClick={() => scrollTo('bond')} 
          className="px-3 py-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          Our Bond ✨
        </button>
        <button 
          onClick={() => scrollTo('scrapbook')} 
          className="px-3 py-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          Photos 📸
        </button>
        <button 
          onClick={() => scrollTo('cake')} 
          className="px-3 py-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          Cut Cake 🎂
        </button>
        <button 
          onClick={() => scrollTo('letter')} 
          className="px-3 py-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          My Letter 💌
        </button>
        <button 
          onClick={() => scrollTo('certificate')} 
          className="px-3 py-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          Award 🏆
        </button>
      </div>

      {/* Music Toggle Pill */}
      <button
        onClick={onToggleMusic}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm ${
          isMusicPlaying
            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-300'
            : 'bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100'
        }`}
      >
        {isMusicPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
        <span className="hidden xs:inline">{isMusicPlaying ? 'Music: Playing 🎵' : 'Play Music'}</span>
      </button>
    </nav>
  );
};
