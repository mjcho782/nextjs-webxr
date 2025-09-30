import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Background renders the entire GLB scene from public/background.glb
// It accepts standard group props so you can position/rotate/scale it from the parent scene.
export function Background({ scale = 0.1, ...props }: React.ComponentProps<'group'>) {
  // Load the full GLB. Everything inside the file (meshes, materials, children) is in gltf.scene
  const gltf = useGLTF('/background.glb') as unknown as GLTF

  return (
    // Use a group wrapper so parent props like position/rotation/scale apply to the whole background
    <group {...props} scale={scale} dispose={null}>
      {/* Center ensures the model is centered around the origin so it's visible */}
      <Center>
        {/* Render the entire scene graph from the GLB */}
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}

// Preload the asset so it is cached before the component mounts
useGLTF.preload('/background.glb')