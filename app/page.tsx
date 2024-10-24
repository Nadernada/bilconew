'use client'

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from "three/examples/jsm/Addons.js";
import { HexColorInput, HexColorPicker } from "react-colorful";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#cccccc");
  const modelRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [lights, setLights] = useState<{ keyLight: THREE.SpotLight; fillLight: THREE.SpotLight; backLight: THREE.SpotLight } | null>(null); // Use state to store lights

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();

      const init = async () => {
        if (rendererRef.current) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setAnimationLoop(animate);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement);
        }

        rendererRef.current = renderer;

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.05, 20);
        camera.position.set(0.35, 0.35, 0.35);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.enableRotate = true; // Disable rotation of the entire scene
        controls.enableZoom = false;
        controls.autoRotate = false;

        const rgbeLoader = new EXRLoader().setPath('/');
        const gltfLoader = new GLTFLoader().setPath('/');

        const [texture, gltf] = await Promise.all([
          rgbeLoader.loadAsync('sunset.exr'),
          gltfLoader.loadAsync('bilco22.glb'),
        ]);

				const normalMap = new THREE.TextureLoader().load('/baked details.001.png');
        const aoMap = new THREE.TextureLoader().load('/ao_map.png');
        aoMap.flipY = false;
        normalMap.flipY = false;

        modelRef.current = gltf.scene;
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
							color: new THREE.Color(color),
              aoMap: aoMap,
              normalMap: normalMap,
              aoMapIntensity: 1,
							roughness: 2,
              blendColor: '#cccccc'
            });
            // mesh.material.blending = THREE.MultiplyBlending;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            mesh.scale.set(0.5, 0.5, 0.5);
            mesh.rotation.set(0, -1.7, 1.7);
          }
        });

        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.add(gltf.scene);

        const initializedLights = setupLights(scene);
        setLights(initializedLights); // Save the lights to state

        // Animation loop
        function animate() {
          renderer.render(scene, camera);
        }
        animate();
      };

      init();
    }
  }, []);

	// Setup the lights
const setupLights = (scene: THREE.Scene) => {
  // Key Light (Main Light)
  const keyLight = new THREE.SpotLight(0xffffff, 10); // Default intensity
  keyLight.position.set(5, 5, 5); // Adjust position
  keyLight.castShadow = true; // Casts shadow for realism
  scene.add(keyLight);

  // Fill Light
  const fillLight = new THREE.SpotLight(0xffffff, 0.8); // Softer fill light
  fillLight.position.set(-5, 2, 5); // Position on the opposite side of the Key Light
  fillLight.castShadow = true; // Optional: Shadows for extra realism
  scene.add(fillLight);

  // Back Light (Rim Light)
  const backsdLight = new THREE.SpotLight(0xffffff, 1.2); // Light from behind
  backsdLight.position.set(5, 5, 5); // Position behind the model
  backsdLight.castShadow = true;
  scene.add(backsdLight);

  // Back Light (Rim Light)
  const backLight = new THREE.SpotLight(0xffffff, 1.2); // Light from behind
  backLight.position.set(0, 5, -5); // Position behind the model
  backLight.castShadow = true;
  scene.add(backLight);

  return { keyLight, fillLight, backLight }; // Return references for controlling luminance
};

// Define luminance values
const luminanceValues = {
  low: 10,
  medium: 25,
  high: 35,
};

// Function to change the luminance of the main light
const switchMainLightLuminance = (keyLight: THREE.SpotLight, level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      keyLight.intensity = luminanceValues.low;
      break;
    case 'medium':
      keyLight.intensity = luminanceValues.medium;
      break;
    case 'high':
      keyLight.intensity = luminanceValues.high;
      break;
  }
};

const handleSetLuminance = (level: 'low' | 'medium' | 'high') => {
  if (lights) {
    switchMainLightLuminance(lights.keyLight, level);
  }
};


  // Update material color dynamically
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
				if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
					const mesh = child as THREE.Mesh;
					// Check if material is an array or a single material
					if (Array.isArray(mesh.material)) {
						mesh.material.forEach((material) => {
							if (material instanceof THREE.MeshStandardMaterial) {
								material.color.set(color);
							}
						});
					} else {
						if (mesh.material instanceof THREE.MeshStandardMaterial) {
							mesh.material.color.set(color);
						}
					}
				}
      });
    }
  }, [color]);
	

  return (
    <div className="p-4 flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <div ref={containerRef} />
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} className="p-2 rounded-lg border border-slate-500 placeholder:text-slate-700 text-slate-700" />
      <div className="flex flex-row gap-2 justify-center items-center">
				<div className="flex flex-col gap-2 justify-center items-center">
					<button
						className="bg-yellow-100 rounded-full w-10 h-10 cursor-pointer hover:bg-slate-200 transition-all"
						onClick={() => handleSetLuminance('low')}
					/>
					<p className="text-slate-100 text-base">Light 1</p>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center">
					<button
						className="bg-yellow-200 rounded-full w-10 h-10 cursor-pointer hover:bg-slate-200 transition-all"
						onClick={() => handleSetLuminance('medium')}
					/>
					<p className="text-slate-100 text-base">Light 2</p>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center">
					<button
						className="bg-yellow-400 rounded-full w-10 h-10 cursor-pointer hover:bg-slate-200 transition-all"
						onClick={() => handleSetLuminance('high')}
					/>
					<p className="text-slate-100 text-base">Light 3</p>
				</div>
      </div>

    </div>
  );
};


export default ThreeScene;
