import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function Ribcage(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Ribcage.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Ribcage.glb')

export function Skull(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Skull.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Skull.glb')

export function SkullCandle(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Skull Candle.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Skull Candle.glb')


