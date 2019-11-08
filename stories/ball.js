import React from 'react';
import { Plane, RotateX, RotateY, NoLights, Move } from '../.';

export default function Ball({ r, x, y, z, color }) {
  const count = 12;
  const angles = Array(count)
    .fill(0)
    .map((_, i) => (i * 360) / count);
  return (
    <NoLights>
      <Move dx={x} dy={y} dz={z}>
        {angles.map((a, i) => (
          <RotateY degrees={a} key={'y' + i}>
            <Plane
              key={'y' + i}
              w={r * 2}
              h={r * 2}
              style={{ borderRadius: '50%', background: color }}
            ></Plane>
          </RotateY>
        ))}
        {angles.map((a, i) => (
          <RotateX degrees={a} key={'x' + i}>
            <Plane
              key={'x' + i}
              w={r * 2}
              h={r * 2}
              style={{ borderRadius: '50%', background: color }}
            ></Plane>
          </RotateX>
        ))}
      </Move>
    </NoLights>
  );
}
