import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function LanternProp(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Lantern.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Lantern.glb')

export function PotionBottleGameAsset(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Potion Bottle - Game Asset.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Potion Bottle - Game Asset.glb')

export function PostWithSkullProp(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Post With Skull.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Post With Skull.glb')


