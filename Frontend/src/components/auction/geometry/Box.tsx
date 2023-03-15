import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

interface BoxProps {
  position: [number, number, number];
  color: string;
}

const Box: React.FC<BoxProps> = ({ position, color }) => {
  const mesh = useRef<THREE.Mesh>(null);

  // useFrame hook을 사용하여 애니메이션 프레임마다 호출되는 함수 작성
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Box;