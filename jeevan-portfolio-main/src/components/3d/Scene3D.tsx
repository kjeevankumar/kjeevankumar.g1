
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { Mesh } from 'three';

const FloatingGeometry: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
      <meshStandardMaterial attach="material" color="#667eea" transparent opacity={0.7} />
    </Box>
  );
};

const FloatingSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.3]}>
      <meshStandardMaterial attach="material" color="#764ba2" transparent opacity={0.6} />
    </Sphere>
  );
};

const FloatingTorus: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Torus ref={meshRef} position={position} args={[0.4, 0.1, 16, 32]}>
      <meshStandardMaterial attach="material" color="#f093fb" transparent opacity={0.5} />
    </Torus>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#667eea" />
        
        <FloatingGeometry position={[-3, 2, -2]} />
        <FloatingGeometry position={[3, -1, -1]} />
        <FloatingSphere position={[-2, -2, -3]} />
        <FloatingSphere position={[2, 2, -2]} />
        <FloatingTorus position={[0, -3, -4]} />
        <FloatingTorus position={[-4, 1, -3]} />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
