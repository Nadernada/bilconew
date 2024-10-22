'use client'

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { HexColorPicker } from "react-colorful";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#cccccc");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentLight, setCurrentLight] = useState(0);
  const modelRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<THREE.Light[]>([]); // Store references to lights
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Keep track of renderer


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();

      const init = async () => {

				if (rendererRef.current) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setAnimationLoop(animate);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth /2, window.innerHeight /2);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // Append the renderer to the containerRef div instead of document.body
        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement);
        }

				rendererRef.current = renderer; // Store the renderer in the ref

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.05, 20);
        camera.position.set(0.35, 0.05, 0.35);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.minPolarAngle = Math.PI / 2; // Restrict vertical rotation (only horizontal)
        controls.maxPolarAngle = Math.PI / 2; // Restrict vertical rotation (only horizontal)
        controls.autoRotateSpeed = -0.5;
				controls.target.set(0, 0.2, 0);
        controls.update();

        const rgbeLoader = new RGBELoader().setPath('/');
        const gltfLoader = new GLTFLoader().setPath('/');

        const [texture, gltf] = await Promise.all([
          rgbeLoader.loadAsync('environment.hdr'),
          gltfLoader.loadAsync('bilco19.glb'),
        ]);

        const normalMap = new THREE.TextureLoader().load('/normal-map1.png');
        const aoMap = new THREE.TextureLoader().load('/ao_map2.png');
        aoMap.flipY = false;
        normalMap.flipY = false;

        modelRef.current = gltf.scene;
        gltf.scene.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) { // Type cast to `THREE.Mesh`
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              aoMap: aoMap,
              normalMap: normalMap,
              aoMapIntensity: 1.0,
            });
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.add(gltf.scene);

        // Add three light sources with different luminance
        const lights = [
          new THREE.PointLight(0xffffff, 50, 100),
          new THREE.PointLight(0xffffff, 80, 100),
          new THREE.PointLight(0xffffff, 100, 100),
        ];

        lights.forEach((light, i) => {
          light.position.set(1, 2, 3); // Adjust positions as needed
          lightsRef.current.push(light);
          scene.add(light);
          if (i > 0) light.visible = false; // Only show the first light initially
        });

				const spotLight = new THREE.SpotLight( 0xffffff, 50 );
				spotLight.position.set( 2.5, 5, 2.5 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 1;
				spotLight.decay = 2;
				spotLight.distance = 0;
				// spotLight.map = textures[ '/disturb.jpg' ];

				spotLight.castShadow = true;
				spotLight.shadow.mapSize.width = 1024;
				spotLight.shadow.mapSize.height = 1024;
				spotLight.shadow.camera.near = 1;
				spotLight.shadow.camera.far = 10;
				spotLight.shadow.focus = 1;
				scene.add( spotLight );

				const lightHelper = new THREE.SpotLightHelper( spotLight );
				scene.add( lightHelper );


        function animate() {
          if (modelRef.current) {
            // Rotate the model
						modelRef.current.traverse((child) => {
							if ((child as THREE.Mesh).isMesh) { // Type cast to `THREE.Mesh`
								const mesh = child as THREE.Mesh;
								mesh.rotation.y += 0.002; // Rotate only along the Y-axis
							}
						});
					}

          renderer.render(scene, camera);
        }
				animate();
      };

      init();
    }
  }, []);

  // Update material color dynamically
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
				if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) { // Type cast to `THREE.Mesh`
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

  // Function to change the light
  const handleLightChange = (lightIndex: number) => {
    lightsRef.current.forEach((light, index) => {
      light.visible = index === lightIndex;
    });
    setCurrentLight(lightIndex);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <div className="p-4 flex flex-col gap-4 justify-center items-center h-screen w-screen">
			<div className="p-4">
				<div ref={containerRef} />
			</div>
      <HexColorPicker color={color} onChange={handleColorChange} />
      <div className="flex flex-row gap-2 justify-center items-center">
				<div className="flex flex-col gap-2 justify-center items-center">
					<button className="bg-yellow-200 rounded-full w-10 h-10 cursor-pointer hover:bg-yellow-400 transition-all" onClick={() => handleLightChange(0)}></button>
					<p className="text-slate-100 text-base">Light 1</p>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center">
					<button className="bg-yellow-300 rounded-full w-10 h-10 cursor-pointer hover:bg-yellow-400 transition-all" onClick={() => handleLightChange(1)}></button>
					<p className="text-slate-100 text-base">Light 2</p>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center">
					<button className="bg-yellow-400 rounded-full w-10 h-10 cursor-pointer hover:bg-yellow-400 transition-all" onClick={() => handleLightChange(2)}></button>
					<p className="text-slate-100 text-base">Light 3</p>
				</div>
      </div>
    </div>
  );
};

export default ThreeScene;
