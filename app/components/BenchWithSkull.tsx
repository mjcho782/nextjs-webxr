import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function BenchWithSkull(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Bench with skull.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/Bench with skull.glb')


