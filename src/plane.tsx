import React from 'react';
import { useScale, TransformBase, useSceneContext } from './context';
import { useLights } from './lights';
import { rotateZ, rotateY, rotateX, translate, matrix3d } from './transform';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type RectProps = {
  w?: number;
  h?: number;
} & DivProps;

function Rect({ children, style, w, h, ...rest }: RectProps) {
  const { scale, base } = useSceneContext();
  const { filter, lightStyle } = useLights();

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
          transformStyle: 'preserve-3d',
          width: w != null ? w * scale : undefined,
          height: h != null ? h * scale : undefined,
          transformOrigin: 'left top',
          transform: matrix3d(base),
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
}

type PlaneProps = {
  x?: number;
  y?: number;
  z?: number;
  // TODO make w & h optional
  w: number;
  h: number;
  pinX?: 'left' | 'center' | 'right';
  pinY?: 'top' | 'center' | 'bottom';
} & RectProps;

export function Plane({
  x = 0,
  y = 0,
  z = 0,
  w,
  h,
  pinX = 'center',
  pinY = 'center',
  ...rest
}: PlaneProps) {
  const dx = pinX === 'center' ? -0.5 * w : pinX === 'right' ? -w : 0;
  const dy = pinY === 'center' ? -0.5 * h : pinY === 'bottom' ? -h : 0;
  return (
    <Move dx={x + dx} dy={y + dy} dz={z}>
      <Rect {...rest} w={w} h={h} />
    </Move>
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
  const opposite = rotateX(-degrees);
  return (
    <TransformBase transformation={transformation} opposite={opposite}>
      {children}
    </TransformBase>
  );
}

export function RotateY({ degrees, children }: RotateProps) {
  const transformation = rotateY(degrees);
  const opposite = rotateY(-degrees);

  return (
    <TransformBase transformation={transformation} opposite={opposite}>
      {children}
    </TransformBase>
  );
}

export function RotateZ({ degrees, children }: RotateProps) {
  const transformation = rotateZ(degrees);
  const opposite = rotateZ(-degrees);

  return (
    <TransformBase transformation={transformation} opposite={opposite}>
      {children}
    </TransformBase>
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
  const opposite = translate(-dx * scale, -dy * scale, -dz * scale);
  return (
    <TransformBase transformation={transformation} opposite={opposite}>
      {children}
    </TransformBase>
  );
}
