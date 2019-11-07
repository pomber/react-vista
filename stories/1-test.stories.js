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
} from '../.';

export default {
  title: 'Tests',
};

export const light = () => <LightPlane />;

function LightPlane() {
  return (
    <SceneContainer style={{ height: '100%' }} perspective={100} scale={2}>
      <SceneContent style={{ height: '100%' }}>
        <RotateY degrees={0}>
          <Plane
            w={100}
            h={100}
            style={{ background: '#294' }}
            z={-150}
          ></Plane>
        </RotateY>
        <RotateY degrees={89}>
          <Plane
            w={1000}
            h={100}
            style={{ background: '#819' }}
            z={-150}
          ></Plane>
        </RotateY>
        <RotateY degrees={-89}>
          <Plane
            w={100}
            h={100}
            style={{ background: '#819' }}
            z={-150}
          ></Plane>
        </RotateY>
        <PointLight x={10} y={0} z={0} />
      </SceneContent>
    </SceneContainer>
  );
}
