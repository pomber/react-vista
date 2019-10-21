import * as React from 'react';

type SceneProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  perspective?: number;
  scale?: number;
  origin?: { x: number; y: number };
};

const SceneContext = React.createContext({
  origin: { x: 0, y: 0 },
  scale: 1,
  addLight: (key: string, light: Light) => {},
  removeLight: (key: string) => {},
  lights: new Map<string, Light>(),
});

type Light = {
  type: 'point';
  x: number;
};

export function Scene({
  children,
  style,
  className,
  perspective = 1,
  origin = { x: 0, y: 0 },
  scale = 1,
}: SceneProps) {
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
  return (
    <div
      className={className}
      style={{
        ...style,
        overflowY: 'auto',
        overflowX: 'auto',
        perspective: `${perspective * scale}px`,
        perspectiveOrigin: `${origin.x}px ${origin.y}px`,
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          // height: '200%',
          // width: '200%',
          // transform: "rotateY(57deg) rotateX(-13deg) scale(0.5)",
          transformStyle: 'preserve-3d',
        }}
      >
        <SceneContext.Provider
          value={{ origin, scale, lights, addLight, removeLight }}
        >
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
  w: number;
  h: number;
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
  const { origin, scale } = React.useContext(SceneContext);
  const dx = pinX === 'center' ? -w / 2 : pinX === 'right' ? -w : 0;
  const dy = pinY === 'center' ? -h / 2 : pinY === 'bottom' ? -h : 0;
  const translation = `translate3d(${x * scale}px, ${y * scale}px, ${z *
    scale}px)`;
  let rotation = rotate
    ? ` rotate3d(${rotate.x},${rotate.y},${rotate.z},${rotate.a}deg)`
    : '';
  return (
    <div
      style={{
        ...style,
        transformOrigin: `${pinX} ${pinY}`,
        position: 'absolute',
        boxSizing: 'border-box',
        width: w * scale,
        height: h * scale,
        left: origin.x + dx * scale,
        top: origin.y + dy * scale,
        transformStyle: 'preserve-3d',
        transform: translation + rotation,
      }}
    >
      {children}
    </div>
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

let globalId = 1;
function useId() {
  const idRef = React.useRef<string>();
  if (!idRef.current) {
    idRef.current = `id-${globalId++}`;
  }

  return idRef.current;
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
  });
  return null;
}

// type GroupProps = {
//   style?: React.CSSProperties;
//   children?: React.ReactNode;
//   dx?: number;
//   dy?: number;
//   dz?: number;
//   rotate?: {
//     x: number;
//     y: number;
//     z: number;
//     a: number;
//   };
// };

// export function Group({children, style,}:GroupProps) {}
