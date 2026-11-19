import React from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEngine';
import { Heart, Sparkles, Cake, ArrowDown } from 'lucide-react';

interface LovelyHeroProps {
  onExplore: () => void;
}

export const LovelyHero: React.FC<LovelyHeroProps> = ({ onExplore }) => {
  const triggerConfetti = () => {
    sound.playDiscoveryChime();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a', '#c084fc']
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Ambient glowing pastel gradients */}
      <div className="bg-ambient-pink-1" />
      <div className="bg-ambient-pink-2" />
      <div className="bg-ambient-peach" />

      {/* Floating cute elements */}
      <div className="absolute top-24 left-8 text-3xl animate-float opacity-75 hidden sm:block">🌸</div>
      <div className="absolute top-40 right-12 text-4xl animate-float opacity-80 hidden sm:block" style={{ animationDelay: '1.5s' }}>💖</div>
      <div className="absolute bottom-32 left-16 text-3xl animate-float opacity-75 hidden sm:block" style={{ animationDelay: '2.5s' }}>✨</div>
      <div className="absolute bottom-40 right-20 text-3xl animate-float opacity-75 hidden sm:block" style={{ animationDelay: '3s' }}>🍰</div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Cute Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
          <span>CELEBRATING THE ONE & ONLY</span>
          <span className="bg-pink-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
            VIP Sister
          </span>
        </div>

        {/* Big Heartfelt Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-slate-900 tracking-tight leading-[1.1] mb-4">
          Happy Birthday, <br />
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Aarna! 🌸✨
          </span>
        </h1>

        {/* Cringy & Sweet Sibling Nickname */}
        <div className="font-handwriting text-2xl sm:text-3xl text-pink-600 mb-6 font-bold">
          (Yes, my beloved "Pgli Gawar" who is literally like my real sister 💖)
        </div>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
          We only ever met between the 8:00 AM morning assembly and the 2:00 PM school bell, 
          yet somehow you became the most precious, chaotic, and irreplaceable person in my life. 
          Here is a little universe made just for you!
        </p>

        {/* Hero Interactive Polaroid Feature */}
        <div className="relative my-4 group">
          {/* Taped Polaroid */}
          <div className="polaroid-card w-64 sm:w-72 rotate-2 hover:rotate-0 transition-transform shadow-xl">
            <div className="polaroid-tape" />
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-pink-50">
              <img
                src="./images/memories/aarna_yellow_flower.jpg"
                alt="Aarna's Beautiful Smile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="font-handwriting text-xl text-pink-700">
                That 1000-watt smile 🌼
              </p>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                Certified: 100% Pure Gold Soul
              </span>
            </div>
          </div>

          {/* Floating Sticker Badges */}
          <div className="absolute -top-3 -right-6 bg-white px-3 py-1.5 rounded-full shadow-lg border border-pink-200 text-xs font-bold text-pink-600 rotate-12 animate-pulse-soft">
            Diva Alert! ✨
          </div>
          <div className="absolute -bottom-3 -left-6 bg-white px-3 py-1.5 rounded-full shadow-lg border border-pink-200 text-xs font-bold text-rose-600 -rotate-12">
            Desk 12 Queen 👑
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerConfetti}
            className="btn-vibrant-pink cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Shower Love & Confetti 🎉</span>
          </button>

          <button
            onClick={onExplore}
            className="btn-soft-pink cursor-pointer"
          >
            <span>Read Our Story</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Sibling Stats Ribbon */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl">
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur border border-pink-100 shadow-sm text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-pink-600 font-display">8AM - 2PM</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">School Encounter Hours</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur border border-pink-100 shadow-sm text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-rose-500 font-display">100%</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Tiffin Stolen by Her</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur border border-pink-100 shadow-sm text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-amber-500 font-display">∞</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Silent Classroom Giggles</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur border border-pink-100 shadow-sm text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-pink-600 font-display">Lifetime</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Sister Warranty ❤️</div>
          </div>
        </div>
      </div>
    </section>
  );
};
