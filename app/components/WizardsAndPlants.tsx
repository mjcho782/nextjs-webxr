import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function PlantsAssortedShelfPlants(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Plants - Assorted shelf plants.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Plants - Assorted shelf plants.glb')

export function PostWithSkull(props: React.ComponentProps<'group'>) {
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

export function WizardHat(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Wizard hat.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Wizard hat.glb')

export function WizardTable(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/wizard table.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/wizard table.glb')


