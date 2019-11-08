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
import MultiLights from './1.1-multi-lights';

export default {
  title: 'Tests',
};

export const multiLights = () => <MultiLights />;
