// components/ModelViewer.tsx
'use client'
import React, { useEffect, useState } from 'react';

const ModelViewer = () => {
  const [color, setColor] = useState('#2f2f2f'); // Default base color

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  useEffect(() => {
    // Dynamically import the model-viewer script only in the client-side
    const loadModelViewer = async () => {
      await import('@google/model-viewer');
    };

    loadModelViewer();
  }, []);

  return (
    <>
      <model-viewer
        src="/bilco16.glb"
        alt="A 3D model of an object"
        ar
        auto-rotate
        camera-controls
        style={{ width: '100vw', height: '500px' }}
        exposure="1"
        environment-image="/MR_INT-003_Kitchen_Pierre1.hdr"
        shadow-intensity="1"
        shadow-softness="0.8"
        interaction-prompt="none"
      >
        {/* <mesh-physical-material
          slot="material"
          normal-map="/normal-map.png"
          occlusion-map="/ao-map1.png"
          roughness="0.5"
          metalness="0.5"
          base-color={color} // Apply the base color here
        >
        </mesh-physical-material> */}
      </model-viewer>

      {/* Color Picker */}
      <label>
        Pick a Color: 
        <input 
          type="color" 
          value={color} 
          onChange={handleColorChange} 
        />
      </label>
    </>
  );
};

export default ModelViewer;
