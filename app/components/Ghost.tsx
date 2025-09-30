import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Extended props interface to include visibility control
interface GhostProps extends React.ComponentProps<'group'> {
  visible?: boolean; // Optional visibility prop
}

// Ghost model that can be made invisible and controlled by parent components
export function Ghost(props: GhostProps) {
  // Load the entire GLB scene from the public folder
  const gltf = useGLTF('/ghost.glb') as unknown as GLTF
  
  // Extract the visible prop and other props
  const { visible = true, ...groupProps } = props;

  return (
    // Group lets the parent control position/rotation/scale on the whole model
    // Only render if visible is true
    <>
      {visible && (
        <group {...groupProps} dispose={null}>
          {/* Center keeps the model around the origin for easier placement */}
          <Center>
            {/* Render the full scene graph from the GLB */}
            <primitive object={gltf.scene} />
          </Center>
        </group>
      )}
    </>
  )
}

// Preload so it's cached before first use
useGLTF.preload('/ghost.glb')


