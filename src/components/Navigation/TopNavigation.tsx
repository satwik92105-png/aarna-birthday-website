import React from 'react';
import { useInstituteStore, type SceneId } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

const SCENE_STEPS: { id: SceneId; label: string; number: string }[] = [
  { id: 'opening', label: 'Opening', number: '01' },
  { id: 'personality', label: 'Diagnostics', number: '02' },
  { id: 'envelopes', label: 'Envelopes', number: '03' },
  { id: 'memories', label: 'Archive', number: '04' },
  { id: 'letter', label: 'Letter', number: '05' },
  { id: 'finale', label: 'Finale', number: '06' },
];

export const TopNavigation: React.FC = () => {
  const { currentScene, setScene, audioEnabled, toggleAudio } = useInstituteStore();

  const handleAudioToggle = () => {
    toggleAudio();
    sound.setMuted(!audioEnabled);
    if (!audioEnabled) {
      sound.playAccessGranted();
    }
  };

  // Normalize current scene for stepper
  const activeId =
    currentScene === 'invitation' ? 'opening' :
    currentScene === 'personality-lab' ? 'personality' :
    currentScene === 'memory-archive' ? 'memories' :
    currentScene === 'private-file' ? 'letter' :
    currentScene;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 flex items-center justify-between bg-[#101114]/80 backdrop-blur-xl border-b border-[#2a2930]/60 select-none">
      {/* Brand & Codename */}
      <div
        onClick={() => setScene('opening')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-2 h-2 rounded-full bg-[#B99A65] group-hover:scale-150 transition-transform" />
        <span className="font-editorial text-lg tracking-wider text-[#F2EBDD] group-hover:text-[#B99A65] transition-colors">
          THE UNCOMMON
        </span>
        <span className="hidden sm:inline font-mono text-[10px] text-[#6b6760] tracking-widest uppercase">
          // AARNA [A-5546]
        </span>
      </div>

      {/* Progress Stepper */}
      <nav className="hidden md:flex items-center gap-6">
        {SCENE_STEPS.map((step) => {
          const isActive = activeId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                sound.playMechanicalKey();
                setScene(step.id);
              }}
              className={`flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#B99A65] font-semibold'
                  : 'text-[#6b6760] hover:text-[#A9A49A]'
              }`}
            >
              <span className="text-[9px] opacity-60">{step.number}</span>
              <span>{step.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Audio Controller */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleAudioToggle}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181920] border border-[#2e2d36] font-mono text-[10px] text-[#A9A49A] hover:text-[#B99A65] hover:border-[#B99A65]/50 transition-all cursor-pointer"
        >
          {audioEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#B99A65]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#6b6760]" />
          )}
          <span>{audioEnabled ? 'SOUND: ON' : 'ENABLE SOUND'}</span>
        </button>
      </div>
    </header>
  );
};
