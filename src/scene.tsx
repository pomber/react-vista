import * as React from 'react';
import { useId } from './global-ids';
import { Fabric } from './filters';

export * from './filters';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type SceneContainerProps = DivProps & {
  perspective?: number;
  scale?: number;
  origin?: { x: number; y: number };
};

const defaultContext = {
  scale: 1,
  addLight: (key: string, light: Light) => {
    key && light;
  },
  removeLight: (key: string) => {
    key;
  },
  lights: new Map<string, Light>(),
};

const SceneContext = React.createContext(defaultContext);

type Light = {
  type: 'point';
  x: number;
};

export function SceneContainer({
  children,
  style,
  perspective = 10,
  origin = { x: 0.5, y: 0.5 },
  scale = 1,
  ...rest
}: SceneContainerProps) {
  return (
    <div
      {...rest}
      style={{
        ...style,
        overflowY: 'auto',
        overflowX: 'hidden',
        perspective: `${perspective * scale}px`,
        perspectiveOrigin: `${origin.x * 100 + '%'} ${origin.y * 100 + '%'}`,
        position: 'relative',
        transformStyle: 'preserve-3d',
        // perspectiveOrigin: `${origin.x}px ${origin.y}px`,
      }}
    >
      <SceneContext.Provider value={{ ...defaultContext, scale }}>
        {children}
      </SceneContext.Provider>
    </div>
  );
}

export function useScale() {
  return React.useContext(SceneContext).scale;
}

type SceneContentProps = DivProps & { origin?: { x: number; y: number } };

export function SceneContent({
  children,
  style,
  origin = { x: 0.5, y: 0.5 },
}: SceneContentProps) {
  const { scale } = React.useContext(SceneContext);

  const [lights, setLights] = React.useState(() => new Map<string, Light>());
  const addLight = React.useCallback((key: string, light: Light) => {
    setLights(prevLights => {
      prevLights.set(key, light);
      return new Map<string, Light>(prevLights);
    });
  }, []);
  const removeLight = React.useCallback((key: string) => {
    setLights(prevLights => {
      prevLights.delete(key);
      return new Map<string, Light>(prevLights);
    });
  }, []);
  console.log('content lights', lights);
  return (
    <div style={{ ...style, transformStyle: 'preserve-3d' }}>
      <div
        style={{
          position: 'relative',
          top: origin.y * 100 + '%',
          left: origin.x * 100 + '%',
          transformStyle: 'preserve-3d',
        }}
      >
        <SceneContext.Provider value={{ lights, addLight, removeLight, scale }}>
          {children}
        </SceneContext.Provider>
      </div>
    </div>
  );
}

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
  texture?: 'fabric';
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
  const { scale } = React.useContext(SceneContext);
  const dx = pinX === 'center' ? '-50%' : pinX === 'right' ? '-100%' : '0%';
  const dy = pinY === 'center' ? '-50%' : pinY === 'bottom' ? '-100%' : '0%';
  let rotation = rotate
    ? ` rotate3d(${rotate.x},${rotate.y},${rotate.z},${rotate.a}deg)`
    : '';
  return (
    <div
      style={{
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
  );
}

type PlaneWithTextureProps = PlaneProps & { texture: 'fabric' };

export function PlaneWithTexture({ texture, ...rest }: PlaneWithTextureProps) {
  const filterId = useId();
  const style = rest.style || {};
  style.filter = `url(#${filterId})`;
  return (
    <React.Fragment>
      <Fabric id={filterId} />
      <Plane {...rest} style={style} />
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
      {children}
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
  const { scale } = React.useContext(SceneContext);
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

type PointLightProps = {
  x: number;
};
export function PointLight({ x = 0 }: PointLightProps) {
  const { addLight, removeLight } = React.useContext(SceneContext);
  const key = useId();
  React.useLayoutEffect(() => {
    console.log('layout effect - add light ', key);
    addLight(key, { type: 'point', x });
    return () => removeLight(key);
  }, []);
  return null;
}
