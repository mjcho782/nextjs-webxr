import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function CoffinWithBone(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Coffin with bone.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/Coffin with bone.glb')


