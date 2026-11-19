import React, { useEffect, useRef, useState } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import gsap from 'gsap';

interface Metric {
  label: string;
  value: string;
  score: number;
  note: string;
}

const METRICS: Metric[] = [
  { label: 'Chaos Index', value: '97.3%', score: 97, note: 'Exceeds all institutional benchmarks' },
  { label: 'Comedic Devastation', value: '94.1%', score: 94, note: 'One look = entire class destroyed' },
  { label: 'Emotional Gravity', value: '99.8%', score: 99, note: 'Bonding coefficient surpasses blood siblings' },
  { label: 'Stubbornness Quotient', value: '100%', score: 100, note: 'Literally immovable once decided' },
  { label: 'Snack Theft Efficiency', value: '89.4%', score: 89, note: 'The "Sister Tax" remains undefeated' },
  { label: 'Main Character Energy', value: '96.7%', score: 96, note: 'Enters any room, owns it immediately' },
];

const RESEARCHER_NOTES = [
  {
    day: 'Day 1',
    author: 'Dr. R. Kapoor',
    note: 'Subject walked in. Within 90 seconds, three students were laughing, one teacher was confused, and I had lost my pen.',
  },
  {
    day: 'Day 14',
    author: 'Dr. S. Mehta',
    note: 'Tried to categorize subject under "comedic genius." She then showed genuine empathy for a struggling classmate. All classifications void.',
  },
  {
    day: 'Day 47',
    author: 'Dr. R. Kapoor',
    note: 'Subject claims she is "not dramatic." Evidence contradicts. Strongly.',
  },
  {
    day: 'Day 112',
    author: 'Dr. P. Verma',
    note: 'Have given up attempting scientific neutrality. Subject is simply a remarkable human being. Recommending permanent preservation.',
  },
];

export const PersonalityLabScene: React.FC = () => {
  const { setScene } = useInstituteStore();
  const sceneRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const [animatedScores, setAnimatedScores] = useState<number[]>(METRICS.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate header
      tl.from('.plab-eyebrow', { y: 20, opacity: 0, duration: 0.5 })
        .from('.plab-title', { y: 60, opacity: 0, duration: 0.8 }, '-=0.2')
        .from('.plab-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4');

      // Animate metrics with counter
      tl.from('.metric-row', {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.2');

      // Animate the score counters
      METRICS.forEach((metric, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: metric.score,
          duration: 1.5,
          delay: 0.8 + i * 0.1,
          ease: 'power2.out',
          onUpdate: () => {
            setAnimatedScores(prev => {
              const next = [...prev];
              next[i] = Math.round(obj.val);
              return next;
            });
          },
        });
      });

      // Animate notes
      gsap.from('.note-card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        delay: 1.2,
        ease: 'power3.out',
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef} className="scene bg-[#101114] pb-24">
      {/* Ambient accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-[at_center] from-[#B99A65]/5 to-transparent pointer-events-none" />

      {/* Header Section */}
      <div className="pt-20 pb-16 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="plab-eyebrow label-eyebrow mb-4">
          Department 01 — Personality Diagnostics Laboratory
        </div>

        <h1 className="plab-title heading-section text-[#F2EBDD] max-w-3xl">
          Attempting to quantify <br className="hidden md:block" />
          <span className="text-[#B99A65]">the unquantifiable.</span>
        </h1>

        <p className="plab-subtitle text-body mt-4 max-w-xl">
          After 112 days of observation, our researchers have concluded that Subject A-5546 operates entirely outside known scientific parameters.
        </p>
      </div>

      {/* Metrics Section — Big numbers, editorial style */}
      <div ref={metricsRef} className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {METRICS.map((metric, i) => (
            <div key={i} className="metric-row flex items-start gap-6 py-6 border-b border-[#2a2930]">
              {/* Big number */}
              <div className="shrink-0 w-24">
                <span className="font-editorial text-5xl md:text-6xl font-light text-[#F2EBDD] tabular-nums">
                  {animatedScores[i]}
                </span>
                <span className="font-editorial text-2xl text-[#B99A65]">%</span>
              </div>

              {/* Label + bar + note */}
              <div className="flex-1 pt-2">
                <div className="font-display text-sm font-medium text-[#F2EBDD] mb-2">
                  {metric.label}
                </div>
                {/* Progress bar */}
                <div className="w-full h-1 bg-[#1e1f26] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#806B4A] to-[#B99A65] rounded-full transition-all duration-1000"
                    style={{ width: `${animatedScores[i]}%` }}
                  />
                </div>
                <div className="font-mono text-[10px] text-[#6b6760] tracking-wide">
                  {metric.note}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary verdict */}
        <div className="mt-16 py-8 border-t border-b border-[#2a2930]">
          <div className="label-muted mb-3">Chief Scientist's Verdict</div>
          <p className="text-editorial text-[#F2EBDD] max-w-2xl" style={{ fontStyle: 'italic' }}>
            "Subject generates severe emotional stability in peers while simultaneously generating 100% comedic disorder.
            We have never encountered anything like this. Recommend permanent preservation."
          </p>
        </div>
      </div>

      {/* Researcher Notes — Handwritten feel */}
      <div ref={notesRef} className="mt-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="label-eyebrow mb-8">
          Field Researcher Notes — Confidential
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCHER_NOTES.map((note, i) => (
            <div
              key={i}
              className="note-card p-6 bg-[#16161b] border border-[#2a2930] hover:border-[#B99A65]/40 transition-all duration-500"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (0.5 + Math.random())}deg)` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#B99A65] tracking-widest uppercase">{note.day}</span>
                <span className="font-mono text-[10px] text-[#3a3530]">LAB LOG</span>
              </div>
              <p className="font-handwriting text-lg text-[#F2EBDD] leading-relaxed">
                "{note.note}"
              </p>
              <div className="mt-5 pt-3 border-t border-[#2a2930] font-mono text-[10px] text-[#6b6760]">
                — {note.author}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setScene('opening')}
          className="btn-ghost cursor-pointer"
        >
          ← Back to Opening
        </button>

        <button
          onClick={() => setScene('envelopes')}
          className="btn-primary cursor-pointer"
        >
          <span>Open Sealed Envelopes</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
