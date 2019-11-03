import * as React from 'react';
export * from './plane';
import { useScale, ContextProvider, useNewLightsContext } from './context';
export { useScale };

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type SceneContainerProps = DivProps & {
  perspective?: number;
  scale?: number;
  origin?: { x: number; y: number };
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
      }}
    >
      <ContextProvider value={{ scale }}>{children}</ContextProvider>
    </div>
  );
}

type SceneContentProps = DivProps & { origin?: { x: number; y: number } };

export function SceneContent({
  children,
  style,
  origin = { x: 0.5, y: 0.5 },
}: SceneContentProps) {
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
        <ContextProvider value={useNewLightsContext()}>
          {children}
        </ContextProvider>
      </div>
    </div>
  );
}
