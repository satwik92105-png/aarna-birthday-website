import React, { useState } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import awardsData from '@/content/departments/awards.json';
import { ArrowLeft, ArrowRight, Award, Trophy, Download, Sparkles, X, Check } from 'lucide-react';

export const AchievementMuseumScene: React.FC = () => {
  const { setScene, markDepartmentCompleted, discoverSecret, discoveredSecrets } = useInstituteStore();
  const [selectedAward, setSelectedAward] = useState<any | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [revealedTrophies, setRevealedTrophies] = useState<string[]>([]);

  const handleInspectTrophy = (award: any) => {
    setSelectedAward(award);
    setShowCertificate(true);
    sound.playAwardFanfare();

    if (!revealedTrophies.includes(award.id)) {
      setRevealedTrophies((prev) => [...prev, award.id]);
    }

    // Secret 3: Behind Trophy #05 (PGli Gawar Special Recognition Award)
    if (award.id === 'AWD-05') {
      discoverSecret('secret-3');
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full pt-20 pb-20 px-6 bg-[#101114] text-[#F2EBDD]">
      <div className="max-w-6xl mx-auto">
        {/* Department Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#35343A] mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code text-[#E5A93C] uppercase tracking-widest">
                DEPARTMENT 04 // LEVEL 04
              </span>
              <span className="text-[#35343A]">•</span>
              <span className="text-xs font-mono-code text-[#806B4A]">
                THE HALL OF ABSURD HONORS
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#F2EBDD] mt-1">
              Museum of Unnecessary Achievements
            </h1>
            <p className="text-sm text-[#A9A49A] mt-1">
              Recognizing unparalleled contributions to classroom disorder, lunchbox theft, and dramatic excellence.
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
                markDepartmentCompleted('achievement-museum');
                setScene('observatory');
              }}
              className="px-4 py-2 rounded bg-[#B99A65] text-[#101114] text-xs font-mono-code font-semibold hover:bg-[#D4AF37] flex items-center gap-2 transition-all"
            >
              <span>NEXT: FUTURE OBSERVATORY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prestigious Trophies Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awardsData.map((award) => {
            const isRevealed = revealedTrophies.includes(award.id);
            return (
              <div
                key={award.id}
                onClick={() => handleInspectTrophy(award)}
                className="institute-card p-8 rounded-xl flex flex-col justify-between text-center cursor-pointer group hover:border-[#E5A93C] relative overflow-hidden"
              >
                {/* Pedestal & Glowing Trophy Emblem */}
                <div className="relative py-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-2 border-[#E5A93C]/40 bg-[#101114] flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 group-hover:border-[#E5A93C] transition-all">
                    {award.badge}
                  </div>
                  <div className="w-16 h-2 bg-[#E5A93C]/20 rounded-full blur-sm mt-3" />
                </div>

                <div>
                  <span className="text-[10px] font-mono-code text-[#806B4A] uppercase tracking-widest block mb-1">
                    {award.tier}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#F2EBDD] group-hover:text-[#E5A93C] transition-colors">
                    {award.name}
                  </h3>
                  <p className="text-xs text-[#A9A49A] mt-3 line-clamp-3 leading-relaxed">
                    "{award.citation}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#35343A]/60 flex items-center justify-between text-xs font-mono-code text-[#806B4A]">
                  <span>CODE: {award.certificateCode}</span>
                  <span className="text-[#E5A93C] group-hover:underline">
                    [ VIEW CERTIFICATE ]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Modal */}
        {showCertificate && selectedAward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fade">
            <div className="relative w-full max-w-2xl bg-[#15161c] border-2 border-[#E5A93C] p-8 sm:p-12 rounded-xl text-center shadow-2xl">
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#101114] border border-[#35343A] flex items-center justify-center text-[#A9A49A] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gold Institutional Seal */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#E5A93C] flex items-center justify-center text-2xl bg-[#101114] text-[#E5A93C]">
                {selectedAward.badge}
              </div>

              <span className="text-xs font-mono-code text-[#E5A93C] uppercase tracking-widest block">
                OFFICIAL CONFERMENT DECREE // THE UNCOMMON INSTITUTE
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#F2EBDD] mt-2 mb-4">
                Certificate of Absurd Distinction
              </h2>

              <p className="text-sm font-sans text-[#A9A49A]">
                This supreme accolade is solemnly and unconditionally awarded to:
              </p>
              <div className="text-3xl font-editorial font-bold text-[#E5A93C] my-3">
                AARNA (AKA PGLI GAWAR)
              </div>

              <div className="p-4 rounded bg-[#101114] border border-[#35343A] text-sm text-[#F2EBDD] italic my-6">
                "{selectedAward.citation}"
              </div>

              <div className="text-xs font-mono-code text-[#806B4A] mb-8">
                JURY REMARKS: {selectedAward.juryRemarks}
              </div>

              {/* Secret 3 Badge */}
              {selectedAward.id === 'AWD-05' && (
                <div className="mb-6 p-3 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/40 text-xs font-mono-code text-[#E5A93C] flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                  <span>Secret 3 Decrypted: The Hidden Plaque of Reverence</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#35343A]">
                <button
                  onClick={handlePrintCertificate}
                  className="px-6 py-2.5 rounded bg-[#E5A93C] text-[#101114] font-display font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#D4AF37] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>PRINT / SAVE CERTIFICATE</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-6 py-2.5 rounded border border-[#35343A] text-xs font-mono-code text-[#A9A49A] hover:text-white"
                >
                  CLOSE CERTIFICATE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
