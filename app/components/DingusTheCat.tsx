import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Extended props interface to include visibility control
interface DingusTheCatProps extends React.ComponentProps<'group'> {
  visible?: boolean; // Optional visibility prop
}

// DingusTheCat model that can be made invisible and controlled by parent components
export function DingusTheCat(props: DingusTheCatProps) {
  const gltf = useGLTF('/Dingus the cat.glb') as unknown as GLTF
  
  // Extract the visible prop and other props
  const { visible = true, ...groupProps } = props;

  return (
    // Group lets the parent control position/rotation/scale on the whole model
    // Only render if visible is true
    <>
      {visible && (
        <group {...groupProps} dispose={null}>
          <Center>
            <primitive object={gltf.scene} />
          </Center>
        </group>
      )}
    </>
  )
}

useGLTF.preload('/Dingus the cat.glb')


