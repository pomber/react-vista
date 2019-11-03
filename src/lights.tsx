import { useId } from './global-ids';
import React from 'react';
import { useContext } from './context';

type PointLightProps = {
  x: number;
};
export function PointLight({ x = 0 }: PointLightProps) {
  const { addLight, removeLight } = useContext();
  const key = useId();
  React.useLayoutEffect(() => {
    console.log('layout effect - add light ', key);
    addLight(key, { type: 'point', x });
    return () => removeLight(key);
  }, []);
  return null;
}
