// Reusable GLB model components for all public/*.glb assets (except background, Bone, potted-plant)
// Each component loads its corresponding GLB from the Next.js public folder and renders the
// entire scene using a primitive. Components accept standard group props so you can
// position, rotate, and scale from the parent. Center is used to make placement easier.

import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Helper to create a component that loads a GLB at a given public path
function createModelComponent(publicPath: string) {
  // We return a typed React component that accepts standard group props
  return function ModelComponent(props: React.ComponentProps<'group'>) {
    // Load the entire GLB scene; the file must exist in the public/ folder
    const gltf = useGLTF(publicPath) as unknown as GLTF
    return (
      // Wrap with group so parent props (position/rotation/scale) apply to whole model
      <group {...props} dispose={null}>
        {/* Center keeps the model around the origin for predictable placement */}
        <Center>
          {/* Render the whole model scene graph */}
          <primitive object={gltf.scene} />
        </Center>
      </group>
    )
  }
}

// NOTE: For each component below, you can set default transforms in the parent usage, e.g.:
// <Bench position={[0,0,0]} scale={1.2} rotation={[0, Math.PI/4, 0]} />

export const BenchWithSkull = createModelComponent('/Bench with skull.glb')
useGLTF.preload('/Bench with skull.glb')

export const Bench = createModelComponent('/Bench.glb')
useGLTF.preload('/Bench.glb')

export const BigTree = createModelComponent('/Big Tree.glb')
useGLTF.preload('/Big Tree.glb')

export const Candle1 = createModelComponent('/Candle 1.glb')
useGLTF.preload('/Candle 1.glb')

export const Candle2 = createModelComponent('/Candle 2.glb')
useGLTF.preload('/Candle 2.glb')

export const Candle3 = createModelComponent('/Candle 3.glb')
useGLTF.preload('/Candle 3.glb')

export const Candle4 = createModelComponent('/Candle 4.glb')
useGLTF.preload('/Candle 4.glb')

export const Cauldron = createModelComponent('/Cauldron.glb')
useGLTF.preload('/Cauldron.glb')

export const CoffinWithBone = createModelComponent('/Coffin with bone.glb')
useGLTF.preload('/Coffin with bone.glb')

export const Coffin = createModelComponent('/Coffin.glb')
useGLTF.preload('/Coffin.glb')

export const DingusTheCat = createModelComponent('/Dingus the cat.glb')
useGLTF.preload('/Dingus the cat.glb')

export const Ghost = createModelComponent('/ghost.glb')
useGLTF.preload('/ghost.glb')

export const Grave1 = createModelComponent('/Grave 1.glb')
useGLTF.preload('/Grave 1.glb')

export const Grave2 = createModelComponent('/Grave 2.glb')
useGLTF.preload('/Grave 2.glb')

export const Gravemarker = createModelComponent('/Gravemarker.glb')
useGLTF.preload('/Gravemarker.glb')

export const HangingLantern = createModelComponent('/Hanging Lantern.glb')
useGLTF.preload('/Hanging Lantern.glb')

export const KitchenTable = createModelComponent('/Kitchen Table.glb')
useGLTF.preload('/Kitchen Table.glb')

export const Lantern = createModelComponent('/Lantern.glb')
useGLTF.preload('/Lantern.glb')

export const PlantsAssortedShelfPlants = createModelComponent('/Plants - Assorted shelf plants.glb')
useGLTF.preload('/Plants - Assorted shelf plants.glb')

export const PostWithSkull = createModelComponent('/Post With Skull.glb')
useGLTF.preload('/Post With Skull.glb')

export const PotionBottleGameAsset = createModelComponent('/Potion Bottle - Game Asset.glb')
useGLTF.preload('/Potion Bottle - Game Asset.glb')

export const Pumpkin1 = createModelComponent('/Pumpkin 1.glb')
useGLTF.preload('/Pumpkin 1.glb')

export const Pumpkin2 = createModelComponent('/Pumpkin 2.glb')
useGLTF.preload('/Pumpkin 2.glb')

export const Pumpkin3 = createModelComponent('/Pumpkin 3.glb')
useGLTF.preload('/Pumpkin 3.glb')

export const Pumpkin4 = createModelComponent('/Pumpkin 4.glb')
useGLTF.preload('/Pumpkin 4.glb')

export const Ribcage = createModelComponent('/Ribcage.glb')
useGLTF.preload('/Ribcage.glb')

export const ShrineWithCandle = createModelComponent('/Shrine with candle.glb')
useGLTF.preload('/Shrine with candle.glb')

export const Shrine = createModelComponent('/Shrine.glb')
useGLTF.preload('/Shrine.glb')

export const SkullCandle = createModelComponent('/Skull Candle.glb')
useGLTF.preload('/Skull Candle.glb')

export const Skull = createModelComponent('/Skull.glb')
useGLTF.preload('/Skull.glb')

export const SmallTable = createModelComponent('/Small Table.glb')
useGLTF.preload('/Small Table.glb')

export const Spellbook = createModelComponent('/Spellbook.glb')
useGLTF.preload('/Spellbook.glb')

export const TreeDeadLargeDeco = createModelComponent('/Tree Dead Large Deco.glb')
useGLTF.preload('/Tree Dead Large Deco.glb')

export const WizardHat = createModelComponent('/Wizard hat.glb')
useGLTF.preload('/Wizard hat.glb')

export const WizardTable = createModelComponent('/wizard table.glb')
useGLTF.preload('/wizard table.glb')


