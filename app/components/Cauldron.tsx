import React, { useRef, useState } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'

// Extended props interface for Cauldron to include click callback
interface CauldronProps extends React.ComponentProps<'group'> {
  onCauldronClick?: () => void; // Optional callback function for cauldron click
}

export function Cauldron(props: CauldronProps) {
  // Reference to the 3D group object for direct manipulation
  const groupRef = useRef<THREE.Group>(null)
  // State to track if the object is being hovered
  const [isHovered, setIsHovered] = useState(false)
  // State to track if the object has been clicked
  const [isClicked, setIsClicked] = useState(false)
  // Get the Three.js scene to access materials
  const { scene } = useThree()
  
  const gltf = useGLTF('/Cauldron.glb') as unknown as GLTF

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
                  material.emissive.setHex(0x333333) // Add a subtle glow
                }
              })
            } else if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.setHex(0x333333) // Add a subtle glow
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
    console.log('Cauldron clicked!', isClicked ? 'Activated' : 'Deactivated')
    // Call the parent's callback function to show DingusTheCat
    if (props.onCauldronClick) {
      props.onCauldronClick()
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

useGLTF.preload('/Cauldron.glb')


