import React, { useEffect, useState } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import { ShieldAlert, Terminal, Lock, KeyRound } from 'lucide-react';

const ANOMALY_LINES = [
  "WARNING: ARCHIVE INTEGRITY COMPROMISED.",
  "DETECTING SPONTANEOUS ANOMALY IN CORE VAULT...",
  "UNREGISTERED MEMORY STREAM INTERCEPTED...",
  "SOURCE CLASSIFICATION: THE CREATOR (SCHOOL BENCH NO. 12)...",
  "PROTOCOL OVERRIDE: SCIENTIFIC PRETEXT COLLAPSING...",
  "STATUS: REAL EMOTIONS DETECTED. NO LABELS CAN HOLD THIS.",
  "RESTRICTED FILE DECRYPTED: FOR AARNA'S EYES ONLY."
];

export const SystemAnomalyScene: React.FC = () => {
  const { unlockPrivateFile } = useInstituteStore();
  const [lineIdx, setLineIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    sound.playAnomalyAlert();

    const interval = setInterval(() => {
      setLineIdx((prev) => {
        if (prev < ANOMALY_LINES.length) {
          setLogs((l) => [...l, ANOMALY_LINES[prev]]);
          sound.playMechanicalKey();
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsDecrypted(true);
          sound.playAccessGranted();
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0a0809] text-[#F2EBDD] select-none relative overflow-hidden">
      {/* Red ambient strobe / alert pulse */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-[#B92B27]/15 via-transparent to-transparent animate-pulse" />

      <div className="relative w-full max-w-2xl institute-card p-8 sm:p-12 border-[#B92B27]/60 shadow-2xl">
        {/* Header Warning */}
        <div className="flex items-center justify-between pb-6 border-b border-[#B92B27]/40 mb-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-[#FF453A] animate-bounce" />
            <span className="text-xs font-mono-code text-[#FF453A] font-bold tracking-widest uppercase">
              SECURITY BREACH // VAULT 00
            </span>
          </div>
          <span className="text-[10px] font-mono-code text-[#806B4A]">
            CODE: OVERRIDE-5546
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-[#F2EBDD] mb-2">
          System Anomaly Detected
        </h1>
        <p className="text-xs text-[#A9A49A] mb-6">
          The institutional diagnostic facade has collapsed under the weight of genuine emotional truth.
        </p>

        {/* Telemetry Output Box */}
        <div className="bg-[#12080a] border border-[#B92B27]/40 rounded p-5 font-mono-code text-xs text-[#FF857A] space-y-2 h-44 overflow-y-auto mb-8">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#B92B27]">›</span>
              <span>{log}</span>
            </div>
          ))}
          {!isDecrypted && (
            <div className="inline-block w-2 h-4 bg-[#FF453A] animate-pulse" />
          )}
        </div>

        {/* Decrypted Action Button */}
        <div className="text-center pt-4 border-t border-[#35343A]">
          <button
            onClick={() => {
              sound.playAccessGranted();
              unlockPrivateFile();
            }}
            disabled={!isDecrypted}
            className={`w-full py-4 rounded font-display font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-500 ${
              isDecrypted
                ? 'bg-gradient-to-r from-[#B92B27] to-[#E5A93C] text-white hover:scale-[1.02] shadow-xl shadow-[#B92B27]/30 cursor-pointer'
                : 'bg-[#191A1F] text-[#806B4A] border border-[#35343A] cursor-not-allowed opacity-50'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>OPEN THE CREATOR’S PRIVATE FILE 💌</span>
          </button>
        </div>
      </div>
    </div>
  );
};
