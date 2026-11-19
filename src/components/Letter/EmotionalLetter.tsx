import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEngine';
import { getMemoryImage } from '@/utils/assets';
import { Heart, Sparkles, Smile, ArrowRight } from 'lucide-react';

export const EmotionalLetter: React.FC = () => {
  const [tissueCount, setTissueCount] = useState(0);
  const [showHugModal, setShowHugModal] = useState(false);

  const handleWipeTears = () => {
    sound.playDiscoveryChime();
    setTissueCount((c) => c + 1);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
    });
  };

  const handleOpenHug = () => {
    sound.playDiscoveryChime();
    setShowHugModal(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffffff', '#fed7aa']
    });
  };

  return (
    <section id="letter" className="py-24 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
          FROM THE BOTTOM OF MY HEART 💌
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
          To My Dearest Sister, Aarna ❤️
        </h2>
        <p className="font-handwriting text-2xl text-pink-600 mt-2">
          "We never hung out outside school walls, yet you became my real sister."
        </p>
      </div>

      {/* The Parchment Letter Container */}
      <div className="lovely-card p-8 sm:p-14 border-pink-200 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white via-[#fffdfa] to-pink-50/40">
        {/* Soft Decorative Watermark */}
        <div className="absolute top-10 right-10 text-8xl opacity-5 pointer-events-none select-none">
          💖
        </div>

        {/* Authentic Taped Polaroid: Raw Forehead Dot Video Call Screenshot */}
        <div className="mb-8 sm:float-right sm:ml-8 sm:mb-6 w-full sm:w-60 p-3 bg-white border border-pink-200 rounded-2xl shadow-xl rotate-2 hover:rotate-0 transition-transform">
          <div className="w-full aspect-[9/16] bg-black rounded-xl overflow-hidden">
            <img
              src={getMemoryImage('aarna_school_call_raw.png')}
              alt="Aarna Online Class Raw Screenshot"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-[10px] font-mono font-bold text-pink-600 block uppercase tracking-wider">
              Desk 12 Sacred Relic
            </span>
            <p className="font-handwriting text-base font-bold text-slate-800 mt-0.5">
              Forehead dots & pure gold soul ✨
            </p>
          </div>
        </div>

        {/* Letter Text */}
        <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-sans">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-pink-700">
            Dearest Aarna,
          </h3>

          <p>
            I know 99% of our time in school was spent pulling each other's legs, fighting over stationary, stealing lunchboxes, and pretending we were way too cool to ever say anything sentimental. But today, on your birthday, I am keeping all the jokes and teasing aside to tell you something straight from the most honest corner of my heart.
          </p>

          <p>
            In movies, people always show best friendships starting from late-night party hangouts, cafe trips, or weekend road trips. <strong>We never had that.</strong> We never spent time together outside school gates. When the 2:00 PM dismissal bell rang, we packed our bags and went to our separate homes.
          </p>

          <blockquote className="p-4 sm:p-5 rounded-2xl bg-pink-100/60 border-l-4 border-pink-500 font-display font-semibold text-pink-900 text-lg sm:text-xl leading-relaxed italic">
            "And yet, in those six short hours between the morning assembly and the dismissal bell, you gave me something I never expected to find in a classroom: A real sister. A confidante. A sanctuary."
          </blockquote>

          <p>
            You honestly have no idea how much I genuinely loved talking to you every single day. Whenever school felt boring, stressful, or overwhelming, just sitting next to you at Desk 12, whispering stupid jokes, or watching your hilarious dramatic facial expressions was enough to completely fix my day.
          </p>

          <p>
            Just look at that video call picture on the right—anyone else might have hidden it or felt conscious about marker dots on their forehead. But you wore it with pride, smiled from ear to ear, and didn't care what anyone thought. That is who you are: completely genuine, unapologetically fun, and overflowing with positive energy.
          </p>

          <p>
            School days may end and life will take us into different colleges, careers, and cities. But I want you to remember this forever: <strong>you will always have a brother standing in your corner.</strong> Someone who is endlessly proud of you, who will celebrate every single achievement of yours, who will scold you when you act like a 'pgli gawar', and who will always protect and cherish you.
          </p>

          {/* Signature */}
          <div className="pt-8 border-t border-pink-200">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
              Forever your school benchmate, protector, and brother,
            </span>
            <span className="font-handwriting text-3xl sm:text-4xl text-pink-600 block mt-2 font-bold">
              Your Crime Partner Forever ❤️
            </span>
          </div>
        </div>

        {/* Emotional Action Dock */}
        <div className="mt-12 pt-8 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleWipeTears}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-pink-50 border border-pink-300 text-xs font-semibold text-pink-700 hover:bg-pink-100 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span>Wipe Happy Tears (Virtual Tissue)</span>
            <span>🤧 {tissueCount > 0 ? `(${tissueCount})` : ''}</span>
          </button>

          <button
            onClick={handleOpenHug}
            className="btn-vibrant-pink w-full sm:w-auto py-3 px-8 text-xs cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Receive The Biggest Sister Hug</span>
          </button>
        </div>
      </div>

      {/* FULL-SCREEN VIRTUAL HUG MODAL */}
      {showHugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-md w-full rounded-3xl bg-white p-8 sm:p-10 text-center shadow-2xl border-2 border-pink-300">
            <div className="text-6xl mb-4 animate-bounce">🫂💖✨</div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-2">
              The Biggest Sister Hug Ever!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
              No matter how big the world gets, you are my little sister forever. 
              Always stay this happy, this dramatic, and this precious. You are loved beyond measure!
            </p>
            <button
              onClick={() => setShowHugModal(false)}
              className="btn-vibrant-pink w-full py-3 text-xs uppercase tracking-wider cursor-pointer"
            >
              Feeling Deeply Loved & Happy 🥰
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
