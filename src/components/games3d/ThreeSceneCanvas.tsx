import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Game3DItem } from '../../types/game3d';

interface ThreeSceneCanvasProps {
  game: Game3DItem;
  // Controls state passed from bottom dock
  wireframe: boolean;
  unfoldProgress: number; // 0 (assembled) to 1 (fully unfolded / exploded)
  solidType?: 'cylinder' | 'cone' | 'sphere'; // For revolution solids
  boxParams: { a: number; b: number; c: number };
  showUnitCubes?: boolean;
  sliceCutY?: number; // 0 to 1
  trigAngleDeg?: number;
  onFireLaser?: () => void;
  laserFired?: boolean;
}

export const ThreeSceneCanvas: React.FC<ThreeSceneCanvasProps> = ({
  game,
  wireframe,
  unfoldProgress,
  solidType = 'cylinder',
  boxParams,
  showUnitCubes = false,
  sliceCutY = 0.5,
  trigAngleDeg = 45,
  laserFired = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const laserBeamRef = useRef<THREE.Line | null>(null);

  // Keep references to current props for the animation loop
  const propsRef = useRef({
    wireframe,
    unfoldProgress,
    solidType,
    boxParams,
    showUnitCubes,
    sliceCutY,
    trigAngleDeg,
    laserFired,
  });

  useEffect(() => {
    propsRef.current = {
      wireframe,
      unfoldProgress,
      solidType,
      boxParams,
      showUnitCubes,
      sliceCutY,
      trigAngleDeg,
      laserFired,
    };
  }, [wireframe, unfoldProgress, solidType, boxParams, showUnitCubes, sliceCutY, trigAngleDeg, laserFired]);

  // Main Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a); // Slate-900 cosmic dark blue
    scene.fog = new THREE.Fog(0x0f172a, 18, 48);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(7, 6, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment reflection map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent camera from going too far below ground
    controls.minDistance = 3;
    controls.maxDistance = 25;
    controls.target.set(0, 1.2, 0);

    // Studio Lighting Rig (≤ 3 Shadow Casters)
    // 1. Cool Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // 2. Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
    keyLight.position.set(8, 12, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    const d = 8;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    scene.add(keyLight);

    // 3. Rim / Accent Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    // Pedestal Ground Platform & Contact Shadow Plane (Composite 3-part base)
    const baseGroup = new THREE.Group();

    // 1. Primary Platform (Polished technological pedestal)
    const platformGeo = new THREE.CylinderGeometry(5.2, 5.5, 0.25, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.85,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.125;
    platform.receiveShadow = !isSoftwareGl;
    baseGroup.add(platform);

    // 2. Neon Coordinate Rim Ring
    const ringGeo = new THREE.RingGeometry(4.7, 4.85, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.002;
    baseGroup.add(ring);

    // 3. Contact Shadow Disc
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.65)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.001;
    baseGroup.add(shadowPlane);

    // Coordinate Grid Helper
    const gridHelper = new THREE.GridHelper(8, 16, 0x3b82f6, 0x334155);
    gridHelper.position.y = 0.003;
    baseGroup.add(gridHelper);

    scene.add(baseGroup);

    // Dynamic Game Content Group
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Laser Beam for Trig Artillery
    const laserMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      linewidth: 3,
      transparent: true,
      opacity: 0,
    });
    const laserGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const laserBeam = new THREE.Line(laserGeo, laserMat);
    scene.add(laserBeam);
    laserBeamRef.current = laserBeam;

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Smooth idle rotation if no interaction
      if (dynamicGroupRef.current) {
        // Slow gentle bobbing or particle update
      }

      // Handle laser pulse fade if fired
      if (laserBeamRef.current) {
        const mat = laserBeamRef.current.material as THREE.LineBasicMaterial;
        if (propsRef.current.laserFired) {
          mat.opacity = 1;
        } else if (mat.opacity > 0) {
          mat.opacity = Math.max(0, mat.opacity - delta * 2.5);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Dynamic 3D Objects whenever game or parameters change
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    // Clear previous children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: any) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
    }

    // BUILD OBJECT BASED ON GAME TYPE
    switch (game.type) {
      case 'box_volume':
        buildBoxVolumeScene(group, boxParams, wireframe, unfoldProgress, showUnitCubes);
        break;

      case 'prism_architect':
        buildPrismScene(group, boxParams, wireframe, unfoldProgress);
        break;

      case 'pyramid_explorer':
        buildPyramidScene(group, boxParams, wireframe, unfoldProgress);
        break;

      case 'cube_identity':
        buildCubeIdentityScene(group, unfoldProgress, wireframe);
        break;

      case 'revolution_solids':
        buildRevolutionSolidsScene(group, solidType, wireframe, sliceCutY);
        break;

      case 'trig_artillery':
        buildTrigArtilleryScene(group, trigAngleDeg, wireframe, laserBeamRef.current);
        break;

      default:
        // Default box display
        buildBoxVolumeScene(group, boxParams, wireframe, unfoldProgress, showUnitCubes);
        break;
    }
  }, [game.type, wireframe, unfoldProgress, solidType, boxParams, showUnitCubes, sliceCutY, trigAngleDeg]);

  return (
    <div className="relative w-full h-full min-h-[460px] select-none overflow-hidden bg-slate-950">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Math Watermark HUD Badge (Top-Left) */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
          <span className="font-bold text-white tracking-wide">{game.title}</span>
          <span className="text-slate-400 font-mono text-[11px]">| Toán {game.grade}</span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono pl-1">
          Kéo chuột để xoay 360° • Cuộn để phóng to / thu nhỏ
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE BUILDER 1: BOX & CUBE PACKER (Khối 6)
// =========================================================================
function buildBoxVolumeScene(
  parent: THREE.Group,
  params: { a: number; b: number; c: number },
  wireframe: boolean,
  unfold: number,
  showUnitCubes: boolean
) {
  const { a, b, c } = params;
  const boxGroup = new THREE.Group();

  // If unit cubes are toggled on, generate individual 1x1x1 cubes with subtle spacing
  if (showUnitCubes) {
    const unitGeo = new THREE.BoxGeometry(0.94, 0.94, 0.94);
    const unitMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
      clearcoat: 0.8,
    });

    const startX = -a / 2 + 0.5;
    const startY = 0.5;
    const startZ = -b / 2 + 0.5;

    for (let x = 0; x < a; x++) {
      for (let y = 0; y < c; y++) {
        for (let z = 0; z < b; z++) {
          const mesh = new THREE.Mesh(unitGeo, unitMat);
          mesh.position.set(startX + x, startY + y, startZ + z);
          mesh.castShadow = true;
          boxGroup.add(mesh);
        }
      }
    }
  } else if (unfold > 0.01) {
    // NET UNFOLD (Bung mở 6 mặt trải phẳng 3D)
    // Face thickness
    const t = 0.04;
    const faceMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      metalness: 0.4,
      wireframe,
      side: THREE.DoubleSide,
    });

    // 1. Bottom Face (Fixed anchor on ground)
    const bottomGeo = new THREE.BoxGeometry(a, t, b);
    const bottomMesh = new THREE.Mesh(bottomGeo, faceMat);
    bottomMesh.position.set(0, t / 2, 0);
    boxGroup.add(bottomMesh);

    // Angle of unfolding: from 0 (closed) to Math.PI / 2 (flat)
    const angle = unfold * (Math.PI / 2);

    // 2. Front Face (rotates forward)
    const frontPivot = new THREE.Group();
    frontPivot.position.set(0, t / 2, b / 2);
    const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(a, c, t), faceMat);
    frontMesh.position.set(0, c / 2, 0);
    frontPivot.add(frontMesh);
    frontPivot.rotation.x = angle;
    boxGroup.add(frontPivot);

    // 3. Back Face (rotates backward)
    const backPivot = new THREE.Group();
    backPivot.position.set(0, t / 2, -b / 2);
    const backMesh = new THREE.Mesh(new THREE.BoxGeometry(a, c, t), faceMat);
    backMesh.position.set(0, c / 2, 0);
    backPivot.add(backMesh);
    backPivot.rotation.x = -angle;
    boxGroup.add(backPivot);

    // Top face is attached to back face
    const topPivot = new THREE.Group();
    topPivot.position.set(0, c, 0);
    const topMesh = new THREE.Mesh(new THREE.BoxGeometry(a, t, b), faceMat);
    topMesh.position.set(0, 0, -b / 2);
    topPivot.add(topMesh);
    topPivot.rotation.x = -angle;
    backMesh.add(topPivot);

    // 4. Left Face (rotates left)
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-a / 2, t / 2, 0);
    const leftMesh = new THREE.Mesh(new THREE.BoxGeometry(t, c, b), faceMat);
    leftMesh.position.set(0, c / 2, 0);
    leftPivot.add(leftMesh);
    leftPivot.rotation.z = angle;
    boxGroup.add(leftPivot);

    // 5. Right Face (rotates right)
    const rightPivot = new THREE.Group();
    rightPivot.position.set(a / 2, t / 2, 0);
    const rightMesh = new THREE.Mesh(new THREE.BoxGeometry(t, c, b), faceMat);
    rightMesh.position.set(0, c / 2, 0);
    rightPivot.add(rightMesh);
    rightPivot.rotation.z = -angle;
    boxGroup.add(rightPivot);
  } else {
    // Normal assembled pristine 3D Box
    const geo = new THREE.BoxGeometry(a, c, b);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      roughness: 0.25,
      metalness: 0.3,
      wireframe,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.9,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = c / 2;
    mesh.castShadow = true;
    boxGroup.add(mesh);

    // Edges Outline
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, linewidth: 2 });
    const wire = new THREE.LineSegments(edges, lineMat);
    wire.position.y = c / 2;
    boxGroup.add(wire);
  }

  parent.add(boxGroup);
}

// =========================================================================
// SCENE BUILDER 2: PRISM ARCHITECT (Khối 7)
// =========================================================================
function buildPrismScene(
  parent: THREE.Group,
  params: { a: number; b: number; c: number },
  wireframe: boolean,
  unfold: number
) {
  const { a, b, c } = params; // a = base side 1, b = base side 2, c = height
  const prismGroup = new THREE.Group();

  // Create Triangular Prism via ExtrudeGeometry
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(a, 0);
  shape.lineTo(0, b);
  shape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: c,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center(); // Center geometry

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x10b981, // Emerald green
    roughness: 0.3,
    metalness: 0.4,
    wireframe,
    clearcoat: 0.7,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = c / 2;
  mesh.castShadow = true;
  prismGroup.add(mesh);

  // Edges
  const edges = new THREE.EdgesGeometry(geo);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 2 });
  const wire = new THREE.LineSegments(edges, lineMat);
  wire.rotation.x = Math.PI / 2;
  wire.position.y = c / 2;
  prismGroup.add(wire);

  parent.add(prismGroup);
}

// =========================================================================
// SCENE BUILDER 3: REGULAR PYRAMID (Khối 8)
// =========================================================================
function buildPyramidScene(
  parent: THREE.Group,
  params: { a: number; c: number },
  wireframe: boolean,
  unfold: number
) {
  const a = params.a || 5;
  const h = params.c || 4;
  const pyrGroup = new THREE.Group();

  // Regular square pyramid geometry: 4 radial segments
  // Cylinder with top radius 0, bottom radius r, 4 segments
  // Radius of circle circumscribing square of side a is a / sqrt(2)
  const radius = a / Math.sqrt(2);
  const geo = new THREE.ConeGeometry(radius, h, 4, 1, false);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b, // Amber gold
    roughness: 0.25,
    metalness: 0.6,
    wireframe,
    clearcoat: 0.8,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.y = Math.PI / 4; // Align square edges along axes
  mesh.position.y = h / 2;
  mesh.castShadow = true;
  pyrGroup.add(mesh);

  // Edges outline
  const edges = new THREE.EdgesGeometry(geo);
  const wire = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xfde047, linewidth: 2 })
  );
  wire.rotation.y = Math.PI / 4;
  wire.position.y = h / 2;
  pyrGroup.add(wire);

  // Visualizing Height (h) rod & Slant Height (d) line inside pyramid
  const heightGeo = new THREE.CylinderGeometry(0.04, 0.04, h);
  const heightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const heightRod = new THREE.Mesh(heightGeo, heightMat);
  heightRod.position.y = h / 2;
  pyrGroup.add(heightRod);

  // Slant height rod on face
  const slantLen = Math.sqrt(h * h + (a / 2) * (a / 2));
  const slantGeo = new THREE.CylinderGeometry(0.04, 0.04, slantLen);
  const slantRod = new THREE.Mesh(slantGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  const slantAngle = Math.atan2(a / 2, h);
  slantRod.position.set(0, h / 2, a / 4);
  slantRod.rotation.x = slantAngle;
  pyrGroup.add(slantRod);

  parent.add(pyrGroup);
}

// =========================================================================
// SCENE BUILDER 4: (a + b)³ IDENTITY CUBE EXPLODER (Khối 8)
// =========================================================================
function buildCubeIdentityScene(parent: THREE.Group, explode: number, wireframe: boolean) {
  const cubeGroup = new THREE.Group();
  const a = 2.4;
  const b = 1.2;

  // Separation distance driven by explode (0 to 1)
  const sep = explode * 1.5;

  // Define 8 sub-blocks: [dx, dy, dz, w, h, d, color, name]
  // Colors: a³ = Blue, a²b = Emerald, ab² = Amber, b³ = Ruby
  const blocks = [
    // 1 x a³
    { x: a / 2, y: a / 2, z: a / 2, w: a, h: a, d: a, col: 0x2563eb, name: 'a³' },
    // 3 x a²b
    { x: a / 2, y: a / 2, z: -b / 2, w: a, h: a, d: b, col: 0x059669, name: 'a²b' },
    { x: a / 2, y: -b / 2, z: a / 2, w: a, h: b, d: a, col: 0x059669, name: 'a²b' },
    { x: -b / 2, y: a / 2, z: a / 2, w: b, h: a, d: a, col: 0x059669, name: 'a²b' },
    // 3 x ab²
    { x: -b / 2, y: -b / 2, z: a / 2, w: b, h: b, d: a, col: 0xd97706, name: 'ab²' },
    { x: -b / 2, y: a / 2, z: -b / 2, w: b, h: a, d: b, col: 0xd97706, name: 'ab²' },
    { x: a / 2, y: -b / 2, z: -b / 2, w: a, h: b, d: b, col: 0xd97706, name: 'ab²' },
    // 1 x b³
    { x: -b / 2, y: -b / 2, z: -b / 2, w: b, h: b, d: b, col: 0xe11d48, name: 'b³' },
  ];

  blocks.forEach((blk) => {
    const geo = new THREE.BoxGeometry(blk.w * 0.98, blk.h * 0.98, blk.d * 0.98);
    const mat = new THREE.MeshPhysicalMaterial({
      color: blk.col,
      roughness: 0.25,
      metalness: 0.4,
      wireframe,
      clearcoat: 0.8,
    });
    const mesh = new THREE.Mesh(geo, mat);

    // Direction vector from center for explosion
    const dirX = Math.sign(blk.x);
    const dirY = Math.sign(blk.y);
    const dirZ = Math.sign(blk.z);

    mesh.position.set(
      blk.x + dirX * sep,
      blk.y + dirY * sep + (a + b) / 2, // Keep grounded
      blk.z + dirZ * sep
    );
    mesh.castShadow = true;
    cubeGroup.add(mesh);

    // Wireframe edge
    const edges = new THREE.EdgesGeometry(geo);
    const wireMesh = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
    );
    wireMesh.position.copy(mesh.position);
    cubeGroup.add(wireMesh);
  });

  parent.add(cubeGroup);
}

// =========================================================================
// SCENE BUILDER 5: REVOLUTION SOLIDS (Khối 9 - Trụ, Nón, Cầu)
// =========================================================================
function buildRevolutionSolidsScene(
  parent: THREE.Group,
  solidType: 'cylinder' | 'cone' | 'sphere',
  wireframe: boolean,
  sliceCutY: number
) {
  const solidGroup = new THREE.Group();
  const radius = 2.2;
  const height = 4.4;

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x8b5cf6, // Violet
    roughness: 0.2,
    metalness: 0.3,
    wireframe,
    clearcoat: 0.9,
    transparent: true,
    opacity: 0.88,
  });

  let mesh: THREE.Mesh;

  if (solidType === 'cylinder') {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 48);
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = height / 2;
  } else if (solidType === 'cone') {
    const geo = new THREE.ConeGeometry(radius, height, 48);
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = height / 2;
  } else {
    const geo = new THREE.SphereGeometry(radius, 48, 48);
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = radius + 0.1;
  }

  mesh.castShadow = true;
  solidGroup.add(mesh);

  // Slicing Cutting Plane (Mặt phẳng cắt lát ngang)
  const cutPlaneGeo = new THREE.PlaneGeometry(6, 6);
  const cutPlaneMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    roughness: 0.1,
    transmission: 0.6,
  });
  const cutPlane = new THREE.Mesh(cutPlaneGeo, cutPlaneMat);
  cutPlane.rotation.x = Math.PI / 2;
  cutPlane.position.y = sliceCutY * height;
  solidGroup.add(cutPlane);

  parent.add(solidGroup);
}

// =========================================================================
// SCENE BUILDER 6: TRIGONOMETRIC ARTILLERY (Khối 9)
// =========================================================================
function buildTrigArtilleryScene(
  parent: THREE.Group,
  angleDeg: number,
  wireframe: boolean,
  laserLine: THREE.Line | null
) {
  const turretGroup = new THREE.Group();

  // 1. Turret Base (Polished titanium pivot)
  const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.4, 32);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.2,
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = 0.2;
  turretGroup.add(baseMesh);

  // 2. Cannon Barrel Group (rotates by angleDeg)
  const barrelGroup = new THREE.Group();
  barrelGroup.position.set(0, 0.5, 0);

  const barrelGeo = new THREE.CylinderGeometry(0.18, 0.25, 3.2, 24);
  const barrelMat = new THREE.MeshPhysicalMaterial({
    color: 0xe11d48, // Crimson red
    metalness: 0.8,
    roughness: 0.25,
    clearcoat: 0.9,
    wireframe,
  });
  const barrel = new THREE.Mesh(barrelGeo, barrelMat);
  barrel.position.y = 1.6;
  barrelGroup.add(barrel);

  // Rotate barrel to elevation angle (from ground up)
  const rad = THREE.MathUtils.degToRad(angleDeg);
  barrelGroup.rotation.z = Math.PI / 2 - rad;
  turretGroup.add(barrelGroup);

  // 3. Target Drone hovering in space at distance d = 5
  const d = 5;
  const targetY = 0.5 + d * Math.tan(rad);
  const targetGeo = new THREE.DodecahedronGeometry(0.45);
  const targetMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.5,
    roughness: 0.3,
    emissive: 0xd97706,
    emissiveIntensity: 0.5,
  });
  const targetMesh = new THREE.Mesh(targetGeo, targetMat);
  targetMesh.position.set(d, targetY, 0);
  turretGroup.add(targetMesh);

  // 4. Update Laser Beam coordinates
  if (laserLine) {
    const positions = laserLine.geometry.attributes.position as THREE.BufferAttribute;
    positions.setXYZ(0, 0, 0.5, 0);
    positions.setXYZ(1, d, targetY, 0);
    positions.needsUpdate = true;
  }

  // 5. Visual Right Triangle Helpers (cạnh kề, cạnh đối, góc alpha)
  const lineMat = new THREE.LineDashedMaterial({
    color: 0x60a5fa,
    dashSize: 0.2,
    gapSize: 0.1,
  });
  const triGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(d, 0.5, 0),
    new THREE.Vector3(d, targetY, 0),
    new THREE.Vector3(0, 0.5, 0),
  ]);
  const triWire = new THREE.Line(triGeo, lineMat);
  triWire.computeLineDistances();
  turretGroup.add(triWire);

  parent.add(turretGroup);
}
