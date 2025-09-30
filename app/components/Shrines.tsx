import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function Shrine(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Shrine.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Shrine.glb')

export function ShrineWithCandle(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Shrine with candle.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Shrine with candle.glb')


