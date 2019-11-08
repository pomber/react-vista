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
  RotateZ,
  NoLights,
  Move,
} from '../.';

import useWindowSize from './use-window-size';

export default function Spotlights() {
  const side = 100;
  const [x, setX] = React.useState(0.5);
  const [y, setY] = React.useState(0.7);
  const [z, setZ] = React.useState(0.3);
  const [toX, setToX] = React.useState(0.5);
  const [toY, setToY] = React.useState(0.7);
  const [toZ, setToZ] = React.useState(0.3);
  const [vw, vh] = useWindowSize();
  const scale = Math.min(0.4 * vw, 4);

  return (
    <SceneContainer
      style={{ height: vh, color: '#fafafa' }}
      perspective={side * 10}
      scale={scale}
      origin={{ x: 0.5, y: 0 }}
    >
      <SceneContent style={{ height: '100%', width: '100%' }}>
        <RotateY degrees={-15}>
          <RotateX degrees={-15}>
            <Floor style={{ background: '#fff0' }} w={side} h={side} y={-50}>
              <Slider
                value={x}
                setValue={setX}
                style={{
                  bottom: 0,
                  transform: 'translateY(50%)',
                }}
              />
              <Slider
                value={z}
                setValue={setZ}
                style={{
                  top: 0,
                  transformOrigin: 'left',
                  transform: 'translateY(-50%) rotate(90deg)',
                }}
              />
            </Floor>
            <Floor style={{ background: 'green' }} w={side} h={side} y={50}>
              <Slider
                value={toX}
                setValue={setToX}
                style={{
                  bottom: 0,
                  transform: 'translateY(50%)',
                }}
              />
              <Slider
                value={toZ}
                setValue={setToZ}
                style={{
                  top: 0,
                  transformOrigin: 'left',
                  transform: 'translateY(-50%) rotate(90deg)',
                }}
              />
            </Floor>
            <SpotLight
              x={x * side - side / 2}
              y={-50}
              z={z * side - side / 2}
              toX={toX * side - side / 2}
              toY={50}
              toZ={toZ * side - side / 2}
            />
          </RotateX>
        </RotateY>
      </SceneContent>
    </SceneContainer>
  );
}

function Slider({ value, setValue, style }) {
  return (
    <input
      type="range"
      value={value}
      onChange={e => setValue(Math.max(+e.target.value, 0.01))}
      max={1}
      min={0}
      step={0.01}
      style={{
        position: 'absolute',
        width: '100%',
        margin: 0,
        ...style,
      }}
    />
  );
}

function SpotLight({ x, y, z, toX, toY, toZ }) {
  const h = 6;
  const w = 4;
  const style = { background: '#b888' };
  const dx = x - toX;
  const dy = toY - y;
  const zAngle = (Math.atan2(dx, dy) * 180) / Math.PI;
  const dz = toZ - z;
  const xAngle = (Math.atan2(dz, dy) * 180) / Math.PI;
  return (
    <Move dx={x} dy={y} dz={z}>
      <RotateZ degrees={zAngle}>
        <RotateX degrees={xAngle}>
          <Plane pinY="top" w={w} h={h} z={-w / 2} style={style} />
          <Plane pinY="top" w={w} h={h} z={+w / 2} style={style} />
          <LWall pinY="top" x={-w / 2} w={w} h={h} style={style} />
          <RWall pinY="top" x={+w / 2} w={w} h={h} style={style} />
        </RotateX>
      </RotateZ>
    </Move>
  );
}
