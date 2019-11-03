import React from 'react';
import { useId } from './global-ids';

type TextureProps = { id: string; color: string };
export function Fabric({ id, color }: TextureProps) {
  return (
    <svg width="0" height="0">
      <filter id={id}>
        <feTurbulence
          baseFrequency="0.045 0.0015"
          numOctaves={2}
          seed={6}
          result="noise"
        />

        <feDiffuseLighting
          in="noise"
          lightingColor={color}
          surfaceScale="3"
          result="diffuseLighting"
        >
          <feDistantLight azimuth={55} elevation={60} />
        </feDiffuseLighting>

        <feComposite
          in="diffuseLighting"
          in2="SourceAlpha"
          operator="in"
          result="composite"
        />
      </filter>
    </svg>
  );
}

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { color: string };

export function FabricTexture({ color = '#834', style, ...rest }: DivProps) {
  const filterId = useId();
  return (
    <React.Fragment>
      <Fabric id={filterId} color={color} />
      <div
        style={{
          backgroundColor: color,
          filter: `url(#${filterId})`,
          ...style,
        }}
        {...rest}
      />
    </React.Fragment>
  );
}
