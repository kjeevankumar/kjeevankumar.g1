
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { Group } from 'three';

interface ProjectCard3DProps {
  title: string;
  description: string;
  tech: string[];
}

const Card3D: React.FC<{ title: string; isHovered: boolean }> = ({ title, isHovered }) => {
  const meshRef = useRef<Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      if (isHovered) {
        meshRef.current.rotation.y = Math.PI;
        meshRef.current.position.z = 0.5;
      } else {
        meshRef.current.rotation.y = 0;
        meshRef.current.position.z = 0;
      }
    }
  });

  return (
    <group ref={meshRef}>
      <Box args={[3, 2, 0.1]}>
        <meshStandardMaterial attach="material" color="#667eea" />
      </Box>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {title}
      </Text>
    </group>
  );
};

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ title, description, tech }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-full h-64 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        
        <Card3D title={title} isHovered={hovered} />
      </Canvas>
    </div>
  );
};

export default ProjectCard3D;
