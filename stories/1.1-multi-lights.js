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
import useWindowSize from './use-window-size';

export default function MultiLights() {
  const height = 400;
  const width = 400;
  const floorColor = '#bbb';
  const floorY = 50;
  const light1x = -width / 2;
  const light1color = '#539ed8';
  const light2x = width / 2;
  const light2color = '#f9bc00';
  const [vw] = useWindowSize();
  const light3color = '#c30083';
  const lightsY = floorY - 60;

  return (
    <SceneContainer
      style={{ height: '100%' }}
      perspective={1000}
      scale={(0.7 * vw) / width}
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

        <Ball color={light1color} x={light1x} r={10} y={lightsY} />
        <PointLight x={light1x} color={light1color} y={lightsY} />
        <Ball color={light2color} x={light2x} r={10} y={lightsY} />
        <PointLight x={light2x} color={light2color} y={lightsY} />
        <Ball color={light3color} x={0} r={10} y={lightsY} z={-height / 2} />
        <PointLight x={0} color={light3color} y={lightsY} z={-height / 2} />
      </SceneContent>
    </SceneContainer>
  );
}
