import React from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEngine';
import { Award, Printer, Sparkles, Heart } from 'lucide-react';

export const SisterCertificate: React.FC = () => {
  const handlePrint = () => {
    sound.playDiscoveryChime();
    window.print();
  };

  const handleCelebrate = () => {
    sound.playAccessGranted();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#f59e0b', '#ec4899', '#ffffff']
    });
  };

  return (
    <section id="certificate" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
          OFFICIAL SIBLING KEEPSAKE 🏆
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
          Sister of the Century Award
        </h2>
        <p className="text-slate-600 mt-2 text-base sm:text-lg">
          Issued by Desk 12 • Valid across all universes for infinite lifetimes
        </p>
      </div>

      {/* The Printable Certificate Deed Card */}
      <div className="p-8 sm:p-14 rounded-3xl bg-white border-4 border-pink-300 shadow-2xl relative text-left overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-white">
        {/* Certificate Golden Corner Accents */}
        <div className="absolute top-3 left-3 text-2xl text-pink-300">🌸</div>
        <div className="absolute top-3 right-3 text-2xl text-pink-300">🌸</div>
        <div className="absolute bottom-3 left-3 text-2xl text-pink-300">🌸</div>
        <div className="absolute bottom-3 right-3 text-2xl text-pink-300">🌸</div>

        {/* Certificate Header */}
        <div className="text-center pb-8 border-b-2 border-pink-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 mx-auto flex items-center justify-center text-3xl text-white shadow-lg mb-3">
            🏆
          </div>
          <span className="font-mono text-xs font-bold text-pink-600 tracking-widest uppercase">
            CERTIFICATE OF PERPETUAL SISTERHOOD
          </span>
          <h3 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mt-1">
            Presented to Aarna
          </h3>
          <p className="font-handwriting text-2xl text-pink-600 mt-1 font-bold">
            (Officially and affectionately known as "PGli Gawar")
          </p>
        </div>

        {/* Credentials Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-5 rounded-2xl bg-pink-50/80 border border-pink-100 text-xs">
          <div>
            <span className="text-slate-400 uppercase font-mono block text-[10px]">RECIPIENT</span>
            <span className="font-bold text-slate-900 text-sm">Aarna</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono block text-[10px]">TIME ENCOUNTER</span>
            <span className="font-bold text-pink-600 text-sm">08:00 AM — 02:00 PM</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono block text-[10px]">OFFICIAL ROLE</span>
            <span className="font-bold text-slate-900 text-sm">Sister For Life</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono block text-[10px]">STATUS</span>
            <span className="font-bold text-amber-600 text-sm">Irreplaceable ❤️</span>
          </div>
        </div>

        {/* The Brother's Pledge on the Deed */}
        <div className="space-y-3 my-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            This deed certifies that despite never spending time outside school premises, Aarna has successfully achieved the highest possible rank of <strong>Real Sister</strong>.
          </p>
          <p className="font-display font-semibold text-pink-800 text-base sm:text-lg italic p-4 rounded-xl bg-pink-100/60 border-l-4 border-pink-500">
            "Wherever life takes you, you will always have a brother cheering for every victory, laughing with you, and standing firmly in your corner forever."
          </p>
        </div>

        {/* Signatures */}
        <div className="pt-8 border-t-2 border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase">CERTIFIED BY</span>
            <span className="font-handwriting text-2xl font-bold text-pink-600">Your School Brother & Crime Partner</span>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-pink-400 flex items-center justify-center font-mono text-[9px] font-bold text-pink-500 rotate-12">
            SEALED ❤️
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 no-print">
        <button
          onClick={handlePrint}
          className="btn-vibrant-pink cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Save As PDF / Print Certificate 🖨️</span>
        </button>

        <button
          onClick={handleCelebrate}
          className="btn-soft-pink cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Pop Confetti & Cheer! 🎉</span>
        </button>
      </div>

      {/* Sweet Footer Note */}
      <footer className="mt-16 pt-8 border-t border-pink-200/60 text-xs font-semibold text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Made with endless love & laughter for Aarna 💖</span>
        <span>Happy Birthday PGli Gawar! 🌸</span>
      </footer>
    </section>
  );
};
