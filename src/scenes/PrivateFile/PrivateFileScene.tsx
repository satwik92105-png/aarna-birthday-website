import React, { useState, useEffect, useRef } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import letterData from '@/content/letters/letter.json';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { Heart, Volume2, VolumeX, ArrowRight, ArrowLeft, Sparkles, Smile } from 'lucide-react';

export const PrivateFileScene: React.FC = () => {
  const { setScene } = useInstituteStore();
  const [tissueCount, setTissueCount] = useState(0);
  const [showHugModal, setShowHugModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically start warm emotional piano score on entering private file
    sound.startPianoSoundtrack();
    setIsMusicPlaying(true);

    const ctx = gsap.context(() => {
      gsap.from('.letter-fade-in', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }, letterRef);

    return () => {
      sound.stopPianoSoundtrack();
      ctx.revert();
    };
  }, []);

  const handleToggleSoundtrack = () => {
    if (isMusicPlaying) {
      sound.stopPianoSoundtrack();
      setIsMusicPlaying(false);
    } else {
      sound.startPianoSoundtrack();
      setIsMusicPlaying(true);
    }
  };

  const handleWipeTears = () => {
    setTissueCount((c) => c + 1);
    sound.playDiscoveryChime();

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#B99A65', '#f43f5e', '#fda4af', '#fef3c7']
    });
  };

  const handleOpenHug = () => {
    sound.playDiscoveryChime();
    setShowHugModal(true);
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#B99A65', '#f43f5e', '#fda4af', '#ffffff']
    });
  };

  return (
    <div ref={letterRef} className="scene min-h-screen bg-[#0d0c10] text-[#F2EBDD] pt-16 pb-28 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Warm Ambient Rose & Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-radial-[at_center] from-[#B99A65]/10 via-[#f43f5e]/5 to-transparent pointer-events-none" />

      {/* Floating Audio Controller */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={handleToggleSoundtrack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#18171f]/90 backdrop-blur-md border border-[#B99A65]/40 text-xs font-mono text-[#B99A65] hover:border-[#B99A65] transition-all shadow-xl cursor-pointer"
        >
          {isMusicPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isMusicPlaying ? 'Soundtrack: Playing 🎵' : 'Play Piano Score'}</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Intimate Header */}
        <div className="letter-fade-in text-center pt-8 pb-14">
          <span className="label-eyebrow block mb-3">
            DECLASSIFIED VAULT // DESK NO. 12
          </span>
          <h1 className="heading-hero text-[#F2EBDD]">
            The Creator’s Private File.
          </h1>
          <p className="font-editorial text-xl italic text-[#A9A49A] mt-4 max-w-xl mx-auto">
            "We never spent time together in the outside world — yet you became my real sister."
          </p>
        </div>

        {/* Parchment Styled Editorial Letter */}
        <div className="letter-fade-in relative rounded-2xl bg-[#141318] border border-[#2e2d36] p-8 sm:p-14 shadow-2xl">
          {/* Authentic Taped Polaroid: Untouched Raw School Doodle Screenshot */}
          <div className="mb-10 sm:float-right sm:ml-8 sm:mb-6 w-full sm:w-64 p-3 bg-[#1e1c24] border border-[#35343A] rounded shadow-2xl rotate-2 hover:rotate-0 transition-transform">
            <div className="w-full aspect-[9/16] bg-black rounded overflow-hidden">
              <img
                src="/images/memories/aarna_school_call_raw.png"
                alt="Aarna Online Class Raw Doodle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center">
              <span className="font-mono text-[10px] text-[#B99A65] block uppercase tracking-widest">
                EXHIBIT 5546 • DESK 12
              </span>
              <p className="font-handwriting text-base text-[#F2EBDD] mt-1">
                Forehead dots & pure gold soul ✨
              </p>
            </div>
          </div>

          {/* Letter Prose */}
          <div className="space-y-6 font-sans text-base sm:text-lg text-[#cbd5e1] leading-relaxed">
            <h2 className="font-editorial text-3xl font-semibold text-[#B99A65]">
              {letterData.letter.salutation}
            </h2>

            {letterData.letter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === 2 ? 'font-editorial text-xl text-[#F2EBDD] font-normal border-l-2 border-[#B99A65] pl-5 py-1 italic leading-relaxed' : ''}
              >
                {p}
              </p>
            ))}

            {/* Signature Block */}
            <div className="pt-8 border-t border-[#2a2930]">
              <span className="font-mono text-xs text-[#806B4A] block">
                {letterData.letter.signoff}
              </span>
              <span className="font-handwriting text-3xl text-[#B99A65] block mt-2">
                {letterData.letter.signature}
              </span>
            </div>
          </div>

          {/* Interactive Emotional Actions */}
          <div className="mt-14 pt-8 border-t border-[#2a2930] flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleWipeTears}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1b1a22] border border-[#B99A65]/50 text-xs font-mono text-[#B99A65] hover:bg-[#B99A65] hover:text-[#101114] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Wipe Happy Tears (Virtual Tissue)</span>
              <span>🤧 {tissueCount > 0 ? `(${tissueCount})` : ''}</span>
            </button>

            <button
              onClick={handleOpenHug}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#B99A65] to-[#f43f5e] text-[#101114] font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.03] transition-all shadow-lg shadow-[#B99A65]/20 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-[#101114]" />
              <span>Receive Huge Sister Hug</span>
            </button>
          </div>
        </div>

        {/* Navigation to Grand Finale */}
        <div className="letter-fade-in mt-14 flex items-center justify-between">
          <button
            onClick={() => setScene('memories')}
            className="btn-ghost cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Memory Archive</span>
          </button>

          <button
            onClick={() => {
              sound.playAccessGranted();
              setScene('finale');
            }}
            className="btn-primary cursor-pointer"
          >
            <span>Proceed to Birthday Finale</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULL-SCREEN VIRTUAL HUG MODAL */}
      {showHugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-lg w-full rounded-2xl bg-[#16151c] border-2 border-[#B99A65] p-8 sm:p-10 text-center shadow-2xl">
            <div className="text-5xl mb-4">🫂💖🌸✨</div>
            <h2 className="font-editorial text-3xl font-bold text-[#F2EBDD] mb-3">
              The Biggest Sister Hug Ever!
            </h2>
            <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6 font-sans">
              No matter what university, city, or career you conquer next, you will always have a brother who is endlessly proud of you. You are irreplaceable, deeply cherished, and loved beyond words.
            </p>
            <button
              onClick={() => setShowHugModal(false)}
              className="w-full py-3.5 rounded-xl bg-[#B99A65] text-[#101114] font-display font-semibold text-xs uppercase tracking-wider hover:bg-[#D4AF37] transition-all cursor-pointer"
            >
              Feeling Deeply Loved & Happy 🥰
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
