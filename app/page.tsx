'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import { useState } from 'react';
import { MOUSE } from 'three';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';


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



const store = createXRStore();

function AnimatedGhost({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);


  useEffect(() => {
    if (visible) {
      startTimeRef.current = null;
    } else if (groupRef.current) {
      groupRef.current.position.y = -1; 
    }
  }, [visible]);

  useFrame((state) => {
    if (!visible || !groupRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const duration = 3;           
    const t = state.clock.elapsedTime - startTimeRef.current;
    const progress = Math.min(t / duration, 1); 

    const y = -1 + progress * (2 - (-1));
    groupRef.current.position.y = y;
  });

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

  useEffect(() => {
    if (visible) {
      startTimeRef.current = null;    
    } else if (groupRef.current) {
      groupRef.current.rotation.z = 0; 
    }
  }, [visible]);

  useFrame((state) => {
    if (!visible || !groupRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const duration = 4;
    const cycles = 2;
    const omega = 2 * Math.PI * (cycles / duration);

    const t = state.clock.elapsedTime - startTimeRef.current;
    const maxDeg = 30; 
    const angleDeg = maxDeg * Math.sin(omega * t);
    groupRef.current.rotation.z = THREE.MathUtils.degToRad(angleDeg);
  });

  return (
    <group ref={groupRef} position={position}>
      <DingusTheCat visible={visible} scale={scale} />
    </group>
  );
}


export default function Home() {
  const [isAR, setIsAR] = useState(false);
  const [arStatus, setArStatus] = useState('Ready');
  const [isGhostVisible, setIsGhostVisible] = useState(false);
  const [isDingusVisible, setIsDingusVisible] = useState(false);

  const showGhost = () => {
    setIsGhostVisible(true);
    setTimeout(() => {
      setIsGhostVisible(false);
    }, 3000);
  };

  const showDingus = () => {
    setIsDingusVisible(true);
    setTimeout(() => {
      setIsDingusVisible(false);
    }, 4000);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
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
              if (!navigator.xr) {
                alert('WebXR is not supported in this browser. Please use Chrome, Edge, or Firefox on a compatible device.');
                return;
              }

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

  
      <Canvas camera={{ position: [5, 5, 5] }}>
    
        <XR store={store}>
        
        <ambientLight intensity={0.4} />
        
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.0}      
          castShadow             
        />
        
        <pointLight 
          position={[-10, -10, -5]}  
          intensity={0.5}            
          color="#ffffff"            
        />
        
        <spotLight
          position={[0, 10, 0]}  
          angle={0.3}          
          penumbra={1}          
          intensity={0.3}       
          castShadow       
        />
    
        <Background position={[0, 3.5, 0]} scale={1} />
        <Bone position={[7, 0, -1.6]} rotation={[0, 3, 0]}scale={1} />

        <AnimatedGhost visible={isGhostVisible} />
        <Lantern position={[0.8, 0, -5]} scale={1} />
        <Bench position={[4, 0, 7.2]} rotation={[0, 0.1, 0]} scale={1} />
        <BenchWithSkull position={[-3.5, 0, 7.5]} rotation={[0, Math.PI, 0]} scale={1} />
        <Candle1 position={[6, 0, 2.4]} scale={1} />
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

        
      
        <Grid 
          args={[20, 20]}       
          position={[0, -1, 0]}   
          cellSize={1}             
          cellThickness={0.5}    
          cellColor="#6f6f6f"     
          sectionSize={5}         
          sectionThickness={1}   
          sectionColor="#9d4b4b"   
          fadeDistance={25}      
          fadeStrength={1}         
        />

        <OrbitControls 
          enablePan={!isAR}   
          enableZoom={!isAR}   
          enableRotate={!isAR} 
          mouseButtons={{
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.PAN,
            RIGHT: MOUSE.ROTATE
          }}
        />
      
        </XR>
      </Canvas>
    </div>
  );
}
