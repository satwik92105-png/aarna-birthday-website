import React, { useState, useRef, useEffect } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Mail, Sparkles, Check } from 'lucide-react';

interface EnvelopeItem {
  id: string;
  sealNumber: string;
  classification: string;
  title: string;
  subtitle: string;
  date: string;
  sealColor: string;
  content: {
    heading: string;
    body: string[];
    dispatchNote: string;
    stamp: string;
  };
}

const ENVELOPES: EnvelopeItem[] = [
  {
    id: 'env-1',
    sealNumber: 'SEAL // 01',
    classification: 'FIELD INCIDENT 5546',
    title: 'The Desk 12 Incident Report',
    subtitle: 'Classroom Survival & Telepathic Code',
    date: 'Period 3 • Mathematics',
    sealColor: '#B99A65',
    content: {
      heading: 'EXHIBIT ALPHA: TELEPATHIC COMMISSARY',
      body: [
        'A formal investigation into how two students sitting at Desk 12 managed to communicate entire essays of gossip across a 30-meter classroom using only eyebrow twitches and subtle head tilts.',
        'Whenever teachers began writing differential equations on the blackboard, Subject Aarna would unleash an innocent yawn that somehow sent the entire backbench into breathless, silent giggles.',
        'Conclusion: No academic faculty ever successfully decoded the Desk 12 encryption.'
      ],
      dispatchNote: 'Preserved by the Institute Archivist with zero redactions.',
      stamp: 'DECODED • VERIFIED'
    }
  },
  {
    id: 'env-2',
    sealNumber: 'SEAL // 02',
    classification: 'METAMORPHOSIS DISPATCH',
    title: 'The Yellow Dress Phenomenon',
    subtitle: 'From Corridor Pranks to Pure Radiance',
    date: 'Special Observation',
    sealColor: '#D4AF37',
    content: {
      heading: 'EXHIBIT BETA: THE UNEXPECTED EVOLUTION',
      body: [
        'For years, Subject maintained a strict identity as the school corridor troublemaker, answering to the scientific designation "PGli Gawar".',
        'Then photographic evidence arrived: the wildflower in her hair, the radiant yellow dress, the effortless poise that commanded every room she entered.',
        'Chief Scientist noted in the margins: "How did someone so delightfully unhinged at 11:30 AM turn into absolute royalty? The universe has no explanation."'
      ],
      dispatchNote: 'Aesthetic rating certified at 1000/10 by unanimous committee vote.',
      stamp: 'ELEGANCE CERTIFIED'
    }
  },
  {
    id: 'env-3',
    sealNumber: 'SEAL // 03',
    classification: 'SACRED SIBLING PROTOCOL',
    title: 'The 8:00 AM — 2:00 PM Covenant',
    subtitle: 'The School Walls That Built a Lifetime',
    date: 'Perpetual & Irrevocable',
    sealColor: '#f43f5e',
    content: {
      heading: 'EXHIBIT GAMMA: THE IRREPLACEABLE BOND',
      body: [
        'Statistical oddity: We never spent a single weekend together, never hung out in cafes after hours, and never knew the world outside the 8 AM morning bell and 2 PM dismissal gates.',
        'Yet within those six daily hours—sharing crushed tiffins, exchanging pens that were never returned, and listening to each other\'s real feelings—something extraordinary was forged.',
        'You didn\'t just become a close friend. You became my real sister. Forever and without condition.'
      ],
      dispatchNote: 'Filed in the Institute Vault with highest emotional priority.',
      stamp: 'SISTER FOR LIFE'
    }
  }
];

export const EnvelopesScene: React.FC = () => {
  const { setScene, discoverSecret, discoveredSecrets } = useInstituteStore();
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState<string | null>(null);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.env-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.tactile-envelope', {
        y: 80,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenEnvelope = (envelope: EnvelopeItem) => {
    sound.playDiscoveryChime();
    setOpenedEnvelopeId(envelope.id);
    if (!openedEnvelopes.includes(envelope.id)) {
      setOpenedEnvelopes((prev) => [...prev, envelope.id]);
    }

    if (envelope.id === 'env-3') {
      discoverSecret('secret-3');
    }
  };

  const handleCloseModal = () => {
    sound.playMechanicalKey();
    setOpenedEnvelopeId(null);
  };

  const activeEnvelope = ENVELOPES.find((e) => e.id === openedEnvelopeId);

  return (
    <div ref={containerRef} className="scene min-h-screen bg-[#101114] text-[#F2EBDD] pt-20 pb-24 px-6 md:px-16 lg:px-24">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-[at_center] from-[#B99A65]/6 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="env-header max-w-4xl mx-auto text-center mb-16">
        <div className="label-eyebrow mb-3">DEPARTMENT 03 — ARCHIVAL DISPATCHES</div>
        <h1 className="heading-section text-[#F2EBDD]">
          Three Sealed Envelopes.
        </h1>
        <p className="text-editorial text-[#A9A49A] mt-3 max-w-xl mx-auto">
          Tactile dossiers declassified from Desk 12. Break each wax seal to reveal the recovered dispatches.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 font-mono text-xs text-[#806B4A]">
          <span>SEALS BROKEN: {openedEnvelopes.length} / {ENVELOPES.length}</span>
          {openedEnvelopes.length === 3 && (
            <span className="text-[#B99A65] flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> ALL DISPATCHES ACCESSED
            </span>
          )}
        </div>
      </div>

      {/* 3 Tactile Envelopes Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {ENVELOPES.map((env) => {
          const isOpened = openedEnvelopes.includes(env.id);
          return (
            <div
              key={env.id}
              onClick={() => handleOpenEnvelope(env)}
              className="tactile-envelope group relative cursor-pointer select-none transition-all duration-500 hover:-translate-y-2"
            >
              {/* Envelope Body */}
              <div className="relative rounded-xl bg-gradient-to-b from-[#181920] to-[#121317] border border-[#2e2d36] p-7 shadow-2xl overflow-hidden group-hover:border-[#B99A65]/50 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(185,154,101,0.15)] transition-all">
                {/* Envelope Flap Geometry */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-[#1f2029] [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-[#35343d] opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Wax Seal / Stamp Button in center */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: '#16141a',
                      borderColor: env.sealColor,
                      boxShadow: `0 0 20px ${env.sealColor}33`
                    }}
                  >
                    {isOpened ? (
                      <Check className="w-7 h-7 text-[#F2EBDD]" />
                    ) : (
                      <Mail className="w-6 h-6" style={{ color: env.sealColor }} />
                    )}
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase mt-3 text-[#B99A65]">
                    {isOpened ? 'SEAL BROKEN' : 'BREAK WAX SEAL'}
                  </span>
                </div>

                {/* Envelope Front Details */}
                <div className="relative z-10 mt-4 pt-4 border-t border-[#2a2930] text-center">
                  <span className="label-muted block mb-1">{env.sealNumber}</span>
                  <h3 className="font-editorial text-2xl font-normal text-[#F2EBDD] group-hover:text-[#B99A65] transition-colors">
                    {env.title}
                  </h3>
                  <p className="text-xs text-[#A9A49A] mt-1.5 line-clamp-2">
                    {env.subtitle}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] text-[#6b6760]">
                    <span>{env.classification}</span>
                    <span>•</span>
                    <span>{env.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="max-w-6xl mx-auto mt-20 flex items-center justify-between">
        <button
          onClick={() => setScene('personality')}
          className="btn-ghost cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Personality Lab</span>
        </button>

        <button
          onClick={() => setScene('memories')}
          className="btn-primary cursor-pointer"
        >
          <span>Memory Archive</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* DISPATCH LETTER LIGHTBOX MODAL */}
      {activeEnvelope && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div
            ref={letterModalRef}
            className="relative w-full max-w-2xl bg-[#faf7f2] text-[#1c1917] rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-[#B99A65]/40 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Seal Stamp */}
            <div className="flex items-center justify-between pb-4 border-b border-[#d6cfc2] mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#806B4A] block">
                  {activeEnvelope.classification} // {activeEnvelope.sealNumber}
                </span>
                <h2 className="font-editorial text-3xl font-semibold text-[#1c1917] mt-1">
                  {activeEnvelope.title}
                </h2>
              </div>
              <div className="px-3 py-1 rounded border border-[#806B4A] font-mono text-[10px] font-bold tracking-widest text-[#806B4A]">
                {activeEnvelope.content.stamp}
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 font-editorial text-lg leading-relaxed text-[#292524]">
              <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-[#806B4A]">
                {activeEnvelope.content.heading}
              </h3>
              {activeEnvelope.content.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Dispatch Footer */}
            <div className="mt-8 pt-6 border-t border-[#d6cfc2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-handwriting text-xl text-[#806B4A]">
                "{activeEnvelope.content.dispatchNote}"
              </span>
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#1c1917] text-[#faf7f2] font-mono text-xs tracking-wider uppercase hover:bg-[#806B4A] transition-colors cursor-pointer"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
