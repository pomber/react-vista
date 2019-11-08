import React from 'react';
import {
  Plane,
  Roof,
  Floor,
  LWall,
  RWall,
  PointLight,
  SceneContent,
  SceneContainer,
  Move,
  RotateX,
  RotateY,
  NoLights,
} from '../.';
import Ball from './ball';

export default function TwoLights() {
  const height = 400;
  const width = 400;
  const floorColor = '#bbb';
  const floorY = 50;
  const light1x = -width / 2;
  const light1color = '#539ed8';
  const light2x = width / 2;
  const light2color = '#f9bc00';

  return (
    <SceneContainer
      style={{ height: '100%' }}
      perspective={1000}
      scale={2}
      origin={{ y: 0, x: 0.5 }}
    >
      <SceneContent style={{ height: '100%' }}>
        <Floor
          turn={1}
          w={width}
          h={height}
          y={floorY}
          style={{ background: floorColor }}
        ></Floor>

        <Ball color={light1color} x={light1x} r={10} y={-floorY} />
        <Ball color={light2color} x={light2x} r={10} y={-floorY} />
        <PointLight x={light1x} color={light1color} y={floorY - 100} />
      </SceneContent>
    </SceneContainer>
  );
}
