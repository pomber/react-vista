import React from 'react';
import { useScale, TransformBase } from './context';
import { useLights } from './lights';

type PlaneProps = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
  pinX?: 'left' | 'center' | 'right';
  pinY?: 'top' | 'center' | 'bottom';
  rotate?: {
    x: number;
    y: number;
    z: number;
    a: number;
  };
};

export function Plane({
  children,
  style,
  x = 0,
  y = 0,
  z = 0,
  w,
  h,
  pinX = 'center',
  pinY = 'center',
  rotate,
}: PlaneProps) {
  const scale = useScale();
  const dx = pinX === 'center' ? '-50%' : pinX === 'right' ? '-100%' : '0%';
  const dy = pinY === 'center' ? '-50%' : pinY === 'bottom' ? '-100%' : '0%';
  // console.log('lights in plane', lights);
  const { filter, lightStyle } = useLights();
  let rotation = rotate
    ? ` rotate3d(${rotate.x},${rotate.y},${rotate.z},${rotate.a}deg)`
    : '';
  return (
    <React.Fragment>
      {filter}
      <div
        style={{
          ...lightStyle,
          ...style,
          position: 'absolute',
          boxSizing: 'border-box',
          transformOrigin: `${pinX} ${pinY}`,
          transformStyle: 'preserve-3d',
          width: w != null ? w * scale : undefined,
          height: h != null ? h * scale : undefined,
          transform:
            `translate(${dx},${dy}) translateX(${x * scale}px) translateY(${y *
              scale}px) translateZ(${z * scale}px)` + rotation,
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
}

type WallProps = Omit<PlaneProps, 'rotate'> & { turn?: number };

export function Roof({ turn = 1, ...props }: WallProps) {
  return <Plane {...props} rotate={{ x: 1, y: 0, z: 0, a: turn * -90 }} />;
}
export function Floor({ turn = 1, ...props }: WallProps) {
  return <Plane {...props} rotate={{ x: 1, y: 0, z: 0, a: turn * 90 }} />;
}
export function RWall({ turn = 1, ...props }: WallProps) {
  return <Plane {...props} rotate={{ x: 0, y: 1, z: 0, a: turn * -90 }} />;
}
export function LWall({ turn = 1, ...props }: WallProps) {
  return <Plane {...props} rotate={{ x: 0, y: 1, z: 0, a: turn * 90 }} />;
}

type RotateProps = {
  children?: React.ReactNode;
  degrees: number;
};

export function RotateX({ degrees, children }: RotateProps) {
  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotate3d(1,0,0,${degrees}deg)`,
        position: 'absolute',
      }}
    >
      {children}
    </div>
  );
}

export function RotateY({ degrees, children }: RotateProps) {
  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotate3d(0,1,0,${degrees}deg)`,
        position: 'absolute',
      }}
    >
      {children}
    </div>
  );
}

export function RotateZ({ degrees, children }: RotateProps) {
  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotate3d(0,0,1,${degrees}deg)`,
        position: 'absolute',
      }}
    >
      <TransformBase transformation={[]}>{children}</TransformBase>
    </div>
  );
}

type MoveProps = {
  dx?: number;
  dy?: number;
  dz?: number;
  children?: React.ReactNode;
};

export function Move({ dx = 0, dy = 0, dz = 0, children }: MoveProps) {
  const scale = useScale();
  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        transform: `translateX(${dx * scale}px) translateY(${dy *
          scale}px) translateZ(${dz * scale}px)`,
      }}
    >
      {children}
    </div>
  );
}
