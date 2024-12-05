'use client'

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from "three/examples/jsm/Addons.js";
import { HexColorInput } from "react-colorful";
import Image from "next/image";
import { PopoverPicker } from "./components/PopoverPicker";


const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#bb6565");
  const modelRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [lights, setLights] = useState<{ keyLight: THREE.SpotLight; fillLight: THREE.SpotLight; backLight: THREE.SpotLight } | null>(null); // Use state to store lights
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLight, setSelectedLight] = useState(0);
  const [loadingAssets, setLoadingAssets] = useState(0); // New state for tracking loading assets
  const [hideTextOverlay, setHideTextOverlay] = useState(false); // New state for tracking loading assets



  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
  
      const init = async () => {
        if (rendererRef.current) return;
  
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setAnimationLoop(animate);
        renderer.setPixelRatio(window.devicePixelRatio);
        console.log(window.innerWidth, 'inner');
        
        if(window.innerWidth > 726) {
          renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        } else {
          renderer.setSize(window.innerWidth, window.innerHeight / 2.5);
        }
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
  
        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement);
        }
  
        rendererRef.current = renderer;
  
        let camera: THREE.PerspectiveCamera;
                
        if(window.innerWidth > 726) {
          camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.05, 20);
          camera.position.set(0.45, 0.45, 0.45);
        } else {
          camera = new THREE.PerspectiveCamera(50, window.innerWidth / (window.innerHeight / 2.5), 0.05, 20);
          camera.position.set(0.35, 0.35, 0.35);
        }
  
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.enableRotate = true; // Allow rotation of the model
        controls.enableZoom = false;
        controls.autoRotate = false;
  
        const rgbeLoader = new EXRLoader().setPath('/');
        const gltfLoader = new GLTFLoader().setPath('/');
  

        // Increment by 3 for environment texture, normal map, and AO map
        setLoadingAssets(3);

        const environmentTexture = rgbeLoader.loadAsync('sunset.exr')
          .then((texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping; // Ensure correct mapping for reflections
            scene.environment = texture;
            return texture;
          })
          .finally(() => setLoadingAssets(prev => prev - 1));

        const normalMapPromise = new THREE.TextureLoader().loadAsync('/baked details.001-min.png')
          .finally(() => setLoadingAssets(prev => prev - 1));

        const aoMapPromise = new THREE.TextureLoader().loadAsync('/ao_map-min.png')
          .finally(() => setLoadingAssets(prev => prev - 1));

        const gltfPromise = gltfLoader.loadAsync('bilco23.glb')
          .then((gltf) => {
            modelRef.current = gltf.scene;
            return gltf.scene;
          });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [environment, normalMap, aoMap, model] = await Promise.all([
          environmentTexture,
          normalMapPromise,
          aoMapPromise,
          gltfPromise,
        ]);
        if (model) {
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              aoMap.flipY = false;
              normalMap.flipY = false;

              mesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(color),
                aoMap: aoMap,
                normalMap: normalMap,
                aoMapIntensity: 1,
                roughness: 2,
              });
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              if(window.innerWidth > 726) {
                mesh.scale.set(0.3, 0.3, 0.3);
              } else {
                mesh.scale.set(0.4, 0.4, 0.4);
              }
              mesh.rotation.set(0, 1.2, 0);
            }
          });
          scene.add(model);
        }

        scene.background = new THREE.Color('#090A0A');

  
        // Setup lights in fixed positions in the scene
        const initializedLights = setupLights(scene);
        setLights(initializedLights);
  
        // Animation loop
        function animate() {
          renderer.render(scene, camera);
        }
        animate();
      };
  
      init();

      
    }
  }, []);


// Setup the lights and place them in fixed positions in the scene
const setupLights = (scene: THREE.Scene) => {
  // Key Light (Main Light)
  const keyLight = new THREE.SpotLight(0xffffff, 2); // Default intensity
  keyLight.position.set(5, 5, 5); // Fixed position
  keyLight.castShadow = true; // Casts shadow for realism
  scene.add(keyLight);

  // Fill Light
  const fillLight = new THREE.SpotLight(0xffffff, 1); // Softer fill light
  fillLight.position.set(-5, 2, 5); // Fixed position on the opposite side of the Key Light
  fillLight.castShadow = true; // Optional: Shadows for extra realism
  scene.add(fillLight);

  // Back Light (Rim Light)
  const backLight = new THREE.SpotLight(0xffffff, 1.2); // Light from behind
  backLight.position.set(0, 5, -5); // Fixed position behind the model
  backLight.castShadow = true;
  scene.add(backLight);

  return { keyLight, fillLight, backLight }; // Return references for controlling luminance
};

// Define luminance values
const luminanceValues = {
  low: 300,
  medium: 450,
  high: 500,
};

// Function to change the luminance of the main light
const switchMainLightLuminance = (keyLight: THREE.SpotLight, level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      keyLight.intensity = luminanceValues.low;
      keyLight.color.set("#FFFFFF");
      break;
    case 'medium':
      keyLight.intensity = luminanceValues.medium;
      keyLight.color.set("#ADD8E6");
      break;
    case 'high':
      keyLight.intensity = luminanceValues.high;
      keyLight.color.set("#ADD8E6");
      break;
  }
};

const handleSetLuminance = (level: 'low' | 'medium' | 'high') => {
  if (lights) {
    switchMainLightLuminance(lights.keyLight, level);
  }
};


useEffect(() => {
  if (modelRef.current) {
    const blendFactor = 0.98; // Adjust the blend factor (0 = full gray, 1 = full user color)
    const baseColor = new THREE.Color("#A9A9A9"); // Gray base
    const userColor = new THREE.Color(color); // User-selected color
    const blendedColor = baseColor.clone().lerp(userColor, blendFactor); // Blend the two colors

    modelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const mesh = child as THREE.Mesh;
        // Check if material is an array or a single material
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.color.set(blendedColor);
            }
          });
        } else {
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color.set(blendedColor);
          }
        }
      }
    });
  }
}, [color]);

useEffect(() => {
  if (loadingAssets === 0) {
    setIsLoading(false);
  }
}, [loadingAssets]);
	

useEffect(() => {
  const modelOverText = document.getElementById('overlayText');
  modelOverText?.addEventListener('mousedown', () => {
    setHideTextOverlay(true);
  })

  return () => {
    modelOverText?.removeEventListener('mousedown', () => {
      setHideTextOverlay(false);
    })
  }
}, [])

  return (
    <div className="p-4 pt-0 flex flex-col gap-4 justify-center items-center w-full">
      {
        isLoading &&
          <div className="w-full flex justify-center items-center relative" style={{ height: 'calc(100vh / 2.5)'}}>
            <div className="w-12 h-12 animate-spin transition-all rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
            </div>
            <p className="text-base text-[#f3f3f6] ms-3">Loading</p>
          </div>
      }
      <div className="relative"  id="overlayText">
        <div ref={containerRef} />
        {!hideTextOverlay && !isLoading && <div className="w-max absolute top-1/2 left-1/2 flex gap-x-4 justify-center items-center rounded-full px-5 py-3 bg-[#2d2d2f] -translate-x-1/2">
          <Image src={'/images/drag-icon.svg'} width={20} height={20} alt="outside" className="drag-icon" />
          <p className="font-thin text-base text-[#f3f3f6]">Click and drag to rotate</p>
        </div>}
      </div>
      <p className="text-[#f3f3f6] text-base lg:text-[1.375rem] lg:leading-[1.75rem] lg:text-xl text-center">Bring your vision to life with Bilco&apos;s proprietary color precision technology.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row gap-x-16 mt-5">

        <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="border border-[#f3f3f6] rounded-full ps-4 pe-6 py-3 relative max-w-full h-fit flex flex-row gap-x-3 lg:gap-x-9 justify-between">
            <div className="px-2 w-1/3 lg:w-[130px] flex flex-row">
              <span className="text-[#969696]">#</span>
            <HexColorInput
              color={color}
              onChange={setColor}
              prefix="#"
              type="text"
              className=" bg-transparent rounded-lg placeholder:text-[#969696] text-[#969696] uppercase colorInput"
              />
              </div>
            <div className="flex flex-row gap-x-4 cursor-pointer" >
              <p className="text-base text-[#f3f3f6] uppercase">Select a color</p>
              <PopoverPicker color={color} onChange={setColor} />
            </div>
          </div>
          <p className="text-[#969696] text-base">Brick Color</p>

        </div>

        <div className="flex flex-col justify-center items-center gap-y-2 mt-6 lg:mt-0">
          <div className="flex flex-row gap-2 justify-between items-center bg-[#2D2D2F] rounded-full px-2 w-full">
            <div className={`flex flex-col gap-2 justify-center items-center relative ${selectedLight === 0 ? 'bg-[#f3f3f6]' : 'bg-transparent'} rounded-full px-10 py-4 h-[80%] transition-all duration-300`}>
              <button
                name="street light"
                className="rounded-full w-full h-full cursor-pointer transition-all absolute z-10"
                onClick={() => {
                  handleSetLuminance('low');
                  setSelectedLight(0);
                }}
              />
              <Image className={`${selectedLight === 0 ? 'invert' : 'invert-0'} w-auto h-5`} src={'/images/outside.svg'} width={20} height={20} alt="outside" />
            </div>
            <div className={`flex flex-col gap-2 justify-center items-center relative ${selectedLight === 1 ? 'bg-[#f3f3f6]' : 'bg-transparent'} rounded-full px-10 py-4 h-[80%] transition-all duration-300`}>
              <button
                name="room light"
                className="rounded-full w-full h-full cursor-pointer transition-all absolute z-10"
                onClick={() => {
                  handleSetLuminance('medium');
                  setSelectedLight(1);
                }}
              />
              <Image className={`${selectedLight === 1 ? 'invert-0' : 'invert'}`} src={'/images/house.svg'} width={20} height={20} alt="outside" />
            </div>
            <div className={`flex flex-col gap-2 justify-center items-center relative ${selectedLight === 2 ? 'bg-[#f3f3f6]' : 'bg-transparent'} rounded-full px-10 py-4 h-[80%] transition-all duration-300`}>
              <button
                name="appartement light"
                className="rounded-full w-full h-full cursor-pointer transition-all absolute z-10"
                onClick={() => {
                  handleSetLuminance('high');
                  setSelectedLight(2);
                }}
              />
              <Image className={`${selectedLight === 2 ? 'invert' : 'invert-0'}`} src={'/images/biulding.svg'} width={20} height={20} alt="outside" />
            </div>
          </div>
          <p className="text-[#969696] text-base ">Light Source</p>

        </div>

      </div>

      <p className="text-[#969696] text-center text-sm lg:text-base mt-14 lg:mt-10">This tool does not accurately represent the final color.<br/>Actual color saturation and vibrancy may vary on real material.</p>
    </div>
  );
};


export default ThreeScene;
