import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Bone model component that loads the GLB from the public folder
// It accepts standard group props so you can position, rotate, and scale it
export function Bone(props: React.ComponentProps<'group'>) {
  // Load the entire GLB scene from public/Bone.glb
  // The GLB file must be placed in the public/ folder to be served at '/Bone.glb'
  const gltf = useGLTF('/Bone.glb') as unknown as GLTF

  return (
    // Wrap in a group so parent transforms (position/rotation/scale) apply to the whole model
    <group {...props} dispose={null}>
      {/* Center helps ensure the model is centered at the origin for easier placement */}
      <Center>
        {/* Render all meshes and children from the loaded GLB */}
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}

// Preload the GLB so it is cached before first render
useGLTF.preload('/Bone.glb')


