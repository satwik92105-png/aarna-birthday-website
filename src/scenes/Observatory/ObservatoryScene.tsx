import React, { useState, useEffect } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import obsData from '@/content/departments/observatory.json';
import { ArrowLeft, ArrowRight, Compass, Sparkles, Send, Save, Lock, Unlock } from 'lucide-react';

export const ObservatoryScene: React.FC = () => {
  const {
    setScene,
    markDepartmentCompleted,
    discoverSecret,
    discoveredSecrets,
    completedDepartments,
    triggerAnomaly
  } = useInstituteStore();

  const [activeTab, setActiveTab] = useState<'letter' | 'archive' | 'unwritten' | 'write'>('letter');
  const [futureNote, setFutureNote] = useState('');
  const [savedNoteStatus, setSavedNoteStatus] = useState<string | null>(null);
  const [isTimeCapsuleUnlocked, setIsTimeCapsuleUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('uncommon-future-note');
    if (saved) setFutureNote(saved);
  }, []);

  const handleSaveFutureNote = () => {
    localStorage.setItem('uncommon-future-note', futureNote);
    sound.playDiscoveryChime();
    setSavedNoteStatus('Transmitted to orbit & saved locally! 🚀');
    setTimeout(() => setSavedNoteStatus(null), 3000);
  };

  const handleUnlockCapsule = () => {
    sound.playDiscoveryChime();
    setIsTimeCapsuleUnlocked(true);
  };

  const handleFinishExploration = () => {
    markDepartmentCompleted('observatory');
    triggerAnomaly();
    sound.playAnomalyAlert();
    setScene('anomaly');
  };

  return (
    <div className="min-h-screen w-full pt-20 pb-20 px-6 bg-[#0c0e14] text-[#F2EBDD] relative overflow-hidden">
      {/* Background Starry Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0c0e14]/50 to-[#0c0e14]" />

      <div className="relative max-w-5xl mx-auto">
        {/* Department Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#35343A] mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code text-[#6E90B0] uppercase tracking-widest">
                DEPARTMENT 05 // LEVEL 05
              </span>
              <span className="text-[#35343A]">•</span>
              <span className="text-xs font-mono-code text-[#806B4A]">
                CELESTIAL HORIZONS
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#F2EBDD] mt-1">
              Future Observation Centre
            </h1>
            <p className="text-sm text-[#A9A49A] mt-1">
              Peering into uncharted chapters, cosmic trajectories, and unshakeable sibling backup.
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
              onClick={handleFinishExploration}
              className="px-5 py-2 rounded bg-[#FF453A] text-white text-xs font-mono-code font-semibold hover:bg-[#FF3B30] flex items-center gap-2 shadow-lg shadow-[#FF453A]/20 transition-all animate-pulse"
            >
              <span>COMPLETE ALL 5 DEPTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => {
              setActiveTab('letter');
              sound.playMechanicalKey();
            }}
            className={`px-4 py-2.5 rounded font-mono-code text-xs uppercase tracking-wider border transition-all ${
              activeTab === 'letter'
                ? 'bg-[#6E90B0]/20 border-[#6E90B0] text-white'
                : 'bg-[#191A1F] border-[#35343A] text-[#A9A49A] hover:border-[#6E90B0]/50'
            }`}
          >
            Transmission from Future Aarna
          </button>

          <button
            onClick={() => {
              setActiveTab('archive');
              sound.playMechanicalKey();
            }}
            className={`px-4 py-2.5 rounded font-mono-code text-xs uppercase tracking-wider border transition-all ${
              activeTab === 'archive'
                ? 'bg-[#6E90B0]/20 border-[#6E90B0] text-white'
                : 'bg-[#191A1F] border-[#35343A] text-[#A9A49A] hover:border-[#6E90B0]/50'
            }`}
          >
            Future Birthday Capsule
          </button>

          <button
            onClick={() => {
              setActiveTab('unwritten');
              sound.playMechanicalKey();
            }}
            className={`px-4 py-2.5 rounded font-mono-code text-xs uppercase tracking-wider border transition-all ${
              activeTab === 'unwritten'
                ? 'bg-[#6E90B0]/20 border-[#6E90B0] text-white'
                : 'bg-[#191A1F] border-[#35343A] text-[#A9A49A] hover:border-[#6E90B0]/50'
            }`}
          >
            The Unwritten Chapters
          </button>

          <button
            onClick={() => {
              setActiveTab('write');
              sound.playMechanicalKey();
            }}
            className={`px-4 py-2.5 rounded font-mono-code text-xs uppercase tracking-wider border transition-all ${
              activeTab === 'write'
                ? 'bg-[#6E90B0]/20 border-[#6E90B0] text-white'
                : 'bg-[#191A1F] border-[#35343A] text-[#A9A49A] hover:border-[#6E90B0]/50'
            }`}
          >
            Write To Future Self ✍️
          </button>
        </div>

        {/* EXHIBIT A: LETTER FROM FUTURE AARNA */}
        {activeTab === 'letter' && (
          <div className="institute-card p-8 sm:p-12 border-[#6E90B0]/40 relative">
            <span className="text-xs font-mono-code text-[#6E90B0] uppercase tracking-widest block mb-1">
              ORBITAL TRANSMISSION DECRYPTED // ORIGIN: 2035 AD
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#F2EBDD] mb-6">
              {obsData.exhibits.futureLetter.title}
            </h2>

            <div className="p-4 rounded bg-[#101114] border border-[#35343A] text-sm text-[#cbd5e1] leading-relaxed space-y-4">
              <span className="font-editorial text-lg text-[#6E90B0] block">
                {obsData.exhibits.futureLetter.salutation}
              </span>
              {obsData.exhibits.futureLetter.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <span className="font-editorial italic text-right block text-[#F2EBDD] pt-4">
                {obsData.exhibits.futureLetter.signoff}
              </span>
            </div>

            {/* Secret 4 Trigger Button */}
            <div className="mt-8 pt-4 border-t border-[#35343A] flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#806B4A]">
                CELESTIAL COORDINATES: 44.8° N // 12.4° E
              </span>
              <button
                onClick={() => {
                  sound.playDiscoveryChime();
                  discoverSecret('secret-4');
                }}
                className="text-xs font-mono-code text-[#806B4A] hover:text-[#6E90B0] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6E90B0]" />
                <span>
                  {discoveredSecrets.includes('secret-4')
                    ? '✓ Secret 4 Decrypted'
                    : 'Scan Cosmic Background Frequencies'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* EXHIBIT B: FUTURE BIRTHDAY TIME CAPSULE */}
        {activeTab === 'archive' && (
          <div className="institute-card p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-full border border-[#6E90B0]/40 bg-[#101114] mx-auto flex items-center justify-center text-3xl mb-6">
              {isTimeCapsuleUnlocked ? <Unlock className="w-8 h-8 text-[#6E90B0]" /> : <Lock className="w-8 h-8 text-[#806B4A]" />}
            </div>

            <h2 className="text-2xl font-editorial font-bold text-[#F2EBDD] mb-2">
              {obsData.exhibits.futureBirthdayArchive.title}
            </h2>
            <p className="text-xs font-mono-code text-[#806B4A] mb-8">
              {obsData.exhibits.futureBirthdayArchive.status}
            </p>

            {isTimeCapsuleUnlocked ? (
              <div className="p-6 rounded-lg bg-[#101114] border border-[#6E90B0]/50 max-w-xl mx-auto animate-fade">
                <blockquote className="font-editorial text-lg text-[#F2EBDD] italic leading-relaxed">
                  "{obsData.exhibits.futureBirthdayArchive.unlockedMessage}"
                </blockquote>
              </div>
            ) : (
              <div className="max-w-md mx-auto space-y-6">
                <p className="text-sm text-[#A9A49A]">
                  {obsData.exhibits.futureBirthdayArchive.teaser}
                </p>
                <button
                  onClick={handleUnlockCapsule}
                  className="px-6 py-3 rounded bg-[#6E90B0] text-[#101114] font-display font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all"
                >
                  OVERRIDE & UNLOCK TIME CAPSULE NOW
                </button>
              </div>
            )}
          </div>
        )}

        {/* EXHIBIT C: THE UNWRITTEN CHAPTERS */}
        {activeTab === 'unwritten' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {obsData.exhibits.unwrittenChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="institute-card p-6 rounded-lg border-[#35343A] hover:border-[#6E90B0] transition-all"
              >
                <span className="text-xs font-mono-code text-[#6E90B0] block mb-2">
                  {chapter.id} // UNCHARTED TERRITORY
                </span>
                <h3 className="text-lg font-display font-semibold text-[#F2EBDD] mb-2">
                  {chapter.title}
                </h3>
                <p className="text-xs text-[#A9A49A] leading-relaxed">
                  {chapter.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* INTERACTIVE: WRITE TO FUTURE SELF */}
        {activeTab === 'write' && (
          <div className="institute-card p-8 sm:p-10 border-[#6E90B0]/40">
            <h2 className="text-xl font-editorial font-bold text-[#F2EBDD] mb-2">
              Write a Transmission to Future Aarna
            </h2>
            <p className="text-xs text-[#A9A49A] mb-6">
              Type a promise, a funny note, or an intention for the years ahead. It will be stored in your browser's local time capsule.
            </p>

            <textarea
              value={futureNote}
              onChange={(e) => setFutureNote(e.target.value)}
              placeholder="Dear Future Me, Remember to never stop acting like a pgli gawar..."
              className="w-full h-40 p-4 rounded bg-[#101114] border border-[#35343A] text-sm text-[#F2EBDD] placeholder-[#555] focus:outline-none focus:border-[#6E90B0] font-sans"
            />

            <div className="flex items-center justify-between mt-4">
              {savedNoteStatus ? (
                <span className="text-xs font-mono-code text-[#6E90B0]">
                  {savedNoteStatus}
                </span>
              ) : (
                <span className="text-xs font-mono-code text-[#806B4A]">
                  ENCRYPTION: AES-LOCAL • PERPETUAL
                </span>
              )}

              <button
                onClick={handleSaveFutureNote}
                className="px-6 py-2.5 rounded bg-[#6E90B0] text-[#101114] font-display font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-white transition-all"
              >
                <Save className="w-4 h-4" />
                <span>SAVE TRANSMISSION</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
