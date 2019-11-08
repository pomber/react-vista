import { useId } from './global-ids';
import React from 'react';
import { useSceneContext, Light } from './context';
import { transformPoint } from './transform';

type PointLightProps = {
  x: number;
  y: number;
  z: number;
  color?: string;
};
export function PointLight({
  x = 0,
  y = 0,
  z = 0,
  color = '#FDB813',
}: PointLightProps) {
  const { addLight, removeLight, base, scale } = useSceneContext();
  const key = useId();
  const [gx, gy, gz] = transformPoint([x * scale, y * scale, z * scale], base);

  React.useLayoutEffect(() => {
    addLight(key, { type: 'point', x: gx, y: gy, z: gz, color });
  }, [gx, gy, gz, color]);

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

  // const light = Array.from(lights, ([_, value]) => value)[0];
  const localLights = Array.from(lights, ([_, light]) => {
    const [x, y, z] = transformPoint([light.x, light.y, light.z], inverted);
    return { ...light, x, y, z };
  });

  const filter = <LightFilter id={filterId} lights={localLights} />;
  const lightStyle = { filter: `url(#${filterId})` };
  return { filter, lightStyle };
}

type LightFilterProps = {
  id: string;
  lights: Light[];
};
function LightFilter({ id, lights }: LightFilterProps) {
  const specularExponent = 10;
  const coneAngle = 10;

  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <filter
        id={id}
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        primitiveUnits="userSpaceOnUse"
      >
        {lights.map(({ color, x, y, z }, i) => (
          <React.Fragment key={i}>
            <feDiffuseLighting
              surfaceScale={0}
              in="SourceGraphic"
              result={'l' + i}
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
            {i > 0 ? (
              <React.Fragment>
                <feComposite
                  in="SourceGraphic"
                  in2={'l' + i}
                  result={'cx' + i}
                  operator="arithmetic"
                  k1="1"
                  k2="0"
                  k3="0"
                  k4="0"
                />
                <feComposite
                  in={'cx' + i}
                  in2={'c' + (i - 1)}
                  result={'c' + i}
                  operator="arithmetic"
                  k1="0"
                  k2="1"
                  k3="1"
                  k4="0"
                />
              </React.Fragment>
            ) : (
              <feComposite
                in="SourceGraphic"
                in2={'l' + i}
                result={'c' + i}
                operator="arithmetic"
                k1="1"
                k2="0"
                k3="0"
                k4="0"
              />
            )}
          </React.Fragment>
        ))}
      </filter>
    </svg>
  );
}

function fixChromeBug(l: number) {
  return (window as any).chrome ? window.devicePixelRatio * l : l;
}
