import React, { useRef, useState } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'

// Extended props interface for Grave1 to include click callback
interface Grave1Props extends React.ComponentProps<'group'> {
  onGraveClick?: () => void; // Optional callback function for grave click
}

export function Grave1(props: Grave1Props) {
  // Reference to the 3D group object for direct manipulation
  const groupRef = useRef<THREE.Group>(null)
  // State to track if the object is being hovered
  const [isHovered, setIsHovered] = useState(false)
  // State to track if the object has been clicked
  const [isClicked, setIsClicked] = useState(false)
  
  const gltf = useGLTF('/Grave 1.glb') as unknown as GLTF

  // This function runs on every frame to create smooth animations
  useFrame(() => {
    if (groupRef.current) {
      // Apply lightening effect when hovered
      if (isHovered) {
        // Traverse through all objects in the model to find materials
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            // Increase the emissive property to create a glowing effect
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => {
                if (material instanceof THREE.MeshStandardMaterial) {
                  material.emissive.setHex(0x444444) // Add a subtle glow
                }
              })
            } else if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.setHex(0x444444) // Add a subtle glow
            }
          }
        })
      } else {
        // Reset the emissive property when not hovered
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => {
                if (material instanceof THREE.MeshStandardMaterial) {
                  material.emissive.setHex(0x000000) // Remove glow
                }
              })
            } else if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.setHex(0x000000) // Remove glow
            }
          }
        })
      }
    }
  })

  // Function to handle click events
  const handleClick = () => {
    setIsClicked(!isClicked)
    console.log('Grave1 clicked!', isClicked ? 'Activated' : 'Deactivated')
    // Call the parent's callback function to show the ghost
    if (props.onGraveClick) {
      props.onGraveClick()
    }
  }

  return (
    <group 
      ref={groupRef}
      {...props} 
      dispose={null}
      // Mouse event handlers for interactivity
      onPointerOver={(e) => {
        e.stopPropagation() // Prevent event from bubbling up
        setIsHovered(true)
        document.body.style.cursor = 'pointer' // Change cursor to pointer
      }}
      onPointerOut={() => {
        setIsHovered(false)
        document.body.style.cursor = 'auto' // Reset cursor
      }}
      onClick={handleClick}
    >
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Grave 1.glb')

export function Grave2(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Grave 2.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Grave 2.glb')

export function Gravemarker(props: React.ComponentProps<'group'>) {
  const gltf = useGLTF('/Gravemarker.glb') as unknown as GLTF
  return (
    <group {...props} dispose={null}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}
useGLTF.preload('/Gravemarker.glb')


