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
type SpotsLightProps = {
  x: number;
  y: number;
  z: number;
  toX: number;
  toY: number;
  toZ: number;
  color?: string;
};
export function SpotLight({
  x = 0,
  y = 0,
  z = 0,
  toX = 0,
  toY = 0,
  toZ = 0,
  color = '#FDB813',
}: SpotsLightProps) {
  const { addLight, removeLight, base, scale } = useSceneContext();
  const key = useId();
  const [gx, gy, gz] = transformPoint([x * scale, y * scale, z * scale], base);
  const [gtx, gty, gtz] = transformPoint(
    [toX * scale, toY * scale, toZ * scale],
    base
  );

  React.useLayoutEffect(() => {
    addLight(key, {
      type: 'spot',
      x: gx,
      y: gy,
      z: gz,
      toX: gtx,
      toY: gty,
      toZ: gtz,
      color,
    });
  }, [gx, gy, gz, gtx, gty, gtz, color]);

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

  const localLights = Array.from(lights, ([_, light]) => {
    const [x, y, z] = transformPoint([light.x, light.y, light.z], inverted);
    if (light.type === 'point') return { ...light, x, y, z };
    const [toX, toY, toZ] = transformPoint(
      [light.toX, light.toY, light.toZ],
      inverted
    );
    return { ...light, x, y, z, toX, toY, toZ };
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
        {lights.map((light, i) => (
          <React.Fragment key={i}>
            <feDiffuseLighting
              surfaceScale={0}
              in="SourceGraphic"
              result={'l' + i}
              lightingColor={light.color}
            >
              {light.type === 'point' ? (
                <fePointLight
                  x={fixChromeBug(light.x)}
                  y={fixChromeBug(light.y)}
                  z={fixChromeBug(light.z)}
                  specularExponent={specularExponent}
                  limitingConeAngle={coneAngle}
                />
              ) : (
                <feSpotLight
                  x={fixChromeBug(light.x, true)}
                  y={fixChromeBug(light.y, true)}
                  z={fixChromeBug(light.z, true)}
                  pointsAtX={fixChromeBug(light.toX, true)}
                  pointsAtY={fixChromeBug(light.toY, true)}
                  pointsAtZ={fixChromeBug(light.toZ, true)}
                  specularExponent={specularExponent}
                  limitingConeAngle={coneAngle}
                />
              )}
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

function fixChromeBug(l: number, spot = false) {
  return (window as any).chrome || spot ? window.devicePixelRatio * l : l;
}
