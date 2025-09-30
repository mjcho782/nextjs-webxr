import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function HangingLantern(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Hanging Lantern.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Hanging Lantern.glb')

export function KitchenTable(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Kitchen Table.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Kitchen Table.glb')

export function SmallTable(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Small Table.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Small Table.glb')


