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
  RotateZ,
} from '../.';
import Ball from './ball';
import useWindowSize from './use-window-size';

export default function InfinityStones() {
  const [vw, vh] = useWindowSize();
  const scale = Math.min(vw / 100, 10);
  return (
    <SceneContainer
      style={{ height: '100%' }}
      perspective={10000}
      scale={scale}
    >
      <SceneContent style={{ height: vh }}>
        <Plane
          w={vw / scale}
          h={vh / scale}
          style={{ background: '#fff' }}
        ></Plane>
        <Stone color="blue" angle={0} />
        <Stone color="green" angle={-60} />
        <Stone color="yellow" angle={-120} />
        <Stone color="orange" angle={-180} />
        <Stone color="red" angle={-240} />
        <Stone color="violet" angle={-300} />
      </SceneContent>
    </SceneContainer>
  );
}

function Stone({ color, angle }) {
  return (
    <RotateZ degrees={angle}>
      <Move dy={-25}>
        {/* <Ball color={color} r={2} x={0} y={0} z={40} /> */}
        <PointLight color={color} x={0} y={0} z={3} />
      </Move>
    </RotateZ>
  );
}
