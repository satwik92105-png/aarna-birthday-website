import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEngine';
import { Sparkles, Heart, Cake, Wand2, RefreshCw } from 'lucide-react';

const FUN_FACTS = [
  "Fact #1: Aarna's ability to create high-octane drama out of thin air is officially recognized by UNESCO. 🏆",
  "Fact #2: Scientists confirm Desk 12 had an 80% higher laughter rate solely because of Aarna's expressions. 🔬",
  "Fact #3: If ditching plans was an Olympic sport, Aarna would bring home 47 gold medals for India. 🥇",
  "Fact #4: Warning: Extremely dangerous when hungry. Keep tiffin boxes at a minimum safe distance of 5 meters. 🥪",
  "Fact #5: She acts like the biggest 'pgli gawar', but she secretly possesses the purest, most caring heart ever. 💖",
  "Fact #6: Having Aarna as a sister is proof that God knew life would be boring without a chaotic angel. ✨",
  "Fact #7: One telepathic glance across a classroom can destroy an entire serious exam mood in 0.2 seconds. 👀",
  "Fact #8: She is certified 1000/10 in fashion, 100/10 in jokes, and 10000/10 in sisterhood loyalty. 👑"
];

export const SisterFunZone: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const handleBlowCandles = () => {
    sound.playDiscoveryChime();
    setCandlesBlown(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fef08a']
    });
  };

  const handleCutCake = () => {
    sound.playAccessGranted();
    setCakeCut(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#c084fc']
    });
  };

  const handleNextFact = () => {
    sound.playMechanicalKey();
    setCurrentFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
  };

  return (
    <section id="cake" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* INTERACTIVE BIRTHDAY CAKE */}
        <div className="lovely-card p-8 sm:p-10 flex flex-col items-center justify-between text-center relative overflow-hidden bg-gradient-to-b from-white to-pink-50/60">
          <div className="w-full">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3.5 py-1 rounded-full">
              INTERACTIVE CELEBRATION
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3">
              Blow The Candles & Cut The Cake! 🎂
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Make your biggest wish for this year. Desk 12 magic guarantees it will come true!
            </p>
          </div>

          {/* Interactive Cake Visual */}
          <div className="my-10 relative flex flex-col items-center select-none">
            {/* Candle Flames */}
            <div className="flex items-center gap-6 mb-1">
              {[1, 2, 3].map((c) => (
                <div key={c} className="flex flex-col items-center">
                  {!candlesBlown ? (
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-white shadow-[0_0_15px_#f59e0b] animate-bounce" />
                  ) : (
                    <div className="w-1 h-3 bg-slate-300 rounded" />
                  )}
                  <div className="w-2.5 h-7 bg-pink-400 rounded-t" />
                </div>
              ))}
            </div>

            {/* Cake Tiers */}
            <div className="relative">
              {/* Top Tier */}
              <div className="w-36 h-14 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-t-2xl border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-xs font-handwriting font-bold text-white text-base">
                  {candlesBlown ? '✨ Wished ✨' : 'Aarna 💖'}
                </span>
              </div>
              {/* Bottom Tier */}
              <div className="w-52 h-20 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center -mt-2">
                <span className="font-display font-bold text-white tracking-widest text-xs">
                  {cakeCut ? '🍰 SLICE SERVED!' : 'HAPPY BIRTHDAY'}
                </span>
              </div>
              {/* Cake Stand Plate */}
              <div className="w-60 h-4 bg-slate-200 rounded-full mx-auto -mt-1 shadow-sm border border-slate-300" />
            </div>
          </div>

          {/* Cake Interaction Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                className="btn-vibrant-pink w-full sm:w-auto text-xs py-3 px-6 cursor-pointer"
              >
                <span>Blow The Candles 💨</span>
              </button>
            ) : !cakeCut ? (
              <button
                onClick={handleCutCake}
                className="btn-vibrant-pink w-full sm:w-auto text-xs py-3 px-6 cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500"
              >
                <span>Cut A Huge Slice 🍰</span>
              </button>
            ) : (
              <div className="text-pink-600 font-bold font-handwriting text-2xl animate-pulse">
                🎉 Best Birthday Ever! Slice belongs to Aarna! 💖
              </div>
            )}
          </div>
        </div>

        {/* SISTER COMPLIMENT & ROAST GENERATOR */}
        <div className="lovely-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white to-rose-50/50">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-3.5 py-1 rounded-full">
                SIBLING TRUTH GENERATOR
              </span>
              <Wand2 className="w-5 h-5 text-pink-500" />
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              The Official Aarna Fact Machine 🎰
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Verified by Desk 12 faculty and 100% certified by her brother.
            </p>

            {/* Fact Output Box */}
            <div className="my-8 p-6 rounded-2xl bg-white border border-pink-200 shadow-inner flex flex-col justify-center min-h-[160px]">
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 leading-snug">
                "{FUN_FACTS[currentFactIndex]}"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-pink-100">
            <span className="text-xs font-mono text-slate-400">
              Fact {currentFactIndex + 1} of {FUN_FACTS.length}
            </span>
            <button
              onClick={handleNextFact}
              className="btn-vibrant-pink text-xs py-2.5 px-5 cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Truth / Roast 🎲</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
