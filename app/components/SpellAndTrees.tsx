import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function Spellbook(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Spellbook.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Spellbook.glb')

export function TreeDeadLargeDeco(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Tree Dead Large Deco.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Tree Dead Large Deco.glb')


