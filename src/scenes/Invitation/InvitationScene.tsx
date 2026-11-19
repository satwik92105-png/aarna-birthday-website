import React, { useEffect, useRef, useState } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import gsap from 'gsap';
import { ArrowRight, Volume2, Shield } from 'lucide-react';

const TELEMETRY_LOGS = [
  "INITIALIZING ARCHIVAL TELEMETRY PROTOCOL...",
  "LOCATING FILE ID: A-5546 // SUBJECT: AARNA",
  "ALIAS DETECTED: PGLI GAWAR",
  "MEASURING CLASSROOM MORALE DEFLECTION... [EXCEPTIONAL]",
  "ERROR: SUBJECT EXCEEDS ALL SCIENTIFIC PARAMETERS",
  "OVERRIDE ENGAGED: RECLASSIFIED AS EXTRAORDINARY HUMAN",
  "ACCESS AUTHORIZATION GRANTED."
];

export const InvitationScene: React.FC = () => {
  const { setScene, audioEnabled, toggleAudio } = useInstituteStore();
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Hero text reveal with GSAP
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.inv-badge', 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo('.inv-title', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9 }, 
        '-=0.3'
      )
      .fromTo('.inv-subtitle', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7 }, 
        '-=0.4'
      )
      .fromTo('.inv-telemetry-box', 
        { scale: 0.96, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.7 }, 
        '-=0.2'
      );
    }, containerRef);

    // 2. Telemetry terminal typewriter
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < TELEMETRY_LOGS.length) {
        const nextLine = TELEMETRY_LOGS[currentIdx];
        if (nextLine) {
          setDisplayedLogs(prev => [...prev, nextLine]);
          sound.playMechanicalKey();
        }
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsReady(true);
        sound.playAccessGranted();
      }
    }, 320);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const handleEnter = () => {
    sound.playAccessGranted();
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        setScene('personality');
      }
    });
  };

  const handleSkip = () => {
    sound.playAccessGranted();
    setScene('personality');
  };

  return (
    <div
      ref={containerRef}
      className="scene min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 bg-[#101114] text-[#F2EBDD] relative select-none"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial-[at_center] from-[#B99A65]/10 via-transparent to-transparent pointer-events-none" />

      {/* Top right Skip and Sound controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button
          onClick={() => {
            toggleAudio();
            sound.setMuted(!audioEnabled);
            if (!audioEnabled) sound.playAccessGranted();
          }}
          className="flex items-center gap-1.5 font-mono text-[11px] text-[#A9A49A] hover:text-[#B99A65] transition-colors cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{audioEnabled ? 'SOUND: ON' : 'ENABLE SOUND'}</span>
        </button>

        <button
          onClick={handleSkip}
          className="font-mono text-[11px] tracking-widest uppercase text-[#806B4A] hover:text-[#B99A65] transition-colors cursor-pointer"
        >
          [ SKIP INTRO → ]
        </button>
      </div>

      {/* Main Hero Container */}
      <div ref={contentRef} className="relative z-10 max-w-4xl w-full text-center py-6">
        {/* Eyebrow Stamp */}
        <div className="inv-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181920] border border-[#2e2d36] text-[10px] font-mono tracking-widest text-[#B99A65] uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-[#B99A65] animate-ping" />
          <span>DEPARTMENT OF HUMAN ANOMALIES // FILE A-5546</span>
        </div>

        {/* Hero Headline */}
        <h1 ref={titleRef} className="inv-title heading-hero text-[#F2EBDD] mb-6">
          The <span className="text-[#B99A65]">Uncommon</span> Institute
        </h1>

        {/* Editorial Subtitle */}
        <div className="inv-subtitle space-y-2 mb-10">
          <p className="font-editorial text-2xl sm:text-3xl italic text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            "A specialized research facility constructed to investigate individuals who defy all ordinary classification."
          </p>
          <p className="font-mono text-xs tracking-wider text-[#806B4A] uppercase">
            SUBJECT: AARNA • ALIAS: PGLI GAWAR • STATUS: EXTRAORDINARY
          </p>
        </div>

        {/* Telemetry Console Box */}
        <div className="inv-telemetry-box max-w-xl mx-auto rounded-xl bg-[#0c0d10] border border-[#2a2930] p-6 text-left font-mono text-xs shadow-2xl mb-10">
          <div className="flex items-center justify-between pb-3 border-b border-[#222129] mb-4 text-[10px] text-[#6b6760]">
            <span>SYSTEM TERMINAL v4.2</span>
            <span>STATUS: {isReady ? 'READY' : 'CALIBRATING'}</span>
          </div>

          <div className="space-y-2 min-h-[140px]">
            {displayedLogs.map((log, idx) => (
              <div
                key={idx}
                className={`leading-relaxed animate-fade-in ${
                  log.includes('ERROR')
                    ? 'text-[#f43f5e] font-semibold'
                    : log.includes('ACCESS')
                    ? 'text-[#B99A65] font-semibold'
                    : log.includes('EXTRAORDINARY')
                    ? 'text-[#F2EBDD]'
                    : 'text-[#8c8880]'
                }`}
              >
                <span className="text-[#806B4A] mr-2">›</span>
                {log}
              </div>
            ))}
            {!isReady && (
              <span className="inline-block w-2 h-4 bg-[#B99A65] animate-pulse" />
            )}
          </div>
        </div>

        {/* Enter Action Button */}
        <div>
          <button
            ref={btnRef}
            onClick={handleEnter}
            disabled={!isReady}
            className={`px-10 py-4 rounded-xl font-display font-semibold text-xs tracking-widest uppercase inline-flex items-center gap-3 transition-all duration-300 shadow-2xl ${
              isReady
                ? 'bg-gradient-to-r from-[#B99A65] to-[#D4AF37] text-[#101114] hover:scale-105 hover:shadow-[0_0_30px_rgba(185,154,101,0.4)] cursor-pointer'
                : 'bg-[#181920] text-[#6b6760] border border-[#2a2930] cursor-not-allowed opacity-50'
            }`}
          >
            <span>ENTER THE INSTITUTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Tags */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-[10px] font-mono tracking-widest text-[#4a4640]">
        <span>CLASSIFIED ARCHIVE</span>
        <span>•</span>
        <span>DESK 12 SACRED RECORD</span>
        <span>•</span>
        <span>EXPERIENCE DURATION: ~5 MIN</span>
      </div>
    </div>
  );
};
