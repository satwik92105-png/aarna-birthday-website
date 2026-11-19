import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInstituteStore, type SceneId } from '@/store/useInstituteStore';
import institutionData from '@/content/institution.json';
import { sound } from '@/utils/soundEngine';

interface AtriumProps {
  onSelectDepartment: (deptId: SceneId) => void;
}

export const AtriumScene: React.FC<AtriumProps> = ({ onSelectDepartment }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [webglFailed, setWebglFailed] = useState<boolean>(false);
  const { completedDepartments, isAnomalyTriggered, discoverSecret } = useInstituteStore();

  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;
    const interactiveMeshes: THREE.Mesh[] = [];

    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101114);
      scene.fog = new THREE.FogExp2(0x101114, 0.035);

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.set(0, 2.2, 11);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      containerRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D architectural mode.', e);
      setWebglFailed(true);
      return;
    }

    // --- Architectural Construction ---
    // Floor: Dark reflective polished slab
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x14151a,
      roughness: 0.25,
      metalness: 0.6
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid inlays on the floor
    const grid = new THREE.GridHelper(36, 36, 0x35343a, 0x1f2026);
    grid.position.y = 0.01;
    scene.add(grid);

    // Monumental Brutalist Pillars
    const pillarGeo = new THREE.BoxGeometry(0.8, 14, 0.8);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x191a1f,
      roughness: 0.85,
      metalness: 0.1
    });

    const pillarPositions = [
      [-9, 7, -6], [-4.5, 7, -8], [0, 7, -9], [4.5, 7, -8], [9, 7, -6],
      [-9, 7, 2], [-4.5, 7, 4], [4.5, 7, 4], [9, 7, 2]
    ];

    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, y, z);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      scene.add(pillar);
    });

    // Cornerstone Secret Pillar (Clicking it discovers Secret 5!)
    const cornerstoneGeo = new THREE.CylinderGeometry(0.5, 0.6, 1.2, 16);
    const cornerstoneMat = new THREE.MeshStandardMaterial({
      color: 0xb99a65,
      roughness: 0.3,
      metalness: 0.8
    });
    const cornerstone = new THREE.Mesh(cornerstoneGeo, cornerstoneMat);
    cornerstone.position.set(-6.5, 0.6, 2);
    cornerstone.name = 'secret-cornerstone';
    (cornerstone as any).secretId = 'secret-5';
    scene.add(cornerstone);
    interactiveMeshes.push(cornerstone);

    // --- Department Portals (Arranged in a Majestic Semicircle) ---
    const departments = institutionData.departments;
    const radius = 8.5;
    const angleStep = Math.PI / (departments.length + 1);

    departments.forEach((dept, idx) => {
      const angle = Math.PI - angleStep * (idx + 1);
      const px = Math.cos(angle) * radius;
      const pz = -Math.sin(angle) * radius + 2;

      // Gateway Arch Frame
      const archGroup = new THREE.Group();
      archGroup.position.set(px, 0, pz);
      archGroup.lookAt(0, 0, 11);

      // Monumental Portal Slab
      const portalGeo = new THREE.BoxGeometry(2.4, 4.4, 0.3);
      const isCompleted = completedDepartments.includes(dept.id);
      const portalMat = new THREE.MeshStandardMaterial({
        color: isCompleted ? 0x22262d : 0x18191e,
        roughness: 0.3,
        metalness: 0.5,
        emissive: new THREE.Color(dept.accentColor),
        emissiveIntensity: isCompleted ? 0.25 : 0.08
      });

      const portalMesh = new THREE.Mesh(portalGeo, portalMat);
      portalMesh.position.y = 2.2;
      portalMesh.castShadow = true;
      portalMesh.receiveShadow = true;
      portalMesh.name = dept.id;
      (portalMesh as any).deptData = dept;
      archGroup.add(portalMesh);
      interactiveMeshes.push(portalMesh);

      // Glowing Arch Accent Frame
      const frameGeo = new THREE.BoxGeometry(2.6, 4.6, 0.15);
      const frameMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(dept.accentColor),
        wireframe: true
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.y = 2.2;
      archGroup.add(frame);

      // Light beam ascending above portal
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.4, 12, 12);
      const beamMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(dept.accentColor),
        transparent: true,
        opacity: 0.2
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 8;
      archGroup.add(beam);

      scene.add(archGroup);
    });

    // --- Restricted Door: Anomaly Portal (Behind the central chamber) ---
    if (isAnomalyTriggered) {
      const anomalyGroup = new THREE.Group();
      anomalyGroup.position.set(0, 0, -8.2);

      const anomalyGeo = new THREE.BoxGeometry(3.2, 5.2, 0.4);
      const anomalyMat = new THREE.MeshStandardMaterial({
        color: 0x2a1015,
        emissive: 0xb92b27,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.7
      });
      const anomalyMesh = new THREE.Mesh(anomalyGeo, anomalyMat);
      anomalyMesh.position.y = 2.6;
      anomalyMesh.name = 'anomaly';
      (anomalyMesh as any).deptData = {
        id: 'anomaly',
        name: 'RESTRICTED CHAMBER',
        tagline: 'Unregistered Subject Memory',
        accentColor: '#B92B27'
      };
      anomalyGroup.add(anomalyMesh);
      interactiveMeshes.push(anomalyMesh);

      // Anomaly Red Pulser Ring
      const ringGeo = new THREE.TorusGeometry(2.2, 0.05, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 2.6;
      anomalyGroup.add(ring);

      scene.add(anomalyGroup);
    }

    // --- Floating Atmospheric Embers / Stardust ---
    const emberCount = 80;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount * 3; i += 3) {
      emberPositions[i] = (Math.random() - 0.5) * 24;
      emberPositions[i + 1] = Math.random() * 8 + 0.5;
      emberPositions[i + 2] = (Math.random() - 0.5) * 24;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xb99a65,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // --- Warm Directional & Ambient Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.65);
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xb99a65, 2.8, 30, Math.PI / 4, 0.35, 1.2);
    goldSpot.position.set(0, 10, 4);
    goldSpot.castShadow = true;
    goldSpot.shadow.mapSize.width = 1024;
    goldSpot.shadow.mapSize.height = 1024;
    scene.add(goldSpot);

    const amberFill = new THREE.PointLight(0x806b4a, 1.2, 20);
    amberFill.position.set(-8, 6, -2);
    scene.add(amberFill);

    // --- Smooth Mouse Parallax & Raycasting ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 2.2;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetCameraX = mouseX * 2.2;
      targetCameraY = 2.2 + mouseY * 0.8;

      pointer.x = mouseX;
      pointer.y = mouseY;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const topHit = intersects[0].object as THREE.Mesh;
        const deptId = topHit.name;
        setHoveredDept(deptId);
        containerRef.current!.style.cursor = 'pointer';
      } else {
        setHoveredDept(null);
        containerRef.current!.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.name === 'secret-cornerstone') {
          sound.playDiscoveryChime();
          discoverSecret('secret-5');
          return;
        }

        sound.playAccessGranted();
        onSelectDepartment(hit.name as SceneId);
      }
    };

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const containerEl = containerRef.current;
    containerEl.addEventListener('pointermove', handlePointerMove);
    containerEl.addEventListener('click', handleClick);

    // Start background museum drone audio
    sound.startMuseumDrone();

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera lerp
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 1.8, -2);

      // Embers floating
      const positions = emberGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < emberCount * 3; i += 3) {
        positions[i] += delta * 0.35;
        if (positions[i] > 10) positions[i] = 0.5;
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Anomaly pulsing light
      if (isAnomalyTriggered) {
        const pulse = (Math.sin(time * 3) + 1) * 0.5;
        goldSpot.color.setRGB(0.72 + pulse * 0.28, 0.6 - pulse * 0.3, 0.4 - pulse * 0.3);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      containerEl?.removeEventListener('pointermove', handlePointerMove);
      containerEl?.removeEventListener('click', handleClick);

      sound.stopMuseumDrone();

      renderer?.dispose();
      scene?.clear();
      if (containerEl && renderer?.domElement) {
        try {
          containerEl.removeChild(renderer.domElement);
        } catch (_) {}
      }
    };
  }, [completedDepartments, isAnomalyTriggered, onSelectDepartment, discoverSecret]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* 2D Fallback if WebGL fails */}
      {webglFailed && (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#101114]">
          <div className="max-w-2xl text-center">
            <h2 className="text-2xl font-editorial text-[#B99A65] mb-4">
              Atrium Architectural Mode (2D Optimized)
            </h2>
            <p className="text-[#A9A49A] mb-8">
              Select any research department below to commence exploration of Subject Aarna.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {institutionData.departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept.id as SceneId)}
                  className="institute-card p-6 text-left hover:border-[#B99A65]"
                >
                  <span className="text-xs font-mono-code text-[#B99A65] uppercase tracking-wider block mb-1">
                    Department {dept.number}
                  </span>
                  <h3 className="text-lg font-display font-semibold text-[#F2EBDD]">{dept.name}</h3>
                  <p className="text-xs text-[#A9A49A] mt-2">{dept.tagline}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hover Department Card HUD Overlay */}
      {hoveredDept && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 animate-fade">
          <div className="institute-card px-8 py-4 border-[#B99A65]/50 flex items-center gap-6">
            <span className="text-xs font-mono-code text-[#B99A65] uppercase tracking-widest">
              [ CLICK PORTAL TO ENTER ]
            </span>
            <div className="h-4 w-px bg-[#35343A]" />
            <span className="text-sm font-display font-medium text-[#F2EBDD]">
              {hoveredDept === 'anomaly'
                ? 'RESTRICTED CHAMBER // THE CREATOR’S FILE'
                : institutionData.departments.find((d) => d.id === hoveredDept)?.name || hoveredDept}
            </span>
          </div>
        </div>
      )}

      {/* Subtle Spatial Compass Navigation Guide */}
      <div className="absolute top-6 left-6 pointer-events-none text-left">
        <span className="text-[10px] font-mono-code text-[#806B4A] uppercase tracking-widest block">
          CENTRAL HUB // LEVEL 00
        </span>
        <h1 className="text-xl font-editorial font-semibold tracking-wide text-[#F2EBDD]">
          The Grand Atrium
        </h1>
        <p className="text-xs text-[#A9A49A] mt-1">
          Select an entrance to investigate Subject Aarna • Drag to pan perspective
        </p>
      </div>

      {/* Secret Cornerstone Hint Button */}
      <button
        onClick={() => {
          sound.playDiscoveryChime();
          discoverSecret('secret-5');
        }}
        title="Cornerstone Dedication Plaque"
        className="absolute bottom-6 left-6 text-[10px] font-mono-code text-[#35343A] hover:text-[#B99A65] transition-colors p-2"
      >
        ✦ ARCHITECTURAL CORNERSTONE
      </button>
    </div>
  );
};
