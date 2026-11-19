import React from 'react';
import { getMemoryImage } from '@/utils/assets';
import { Sparkles, Heart, Coffee, BookOpen, Clock, Laugh } from 'lucide-react';

const SISTERHOOD_PILLARS = [
  {
    icon: Clock,
    emoji: "⏰",
    title: "The 8:00 AM — 2:00 PM Magic",
    description: "Most people need late night calls or cafe dates to bond. We built an entire unbreakable sibling bond between the morning bell and the afternoon dismissal.",
    tag: "School Wall Wonder",
    color: "from-pink-500 to-rose-400"
  },
  {
    icon: Coffee,
    emoji: "🥪",
    title: "The Non-Negotiable Tiffin Tax",
    description: "Bringing any snacks within a 2-meter radius of Desk 12 meant losing 80% of it immediately. Aarna considered my lunchbox her personal birthright.",
    tag: "Sisterhood Tax: Paid in Full",
    color: "from-amber-400 to-orange-400"
  },
  {
    icon: Laugh,
    emoji: "👀",
    title: "Sub-Vocal Classroom Telepathy",
    description: "When teachers were writing incomprehensible formulas on the board, one micro-glance across the room was enough to make us both choke on silent, wheezing laughter.",
    tag: "Zero Faculty Decoding",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    emoji: "💖",
    title: "My Eternal Safe Space",
    description: "No matter how boring, exhausting, or chaotic school got, talking to you was the easiest reset button. You listened with an open heart and zero judgement.",
    tag: "100% Genuine Gold",
    color: "from-rose-500 to-pink-600"
  }
];

export const Desk12Story: React.FC = () => {
  return (
    <section id="bond" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <span>DESK 12 CHRONICLES</span>
          <span>•</span>
          <span>HOW WE BECAME SIBLINGS</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
          How A School Friend Became <br />
          <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            My Real Sister ❤️
          </span>
        </h2>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          We never went to after-school cafes. We never had weekend road trips. 
          Everything we share was forged right between desks, blackboards, and classroom bells.
        </p>
      </div>

      {/* Grid of Cute Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SISTERHOOD_PILLARS.map((pillar, idx) => {
          return (
            <div
              key={idx}
              className="lovely-card p-6 sm:p-8 flex flex-col justify-between group hover:border-pink-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-50 border border-pink-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {pillar.emoji}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-800 group-hover:text-pink-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2.5">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-100/80 flex items-center justify-between text-xs font-semibold text-pink-500">
                <span>Brother-Sister Memory #{idx + 1}</span>
                <span>Forever Valid ✓</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Sacred Relic Callout: Raw Untouched Forehead Dot Photo */}
      <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-8 space-y-3">
            <span className="bg-white/20 text-white text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold">
              THE SACRED DESK 12 ARTIFACT
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl">
              The Untouched Forehead Dot Video Call 📸
            </h3>
            <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
              During online classes, formulas were flying over everyone's heads. Someone drew marker dots all over your forehead and a scribble on your cheek. 
              Instead of being embarrassed, you sat there smiling proudly. That is the exact moment I knew: 
              <strong> You are 100% Pgli Gawar, and 1000% pure gold.</strong>
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center">
            {/* Cute mini polaroid of the raw doodle call */}
            <div className="bg-white p-2.5 pb-8 rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform w-48">
              <div className="aspect-[9/16] rounded bg-black overflow-hidden">
                <img
                  src={getMemoryImage('aarna_school_call_raw.png')}
                  alt="Aarna Online Class Raw Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-slate-800 text-center text-sm font-bold mt-2">
                Unfiltered cuteness 😂💖
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
