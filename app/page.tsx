// This directive tells Next.js that this component runs on the client-side
// It's needed because we're using browser-specific features like 3D graphics
'use client';

// Import required components
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import { useState } from 'react';
import { MOUSE } from 'three';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// import { Model as PottedPlant } from './components/PottedPlant';
// import { Cube } from './components/Cube';
import { Background } from './components/background';
import { Bone } from './components/Bone';
import { Ghost } from './components/Ghost';
import { Lantern } from './components/Lantern';
import { Bench } from './components/Bench';
import { BenchWithSkull } from './components/BenchWithSkull';
import { BigTree } from './components/BigTree';
import { Candle1, Candle2, Candle3, Candle4 } from './components/Candles';
import { Cauldron } from './components/Cauldron';
import { Coffin } from './components/Coffin';
import { CoffinWithBone } from './components/CoffinWithBone';
import { DingusTheCat } from './components/DingusTheCat';
import { Grave1, Grave2, Gravemarker } from './components/Graves';
import { HangingLantern, KitchenTable, SmallTable } from './components/PropsAndTables';
import { PlantsAssortedShelfPlants, PostWithSkull, WizardHat, WizardTable } from './components/WizardsAndPlants';
import { Pumpkin1, Pumpkin2, Pumpkin3, Pumpkin4 } from './components/Pumpkins';
import { Ribcage, Skull, SkullCandle } from './components/SkullsAndRibs';
import { Shrine, ShrineWithCandle } from './components/Shrines';
import { Spellbook, TreeDeadLargeDeco } from './components/SpellAndTrees';


// Create XR store - this manages the XR session state
// The store handles entering/exiting AR/VR modes and tracks session status
const store = createXRStore();

function AnimatedGhost({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);

  // Reset animation start when the ghost becomes visible; snap back when hidden
  useEffect(() => {
    if (visible) {
      startTimeRef.current = null; // will be set on the next frame
    } else if (groupRef.current) {
      groupRef.current.position.y = -1; // reset to start Y when hidden
    }
  }, [visible]);

  useFrame((state) => {
    if (!visible || !groupRef.current) return;

    // lazily set the animation start time
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const duration = 3;           // seconds (matches your visibility window)
    const t = state.clock.elapsedTime - startTimeRef.current;
    const progress = Math.min(t / duration, 1); // clamp 0→1 over 3s

    // Animate Y from -1 → 2 over the visible duration
    const y = -1 + progress * (2 - (-1));
    groupRef.current.position.y = y;
  });

  // Keep X/Z fixed where your Ghost currently is; start Y at -1
  return (
    <group ref={groupRef} position={[7.5, -1, -6]}>
      <Ghost scale={1} visible={visible} />
    </group>
  );
}

type V3 = [number, number, number];

function AnimatedDingusTheCat({
  visible,
  position = [0, 0, 0],
  scale = 1,
}: {
  visible: boolean;
  position?: V3;
  scale?: number | V3;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);

  // Reset when visibility changes
  useEffect(() => {
    if (visible) {
      startTimeRef.current = null;     // will set on first frame
    } else if (groupRef.current) {
      groupRef.current.rotation.z = 0; // snap back to center when hidden
    }
  }, [visible]);

  useFrame((state) => {
    if (!visible || !groupRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    // Animate the wobble while visible:
    //  - Visibility window is 4s
    //  - Do 2 full left↔right cycles in that window (0.5 Hz)
    const duration = 4; // seconds
    const cycles = 2;
    const omega = 2 * Math.PI * (cycles / duration);

    const t = state.clock.elapsedTime - startTimeRef.current;
    const maxDeg = 30; // ±30 degrees
    const angleDeg = maxDeg * Math.sin(omega * t);
    groupRef.current.rotation.z = THREE.MathUtils.degToRad(angleDeg);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Keep Dingus' own visibility prop synced */}
      <DingusTheCat visible={visible} scale={scale} />
    </group>
  );
}


// Main homepage component that renders our 3D scene
export default function Home() {
  // State to track if we're in AR mode
  const [isAR, setIsAR] = useState(false);
  // State to track AR status for debugging
  const [arStatus, setArStatus] = useState('Ready');
  // State to control ghost visibility - starts invisible
  const [isGhostVisible, setIsGhostVisible] = useState(false);
  // State to control DingusTheCat visibility - starts invisible
  const [isDingusVisible, setIsDingusVisible] = useState(false);

  // Function to show ghost for 3 seconds when Grave1 is clicked
  const showGhost = () => {
    setIsGhostVisible(true);
    // Hide the ghost after 3 seconds
    setTimeout(() => {
      setIsGhostVisible(false);
    }, 3000);
  };

  // Function to show DingusTheCat for 4 seconds when Cauldron is clicked
  const showDingus = () => {
    setIsDingusVisible(true);
    // Hide DingusTheCat after 4 seconds
    setTimeout(() => {
      setIsDingusVisible(false);
    }, 4000);
  };

  return (
    // Container div that takes up the full viewport (100% width and height)
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* 
        AR/VR Control Buttons
        These buttons allow users to enter and exit XR modes
      */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Status Display */}
        <div style={{
          padding: '8px 12px',
          backgroundColor: arStatus === 'AR Active' ? '#28a745' : arStatus === 'AR Error' ? '#dc3545' : '#6c757d',
          color: 'white',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Status: {arStatus}
        </div>
        <button 
          onClick={async () => {
            try {
              // Check if WebXR is supported
              if (!navigator.xr) {
                alert('WebXR is not supported in this browser. Please use Chrome, Edge, or Firefox on a compatible device.');
                return;
              }

              // Check if AR is supported
              const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
              if (!isSupported) {
                alert('AR is not supported on this device. Please try on a mobile device with AR capabilities.');
                return;
              }

              console.log('Starting AR session...');
              setArStatus('Starting AR...');
              await store.enterAR();
              setIsAR(true);
              setArStatus('AR Active');
              console.log('AR session started successfully!');
            } catch (error) {
              console.error('AR Error:', error);
              setArStatus('AR Error');
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              alert(`AR Error: ${errorMessage}. Please ensure you are using HTTPS and a compatible device.`);
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Enter AR
        </button>
        <button 
          onClick={() => {
            // Exit XR by refreshing the page (simple approach for learning)
            setArStatus('Ready');
            setIsAR(false);
            window.location.reload();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Exit XR
        </button>
      </div>

      {/* 
        Canvas is the main React Three Fiber component that creates a 3D scene
        It sets up WebGL context and handles rendering
        camera prop sets the initial camera position [x, y, z]
      */}
      <Canvas camera={{ position: [5, 5, 5] }}>
        {/* 
          XR Component wraps our 3D content to enable AR/VR functionality
          The store prop connects to our XR session manager
        */}
        <XR store={store}>
        
        {/* 
          LIGHTING SETUP
          We use multiple light sources to create depth and visual interest
        */}
        
        {/* Ambient light provides soft, overall illumination without direction */}
        <ambientLight intensity={0.4} />
        
        {/* Directional light simulates sunlight - comes from one direction */}
        <directionalLight 
          position={[10, 10, 5]}  // Position in 3D space [x, y, z]
          intensity={1.0}         // How bright the light is
          castShadow              // Enable this light to cast shadows
        />
        
        {/* Point light radiates in all directions from a single point */}
        <pointLight 
          position={[-10, -10, -5]}  // Positioned opposite to main light
          intensity={0.5}            // Dimmer than main light
          color="#ffffff"            // Pure white light
        />
        
        {/* Spot light creates a cone of light, like a flashlight */}
        <spotLight
          position={[0, 10, 0]}  // Directly above the scene
          angle={0.3}            // Width of the light cone
          penumbra={1}           // Softness of light edges (0 = sharp, 1 = very soft)
          intensity={0.3}        // Gentle fill light
          castShadow             // Enable shadow casting
        />
        
        {/* 
          3D OBJECTS
          These are our interactive 3D elements in the scene
        */}
        
        {/* Static orange cube positioned at the origin (0, 0, 0) */}
        {/* <Cube /> */}
        
        {/* Interactive potted plant that can be clicked to teleport */}
        {/* <PottedPlant scale={10} /> */}

        {/* Background */}
        <Background position={[0, 3.5, 0]} scale={1} />

        {/* Bone model at origin; adjust scale/position as needed */}
        <Bone position={[7, 0, -1.6]} rotation={[0, 3, 0]}scale={1} />

        {/* Additional models using the same pattern as Bone */}
        <AnimatedGhost visible={isGhostVisible} />
        <Lantern position={[0.8, 0, -5]} scale={1} />
        <Bench position={[4, 0, 7.2]} rotation={[0, 0.1, 0]} scale={1} />
        <BenchWithSkull position={[-3.5, 0, 7.5]} rotation={[0, Math.PI, 0]} scale={1} />
        <Candle1 position={[6, 0, 2.4]} scale={1} />
        {/* Remaining models arranged in a simple grid so they're visible */}
        <Candle2 position={[7, 0, 2.8]} scale={1} />
        <Candle3 position={[7.4, 0, 2.4]} rotation={[0, 1.3, 0]} scale={1} />
        <Candle4 position={[7, 0, 1]} rotation={[0, Math.PI/-2, 0]} scale={1} />
        <Cauldron position={[-4, 0, 0.5]} scale={1} onCauldronClick={showDingus} />
        <Coffin position={[10, 0, -5]} rotation={[0, Math.PI/-8, 0]} scale={1} />
        <CoffinWithBone position={[-5, 0, 2.5]} rotation={[0, Math.PI/2.8, 0]} scale={1} />
        <AnimatedDingusTheCat
          visible={isDingusVisible}
          position={[-4, 1.5, 0.5]}
          scale={0.5}
        />

        <Grave1 position={[7.5, 0, -7.5]} scale={1} onGraveClick={showGhost} />
        <Grave2 position={[10, 0, -8.5]} rotation={[0, Math.PI/-8, 0]} scale={1} />
        <Gravemarker position={[4.8, 0, -5]} scale={1} />
        <KitchenTable position={[-8, 0.5,4]} rotation={[0, Math.PI/-2, 0]} scale={2} />
        <SmallTable position={[-7.3, 0, -5]} rotation={[0, Math.PI/2.4, 0]} scale={1} />
        <PostWithSkull position={[2, 0, 7]} rotation={[0, Math.PI, 0]} scale={1} />
        <WizardHat position={[-6.5, 0, -2.5]} scale={0.3} />
        <WizardTable position={[-5, 0, -5]} scale={1} />
        <Pumpkin1 position={[3.3, 0, -3]} rotation={[0, -0.3, 0]} scale={1} />
        <Pumpkin2 position={[-8, 0, 1]} rotation={[0, 2, 0]} scale={1} />
        <Pumpkin3 position={[3.2, 1, -2.5]} scale={1} />
        <Pumpkin4 position={[4.2, 0, -2]} rotation={[0, 0.2, 0]} scale={0.8} />
        <Ribcage position={[8, 0, -2.5]} rotation={[0, -1, 0]} scale={1} />
        <Skull position={[7, -1, -5]} rotation={[0, -0.5, 0]}scale={1} />
        <SkullCandle position={[-2.7, 0, -3]} rotation={[0, 0.4, 0]} scale={1} />
        <Shrine position={[8.5, 0, 1]} rotation={[0, Math.PI/-2, 0]}  scale={1} />
        <ShrineWithCandle position={[8, 0, -0.8]} rotation={[0, Math.PI/2, 0]} scale={1} />
        <Spellbook position={[-7, 0.7, -4.6]} rotation={[-0.6, 0, 1.2]} scale={0.5} />
        <TreeDeadLargeDeco position={[7.5, 0, 6.5]} rotation={[0, Math.PI/-2, 0]} scale={1} />

        
        {/* 
          SCENE HELPERS
          Visual aids that help users understand the 3D space
        */}
        
        {/* Grid floor provides spatial reference and depth perception */}
        <Grid 
          args={[20, 20]}           // Grid dimensions: 20x20 units
          position={[0, -1, 0]}     // Positioned 1 unit below origin
          cellSize={1}              // Each cell is 1x1 unit
          cellThickness={0.5}       // Thin lines for individual cells
          cellColor="#6f6f6f"       // Gray color for cell lines
          sectionSize={5}           // Major grid lines every 5 cells
          sectionThickness={1}      // Thicker lines for major sections
          sectionColor="#9d4b4b"    // Reddish color for section lines
          fadeDistance={25}         // Grid fades out at this distance
          fadeStrength={1}          // How quickly the fade happens
        />
        
        {/* 
          CAMERA CONTROLS
          OrbitControls allows users to navigate around the 3D scene
          - Left click + drag: Rotate camera around the scene
          - Right click + drag: Pan the camera
          - Scroll wheel: Zoom in and out
          Note: In AR mode, these controls are disabled as the user's device camera controls the view
        */}
        <OrbitControls 
          // Enable/disable based on AR mode
          enablePan={!isAR}     // Middle mouse drag will pan when not in AR
          enableZoom={!isAR}    // Scroll wheel still zooms in/out
          enableRotate={!isAR}  // Left drag rotates when not in AR
          // Remap mouse buttons so middle mouse drag PANS instead of dolly
          // This keeps the scroll wheel for zooming while making middle-drag move the camera
          mouseButtons={{
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.PAN,
            RIGHT: MOUSE.ROTATE
          }}
        />
        
        {/* Close the XR component wrapper */}
        </XR>
      </Canvas>
    </div>
  );
}
