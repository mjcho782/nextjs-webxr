import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Big Tree model component: loads from public/ and exposes group props
export function BigTree(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Big Tree.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/Big Tree.glb')


