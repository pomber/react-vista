import React from 'react';
import { useScale, TransformBase, useSceneContext } from './context';
import { useLights } from './lights';
import {
  rotateZ,
  rotateY,
  rotateX,
  translate,
  dot,
  matrix3d,
} from './transform';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type PlaneProps = {
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
  pinX?: 'left' | 'center' | 'right';
  pinY?: 'top' | 'center' | 'bottom';
} & DivProps;

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
  ...rest
}: PlaneProps) {
  const { scale, base } = useSceneContext();
  const dx = pinX === 'center' ? '-50%' : pinX === 'right' ? '-100%' : '0%';
  const dy = pinY === 'center' ? '-50%' : pinY === 'bottom' ? '-100%' : '0%';
  const { filter, lightStyle } = useLights();
  const transformation = dot(translate(x * scale, y * scale, z * scale), base);

  return (
    <React.Fragment>
      {filter}
      <div
        {...rest}
        style={{
          ...lightStyle,
          ...style,
          position: 'absolute',
          boxSizing: 'border-box',
          transformOrigin: `${pinX} ${pinY}`,
          transformStyle: 'preserve-3d',
          width: w != null ? w * scale : undefined,
          height: h != null ? h * scale : undefined,
          transform: `translate(${dx},${dy}) ${matrix3d(transformation)}`,
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
}

type WallProps = PlaneProps & { turn?: number };

export function Roof({ turn = 1, x = 0, y = 0, z = 0, ...props }: WallProps) {
  return (
    <RotateX degrees={-90 * turn}>
      <Plane {...props} />
    </RotateX>
  );
}
export function Floor({ turn = 1, x = 0, y = 0, z = 0, ...props }: WallProps) {
  return (
    <Move dx={x} dy={y} dz={z}>
      <RotateX degrees={90 * turn}>
        <Plane {...props} />
      </RotateX>
    </Move>
  );
}
export function RWall({ turn = 1, x = 0, y = 0, z = 0, ...props }: WallProps) {
  return (
    <Move dx={x} dy={y} dz={z}>
      <RotateY degrees={-90 * turn}>
        <Plane {...props} />
      </RotateY>
    </Move>
  );
}
export function LWall({ turn = 1, x = 0, y = 0, z = 0, ...props }: WallProps) {
  return (
    <Move dx={x} dy={y} dz={z}>
      <RotateY degrees={90 * turn}>
        <Plane {...props} />
      </RotateY>
    </Move>
  );
}

type RotateProps = {
  children?: React.ReactNode;
  degrees: number;
};

export function RotateX({ degrees, children }: RotateProps) {
  const transformation = rotateX(degrees);
  return (
    <TransformBase transformation={transformation}>{children}</TransformBase>
  );
}

export function RotateY({ degrees, children }: RotateProps) {
  const transformation = rotateY(degrees);

  return (
    <TransformBase transformation={transformation}>{children}</TransformBase>
  );
}

export function RotateZ({ degrees, children }: RotateProps) {
  const transformation = rotateZ(degrees);
  return (
    <TransformBase transformation={transformation}>{children}</TransformBase>
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
  const transformation = translate(dx * scale, dy * scale, dz * scale);
  return (
    <TransformBase transformation={transformation}>{children}</TransformBase>
  );
}
