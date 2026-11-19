import React from 'react';
import { AtriumScene } from '@/three/environments/AtriumScene';
import { useInstituteStore, type SceneId } from '@/store/useInstituteStore';

export const AtriumSceneWrapper: React.FC = () => {
  const { setScene } = useInstituteStore();

  const handleSelect = (deptId: SceneId) => {
    setScene(deptId);
  };

  return (
    <div className="w-full h-screen relative bg-[#101114]">
      <AtriumScene onSelectDepartment={handleSelect} />
    </div>
  );
};
