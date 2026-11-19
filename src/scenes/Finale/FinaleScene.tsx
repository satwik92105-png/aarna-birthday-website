import React, { useState, useEffect, useRef } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import secretsData from '@/content/secrets/secrets.json';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { Sparkles, Printer, Download, RotateCcw, Heart, Gift, Award, Compass } from 'lucide-react';

export const FinaleScene: React.FC = () => {
  const { setScene, resetProgress } = useInstituteStore();
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showKeepsake, setShowKeepsake] = useState(false);
  const [showSecretDossier, setShowSecretDossier] = useState(false);
  const finaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sound.playAccessGranted();

    // Staggered GSAP reveal
    const ctx = gsap.context(() => {
      gsap.from('.finale-stagger', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }, finaleRef);

    // Initial Celebration Confetti Shower
    const end = Date.now() + 3 * 1000;
    const colors = ['#B99A65', '#D4AF37', '#f43f5e', '#ffffff', '#fed7aa'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    return () => ctx.revert();
  }, []);

  const handleOpenGift = () => {
    sound.playDiscoveryChime();
    setIsGiftOpened(true);

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#B99A65', '#D4AF37', '#f43f5e']
    });
  };

  const handlePrintKeepsake = () => {
    window.print();
  };

  return (
    <div ref={finaleRef} className="scene min-h-screen bg-[#090a0d] text-[#F2EBDD] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Background Star Ambient Radial */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[at_center] from-[#B99A65]/12 via-[#090a0d]/80 to-[#090a0d]" />

      <div className="relative z-10 max-w-4xl w-full text-center py-12">
        {/* Declassification Ribbon */}
        <div className="finale-stagger inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16171d] border border-[#2e2d36] text-[10px] font-mono tracking-widest text-[#B99A65] uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#B99A65]" />
          <span>RESEARCH PROTOCOL COMPLETE // PERPETUAL KEEPSAKE</span>
        </div>

        {/* Grand Birthday Heading */}
        <h1 className="finale-stagger heading-hero font-light text-transparent bg-clip-text bg-gradient-to-r from-[#B99A65] via-[#F2EBDD] to-[#E5A93C] mb-6">
          Happy Birthday, Aarna.
        </h1>

        <p className="finale-stagger font-editorial text-2xl sm:text-3xl italic text-[#A9A49A] max-w-2xl mx-auto leading-relaxed mb-8">
          "Some people are simply impossible to classify — because they were created to be extraordinary."
        </p>

        {/* INTERACTIVE GIFT BOX REVEAL */}
        <div className="finale-stagger my-12 max-w-md mx-auto">
          {!isGiftOpened ? (
            <div
              onClick={handleOpenGift}
              className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-b from-[#1c1a24] to-[#121118] border-2 border-[#B99A65]/50 hover:border-[#B99A65] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(185,154,101,0.2)] transition-all duration-500 hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-[#B99A65]/20 border border-[#B99A65] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                🎁
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B99A65] block mb-1">
                CLASSIFIED ARTIFACT
              </span>
              <h3 className="font-editorial text-2xl text-[#F2EBDD] group-hover:text-[#B99A65] transition-colors">
                Tap To Unbox The Final Gift
              </h3>
              <p className="text-xs text-[#A9A49A] mt-2">
                Reserved exclusively for Subject A-5546.
              </p>
            </div>
          ) : (
            <div className="animate-fade-in p-8 rounded-2xl bg-[#14151b] border-2 border-[#D4AF37] shadow-2xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-2xl mb-4 text-[#D4AF37]">
                ✨
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                UNWRAPPED & DECLASSIFIED
              </span>
              <h3 className="font-editorial text-2xl text-[#F2EBDD] mb-2">
                The Sibling Passport & Perpetual Deed
              </h3>
              <p className="text-xs text-[#cbd5e1] leading-relaxed mb-6">
                A permanent legal declaration of sisterhood, certifying that no distance, graduation, or passage of time can ever change Desk 12.
              </p>
              <button
                onClick={() => setShowKeepsake(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B99A65] to-[#D4AF37] text-[#101114] font-display font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
              >
                Inspect Official Passport Deed
              </button>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="finale-stagger flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setShowKeepsake(true)}
            className="btn-primary cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Preserve Keepsake (Print/PDF)</span>
          </button>

          <button
            onClick={() => setShowSecretDossier(true)}
            className="btn-ghost cursor-pointer text-[#D4AF37] border-[#D4AF37]/40 hover:border-[#D4AF37]"
          >
            <Sparkles className="w-4 h-4" />
            <span>The File They Didn't Want You To See</span>
          </button>

          <button
            onClick={() => setScene('opening')}
            className="btn-ghost cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Experience</span>
          </button>
        </div>

        {/* Institutional Stamp Footer */}
        <div className="finale-stagger mt-16 pt-8 border-t border-[#2a2930] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#6b6760] gap-4">
          <span>THE UNCOMMON INSTITUTE • EST. FOREVER</span>
          <span>SUBJECT AARNA: SISTER FOR LIFE ❤️</span>
        </div>
      </div>

      {/* OFFICIAL PASSPORT / KEEPSAKE MODAL */}
      {showKeepsake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#faf7f2] text-[#1c1917] rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-[#B99A65] max-h-[90vh] overflow-y-auto text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#d6cfc2] mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#806B4A] block">
                  OFFICIAL INSTITUTIONAL PASSPORT & MEMORY DEED
                </span>
                <h2 className="font-editorial text-3xl font-bold text-[#1c1917] mt-1">
                  The Extraordinary Subject Keepsake
                </h2>
              </div>
              <div className="w-14 h-14 rounded border-2 border-[#806B4A] flex flex-col items-center justify-center font-mono text-xs font-bold text-[#806B4A]">
                <span>FILE</span>
                <span>#5546</span>
              </div>
            </div>

            {/* Passport Credentials Table */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-xl bg-[#f0eae1] border border-[#d6cfc2] font-mono text-xs mb-6">
              <div>
                <span className="text-[#806B4A] block uppercase text-[10px]">SUBJECT NAME</span>
                <span className="text-sm font-bold text-[#1c1917]">Aarna</span>
              </div>
              <div>
                <span className="text-[#806B4A] block uppercase text-[10px]">PERPETUAL ALIAS</span>
                <span className="text-sm font-bold text-[#806B4A]">PGli Gawar</span>
              </div>
              <div>
                <span className="text-[#806B4A] block uppercase text-[10px]">ENCOUNTER BOUNDARY</span>
                <span className="text-[#1c1917]">08:00 AM — 02:00 PM (Desk 12)</span>
              </div>
              <div>
                <span className="text-[#806B4A] block uppercase text-[10px]">CLASSIFICATION</span>
                <span className="text-[#806B4A] font-bold">Sister For Life • Irreplaceable</span>
              </div>
            </div>

            {/* Sibling Solemn Covenant */}
            <div className="p-6 rounded-xl bg-[#f0eae1] border border-[#d6cfc2] mb-8 space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#806B4A] font-bold block">
                SOLEMN SIBLING PLEDGE:
              </span>
              <p className="font-editorial text-xl italic text-[#1c1917] leading-relaxed">
                "No matter where life takes you, how many birthdays arrive, or how big the world gets, you will always have a brother who is endlessly proud of you, cheering for every victory, and standing in your corner forever."
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#d6cfc2]">
              <button
                onClick={handlePrintKeepsake}
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#1c1917] text-[#faf7f2] font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#806B4A] transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={() => setShowKeepsake(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded border border-[#d6cfc2] font-mono text-xs text-[#806B4A] hover:text-[#1c1917] cursor-pointer"
              >
                Close Keepsake
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLASSIFIED SECRETS DOSSIER MODAL */}
      {showSecretDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#141318] border-2 border-[#D4AF37] rounded-2xl p-8 sm:p-12 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#2a2930] mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#D4AF37] block">
                  TOP SECRET DECLASSIFIED // ARCHIVE VAULT
                </span>
                <h2 className="font-editorial text-3xl font-bold text-[#F2EBDD] mt-1">
                  The File They Didn't Want You To See 🕵️‍♀️
                </h2>
              </div>
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>

            <div className="space-y-4 font-mono text-xs text-[#cbd5e1] mb-8">
              {secretsData.map((sec) => (
                <div key={sec.id} className="p-4 rounded-xl bg-[#1a1920] border border-[#2e2d36]">
                  <span className="text-[#D4AF37] font-semibold block uppercase mb-1">
                    {sec.location} // {sec.name}
                  </span>
                  <p className="font-sans text-sm text-[#F2EBDD] leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-right pt-4 border-t border-[#2a2930]">
              <button
                onClick={() => setShowSecretDossier(false)}
                className="px-6 py-2.5 rounded bg-[#D4AF37] text-[#101114] font-display font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                Close Classified Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
