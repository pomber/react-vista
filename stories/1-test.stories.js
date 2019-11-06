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
  RotateX,
  RotateY,
} from '../.';

export default {
  title: 'Tests',
};

export const light = () => <LightPlane />;

function LightPlane() {
  return (
    <SceneContainer style={{ height: '100%' }} perspective={20} scale={1}>
      <SceneContent style={{ height: '100%', width: '100%' }}>
        <Plane w={200} h={100} style={{ background: '#294' }}></Plane>
        <PointLight x={100} y={100} z={30} />
      </SceneContent>
    </SceneContainer>
  );
}
