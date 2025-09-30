import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function Candle1(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Candle 1.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Candle 1.glb')

export function Candle2(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Candle 2.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Candle 2.glb')

export function Candle3(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Candle 3.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Candle 3.glb')

export function Candle4(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Candle 4.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Candle 4.glb')


