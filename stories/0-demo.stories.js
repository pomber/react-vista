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
  NoLights,
  Move,
} from '../.';

export default {
  title: 'Demo',
};

export const cube = () => <HalfCube />;

function HalfCube() {
  const side = 100;
  const [x, setX] = React.useState(0.5);
  const [y, setY] = React.useState(0.5);
  const [z, setZ] = React.useState(0.5);
  return (
    <div>
      <SceneContainer
        style={{ height: window.innerHeight }}
        perspective={side * 10}
        scale={2}
      >
        <SceneContent style={{ height: '100%', width: '100%' }}>
          <RotateX degrees={-30}>
            <RotateY degrees={-45}>
              {/* Floor */}
              <Floor
                w={side}
                h={side}
                pinX="left"
                pinY="top"
                style={{ background: '#717483', overflow: 'hidden' }}
              >
                <Slider
                  value={x}
                  setValue={setX}
                  style={{
                    top: 0,
                    transform: 'translateY(-50%)',
                  }}
                />
                <Slider
                  value={z}
                  setValue={setZ}
                  style={{
                    top: 0,
                    transformOrigin: 'left',
                    transform: 'translateY(-50%) rotateZ(90deg)',
                  }}
                />
              </Floor>
              {/* Left */}
              <LWall
                w={side}
                h={side}
                pinX="right"
                pinY="bottom"
                style={{ background: '#817473', overflow: 'hidden' }}
              >
                <Slider
                  value={z}
                  setValue={setZ}
                  style={{
                    bottom: 0,
                    transform: 'translateY(50%) rotateZ(180deg)',
                  }}
                />
                <Slider
                  value={y}
                  setValue={setY}
                  style={{
                    transformOrigin: 'right',
                    top: 0,
                    transform: 'translateY(-50%) rotateZ(-90deg)',
                  }}
                />
              </LWall>
              {/* Back */}
              <Plane
                w={side}
                h={side}
                pinX="left"
                pinY="bottom"
                style={{ background: '#718473', overflow: 'hidden' }}
              >
                <Slider
                  value={y}
                  setValue={setY}
                  style={{
                    bottom: 0,
                    transformOrigin: 'left',
                    transform: 'translateY(50%) rotateZ(-90deg)',
                  }}
                />
                <Slider
                  value={x}
                  setValue={setX}
                  style={{
                    bottom: 0,
                    transform: 'translateY(50%) ',
                  }}
                />
              </Plane>
              <NoLights>
                <Ball
                  r={side / 20}
                  x={x * side}
                  y={-y * side}
                  z={z * side}
                  style={{ background: '#fdb813' }}
                ></Ball>
              </NoLights>
              <PointLight x={x * side} y={y * side} z={z * side} />
            </RotateY>
          </RotateX>
        </SceneContent>
      </SceneContainer>
    </div>
  );
}

function Ball({ r, x, y, z, style }) {
  const count = 12;
  const angles = Array(count)
    .fill(0)
    .map((_, i) => (i * 360) / count);
  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        position: 'absolute',
      }}
    >
      <Move dx={x} dy={y} dz={z}>
        {angles.map((a, i) => (
          <RotateY degrees={a}>
            <Plane
              key={'y' + i}
              w={r * 2}
              h={r * 2}
              style={{ borderRadius: '50%', ...style }}
            ></Plane>
          </RotateY>
        ))}
        {angles.map((a, i) => (
          <RotateX degrees={a}>
            <Plane
              key={'x' + i}
              w={r * 2}
              h={r * 2}
              style={{ borderRadius: '50%', ...style }}
            ></Plane>
          </RotateX>
        ))}
      </Move>
    </div>
  );
}

function Slider({ value, setValue, style }) {
  return (
    <input
      type="range"
      value={value}
      onChange={e => setValue(Math.max(+e.target.value, 0.1))}
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
