import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SceneId =
  | 'opening'
  | 'personality'
  | 'envelopes'
  | 'memories'
  | 'letter'
  | 'finale'
  | 'invitation'
  | 'personality-lab'
  | 'memory-archive'
  | 'private-file'
  | 'atrium'
  | 'human-impact'
  | 'achievement-museum'
  | 'observatory'
  | 'anomaly';

export interface InstituteState {
  currentScene: SceneId;
  completedDepartments: string[];
  discoveredExhibits: string[];
  discoveredSecrets: string[];
  audioEnabled: boolean;
  reducedMotion: boolean;
  isAnomalyTriggered: boolean;
  isPrivateFileUnlocked: boolean;
  isFinaleUnlocked: boolean;
  isNavMenuOpen: boolean;

  // Actions
  setScene: (scene: SceneId) => void;
  markDepartmentCompleted: (deptId: string) => void;
  discoverExhibit: (id: string) => void;
  discoverSecret: (secretId: string) => void;
  toggleAudio: () => void;
  toggleReducedMotion: () => void;
  setNavMenuOpen: (open: boolean) => void;
  triggerAnomaly: () => void;
  unlockPrivateFile: () => void;
  unlockFinale: () => void;
  resetProgress: () => void;
}

export const ALL_DEPARTMENTS = [
  'personality',
  'envelopes',
  'memories',
  'letter',
  'finale'
];

export const useInstituteStore = create<InstituteState>()(
  persist(
    (set, get) => ({
      currentScene: 'opening',
      completedDepartments: [],
      discoveredExhibits: [],
      discoveredSecrets: [],
      audioEnabled: false,
      reducedMotion: false,
      isAnomalyTriggered: false,
      isPrivateFileUnlocked: false,
      isFinaleUnlocked: false,
      isNavMenuOpen: false,

      setScene: (scene) => set({ currentScene: scene }),

      markDepartmentCompleted: (deptId) => {
        const current = get().completedDepartments;
        if (!current.includes(deptId)) {
          set({ completedDepartments: [...current, deptId] });
        }
      },

      discoverExhibit: (id) => {
        const current = get().discoveredExhibits;
        if (!current.includes(id)) {
          set({ discoveredExhibits: [...current, id] });
        }
      },

      discoverSecret: (secretId) => {
        const current = get().discoveredSecrets;
        if (!current.includes(secretId)) {
          set({ discoveredSecrets: [...current, secretId] });
        }
      },

      toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
      toggleReducedMotion: () => set((s) => ({ reducedMotion: !s.reducedMotion })),
      setNavMenuOpen: (open) => set({ isNavMenuOpen: open }),
      triggerAnomaly: () => set({ isAnomalyTriggered: true }),
      unlockPrivateFile: () => set({ isPrivateFileUnlocked: true, currentScene: 'letter' }),
      unlockFinale: () => set({ isFinaleUnlocked: true, currentScene: 'finale' }),

      resetProgress: () =>
        set({
          currentScene: 'opening',
          completedDepartments: [],
          discoveredExhibits: [],
          discoveredSecrets: [],
          isAnomalyTriggered: false,
          isPrivateFileUnlocked: false,
          isFinaleUnlocked: false,
        }),
    }),
    {
      name: 'uncommon-institute-progress',
      partialize: (state) => ({
        completedDepartments: state.completedDepartments,
        discoveredExhibits: state.discoveredExhibits,
        discoveredSecrets: state.discoveredSecrets,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);
