"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Scene() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const count = 50; // Grid size 50x50 = 2500 points
  
  const [positions, linePositions] = useMemo(() => {
    const pos = [];
    
    // Create a terrain grid
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i - count / 2) * 0.5;
        const z = (j - count / 2) * 0.5;
        const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5;
        pos.push(x, y, z);
      }
    }

    const lines = [];
    // Connect adjacent points to form a wireframe grid
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = i * count + j;
        if (i < count - 1) {
          // Connect to right
          const rightIndex = (i + 1) * count + j;
          lines.push(
            pos[index * 3], pos[index * 3 + 1], pos[index * 3 + 2],
            pos[rightIndex * 3], pos[rightIndex * 3 + 1], pos[rightIndex * 3 + 2]
          );
        }
        if (j < count - 1) {
          // Connect to bottom
          const bottomIndex = i * count + (j + 1);
          lines.push(
            pos[index * 3], pos[index * 3 + 1], pos[index * 3 + 2],
            pos[bottomIndex * 3], pos[bottomIndex * 3 + 1], pos[bottomIndex * 3 + 2]
          );
        }
      }
    }
    
    return [new Float32Array(pos), new Float32Array(lines)];
  }, []);

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
      const time = state.clock.elapsedTime * 0.5;

      const posAttribute = pointsRef.current.geometry.attributes.position;
      const linePosAttribute = linesRef.current.geometry.attributes.position;

      // Animate points to create a wave
      for (let i = 0; i < posAttribute.count; i++) {
        const x = posAttribute.getX(i);
        const z = posAttribute.getZ(i);
        const y = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time) * 1.5;
        posAttribute.setY(i, y);
      }
      posAttribute.needsUpdate = true;

      // Animate lines to match points
      // We know lines array has 2 points per line segment, mapped exactly from points
      let lineIdx = 0;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const index = i * count + j;
          const y = posAttribute.getY(index);
          
          if (i < count - 1) {
            const rightIndex = (i + 1) * count + j;
            const yRight = posAttribute.getY(rightIndex);
            
            linePosAttribute.setY(lineIdx * 2, y);
            linePosAttribute.setY(lineIdx * 2 + 1, yRight);
            lineIdx++;
          }
          if (j < count - 1) {
            const bottomIndex = i * count + (j + 1);
            const yBottom = posAttribute.getY(bottomIndex);
            
            linePosAttribute.setY(lineIdx * 2, y);
            linePosAttribute.setY(lineIdx * 2 + 1, yBottom);
            lineIdx++;
          }
        }
      }
      linePosAttribute.needsUpdate = true;

      // Mouse interactivity
      const targetX = state.pointer.x * 2;
      const targetY = state.pointer.y * 2 + 2; // Offset rotation slightly
      
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, Math.PI / 4 + targetY * 0.1, 0.05);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetX * 0.1, 0.05);
      
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
    }
  });

  return (
    <group position={[0, -2, -10]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#F59B0B"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
