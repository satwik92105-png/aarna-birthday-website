import React from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import impactData from '@/content/departments/humanImpact.json';
import { ArrowLeft, ArrowRight, HeartHandshake } from 'lucide-react';

export const HumanImpactScene: React.FC = () => {
  const { setScene, markDepartmentCompleted } = useInstituteStore();

  return (
    <div className="min-h-screen w-full pt-24 pb-20 px-6 bg-[#0e0f12] text-[#F2EBDD]">
      <div className="max-w-4xl mx-auto">
        {/* Department Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#35343A] mb-12">
          <div>
            <span className="text-xs font-mono-code text-[#B99A65] uppercase tracking-widest block mb-1">
              DEPARTMENT 03 // LEVEL 03
            </span>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#F2EBDD]">
              Department of Human Impact
            </h1>
            <p className="text-sm text-[#A9A49A] mt-1">
              A quiet sanctuary examining the emotional gravity and lasting resonance of Subject Aarna.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setScene('atrium')}
              className="px-4 py-2 rounded border border-[#35343A] bg-[#191A1F] text-xs font-mono-code text-[#A9A49A] hover:text-white hover:border-[#B99A65] flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO ATRIUM</span>
            </button>
            <button
              onClick={() => {
                markDepartmentCompleted('human-impact');
                setScene('achievement-museum');
              }}
              className="px-4 py-2 rounded bg-[#B99A65] text-[#101114] text-xs font-mono-code font-semibold hover:bg-[#D4AF37] flex items-center gap-2 transition-all"
            >
              <span>NEXT: AWARDS MUSEUM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Central Emotive Inscription */}
        <div className="text-center py-10 px-6 mb-16 rounded-2xl bg-gradient-to-b from-[#191A1F] to-[#101114] border border-[#B99A65]/30 shadow-2xl">
          <HeartHandshake className="w-8 h-8 text-[#B99A65] mx-auto mb-4 opacity-80" />
          <blockquote className="text-2xl sm:text-3xl font-editorial italic text-[#F2EBDD] leading-relaxed max-w-2xl mx-auto">
            "{impactData.quote}"
          </blockquote>
          <span className="text-xs font-mono-code text-[#806B4A] uppercase tracking-widest block mt-4">
            PERMANENT ARCHIVE INSCRIPTION // LEVEL 03
          </span>
        </div>

        {/* Three Curated Exhibits */}
        <div className="space-y-12">
          {impactData.exhibits.map((exhibit) => (
            <div
              key={exhibit.id}
              className="institute-card p-8 sm:p-10 border-[#35343A] hover:border-[#B99A65]/50 transition-all"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-[#35343A]/60 mb-6">
                <span className="text-xs font-mono-code text-[#B99A65] font-semibold tracking-wider">
                  {exhibit.number}
                </span>
                <div className="h-3 w-px bg-[#35343A]" />
                <h2 className="text-xl font-editorial font-bold text-[#F2EBDD]">
                  {exhibit.heading}
                </h2>
              </div>

              <div className="space-y-4">
                {exhibit.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="text-xs font-mono-code text-[#806B4A] mt-1">
                      0{idx + 1}.
                    </span>
                    <p className="font-sans text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Personal Postscript */}
        <div className="mt-16 p-8 rounded-xl bg-[#15161b] border-l-4 border-[#B99A65] text-[#cbd5e1] space-y-3">
          <span className="text-xs font-mono-code text-[#B99A65] uppercase tracking-wider block">
            {impactData.personalPostscript.author}
          </span>
          <p className="font-editorial text-lg italic text-[#F2EBDD] leading-relaxed">
            "{impactData.personalPostscript.text}"
          </p>
        </div>
      </div>
    </div>
  );
};
