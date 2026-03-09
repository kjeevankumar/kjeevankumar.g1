
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { Group } from 'three';

interface SkillOrbProps {
  skill: string;
  position: [number, number, number];
  color: string;
}

const SkillOrb: React.FC<SkillOrbProps> = ({ skill, position, color }) => {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial attach="material" color={color} transparent opacity={0.8} />
      </mesh>
      <Text
        position={[0, 0, 0.5]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </group>
  );
};

const SkillSphere: React.FC = () => {
  const skills = [
    { name: 'React', color: '#61dafb', position: [2, 1, 0] as [number, number, number] },
    { name: 'TypeScript', color: '#3178c6', position: [-2, 1, 0] as [number, number, number] },
    { name: 'Python', color: '#3776ab', position: [0, 2, 1] as [number, number, number] },
    { name: 'JavaScript', color: '#f7df1e', position: [1, -1, 2] as [number, number, number] },
    { name: 'CSS', color: '#1572b6', position: [-1, -1, -1] as [number, number, number] },
    { name: 'HTML', color: '#e34f26', position: [0, -2, 0] as [number, number, number] },
  ];

  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#667eea" />
        
        {skills.map((skill, index) => (
          <SkillOrb
            key={index}
            skill={skill.name}
            position={skill.position}
            color={skill.color}
          />
        ))}
        
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default SkillSphere;
