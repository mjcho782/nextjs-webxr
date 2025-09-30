import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function Pumpkin1(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Pumpkin 1.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Pumpkin 1.glb')

export function Pumpkin2(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Pumpkin 2.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Pumpkin 2.glb')

export function Pumpkin3(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Pumpkin 3.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Pumpkin 3.glb')

export function Pumpkin4(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Pumpkin 4.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Pumpkin 4.glb')


