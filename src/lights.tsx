import { useId } from './global-ids';
import React from 'react';
import { useSceneContext } from './context';
import { transformPoint } from './transform';

type PointLightProps = {
  x: number;
  y: number;
  z: number;
};
export function PointLight({ x = 0, y = 0, z = 0 }: PointLightProps) {
  const { addLight, removeLight, base, scale } = useSceneContext();
  const key = useId();
  const [gx, gy, gz] = transformPoint([x * scale, y * scale, z * scale], base);

  React.useLayoutEffect(() => {
    addLight(key, { type: 'point', x: gx, y: gy, z: gz });
  }, [gx, gy, gz]);

  React.useLayoutEffect(() => {
    return () => removeLight(key);
  }, []);

  return null;
}

export function useLights() {
  const filterId = useId();
  const { lights, inverted } = useSceneContext();

  if (lights.size === 0) {
    return { filter: null, lightStyle: null };
  }

  const light = Array.from(lights, ([_, value]) => value)[0];

  const [x, y, z] = transformPoint([light.x, light.y, light.z], inverted);

  const filter = <PointLightFilter id={filterId} x={x} y={y} z={z} />;
  const lightStyle = { filter: `url(#${filterId})` };
  return { filter, lightStyle };
}

type FilterProps = { id: string; x: number; y: number; z: number };
function PointLightFilter({ id, x = 0, y = 0, z = 0 }: FilterProps) {
  const color = '#FDB813';
  const specularExponent = 10;
  const coneAngle = 10;

  return (
    <svg width="0" height="0">
      <filter
        id={id}
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        primitiveUnits="userSpaceOnUse"
      >
        <feDiffuseLighting
          surfaceScale={0}
          in="SourceGraphic"
          result="light"
          lightingColor={color}
        >
          <fePointLight
            x={fixChromeBug(x)}
            y={fixChromeBug(y)}
            z={fixChromeBug(z)}
            specularExponent={specularExponent}
            limitingConeAngle={coneAngle}
          />
        </feDiffuseLighting>
        <feComposite
          in="SourceGraphic"
          in2="light"
          operator="arithmetic"
          k1="1"
          k2="0"
          k3="0"
          k4="0"
        />
      </filter>
    </svg>
  );
}

function fixChromeBug(l: number) {
  return (window as any).chrome ? window.devicePixelRatio * l : l;
}
