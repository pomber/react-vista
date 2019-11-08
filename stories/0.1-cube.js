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

import useWindowSize from './use-window-size';
import Ball from './ball';

export default function HalfCube() {
  const side = 100;
  const [x, setX] = React.useState(0.5);
  const [y, setY] = React.useState(0.7);
  const [z, setZ] = React.useState(0.3);
  const [backColor, setBackColor] = React.useState('#886666');
  const [leftColor, setLeftColor] = React.useState('#668866');
  const [floorColor, setFloorColor] = React.useState('#666688');
  const [lightColor, setLightColor] = React.useState('#FDB813');
  const [angle, setAngle] = React.useState(-45);
  const [vw, vh] = useWindowSize();
  const scale = Math.min((0.4 * vw) / side, 2.5);
  return (
    <SceneContainer
      style={{ height: vh, color: '#fafafa' }}
      perspective={side * 10}
      scale={scale}
    >
      <SceneContent style={{ height: '100%', width: '100%' }}>
        <NoLights>
          <Plane w={side} h={side * 0.3} y={-side} pinX="center" pinY="bottom">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              Light
              <input
                type="color"
                value={lightColor}
                onChange={e => setLightColor(e.target.value)}
              />
            </div>

            <input
              type="range"
              min={-90}
              max={0}
              step={1}
              style={{ marginTop: '16px', width: '100%' }}
              value={angle}
              onChange={e => setAngle(+e.target.value)}
            />
          </Plane>
        </NoLights>
        <RotateX degrees={-30}>
          <RotateY degrees={angle}>
            {/* Floor */}
            <Floor
              w={side}
              h={side}
              pinX="left"
              pinY="top"
              style={{ background: floorColor, overflow: 'hidden' }}
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
              <ColorPicker
                color={floorColor}
                setColor={setFloorColor}
                style={{ bottom: '10%', right: '10%' }}
              />
            </Floor>
            {/* Left */}
            <LWall
              w={side}
              h={side}
              pinX="right"
              pinY="bottom"
              style={{ background: leftColor, overflow: 'hidden' }}
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
              <ColorPicker
                color={leftColor}
                setColor={setLeftColor}
                style={{ top: '10%', left: '10%' }}
              />
            </LWall>
            {/* Back */}
            <Plane
              w={side}
              h={side}
              pinX="left"
              pinY="bottom"
              style={{ background: backColor, overflow: 'hidden' }}
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
              <ColorPicker
                color={backColor}
                setColor={setBackColor}
                style={{ top: '10%', right: '10%' }}
              />
            </Plane>
            <Ball
              r={side / 20}
              x={x * side}
              y={-y * side}
              z={z * side}
              color={lightColor}
            ></Ball>
            <PointLight
              x={x * side}
              y={-y * side}
              z={z * side}
              color={lightColor}
            />
          </RotateY>
        </RotateX>
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

function ColorPicker({ color, setColor, style }) {
  return (
    <div
      style={{
        position: 'absolute',
        ...style,
      }}
    >
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
    </div>
  );
}
