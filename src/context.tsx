import React, { ReactNode } from 'react';
import { dot, Transformation, origin } from './transform';

export type Light = {
  type: 'point';
  x: number;
  y: number;
  z: number;
  color: string;
};

type SceneContext = {
  scale: number;
  addLight: (key: string, light: Light) => void;
  removeLight: (key: string) => void;
  lights: Map<string, Light>;
  base: Transformation;
  inverted: Transformation;
};

export const defaultContext: SceneContext = {
  scale: 1,
  addLight: () => {},
  removeLight: () => {},
  lights: new Map<string, Light>(),
  base: origin(),
  inverted: origin(),
};

const SceneContext = React.createContext<SceneContext>(defaultContext);

type ContextProviderProps = {
  children: ReactNode;
  value: Partial<SceneContext>;
};

export function ContextProvider({ value, children }: ContextProviderProps) {
  const parentContext = React.useContext(SceneContext);
  return (
    <SceneContext.Provider
      value={{ ...parentContext, ...value }}
      children={children}
    />
  );
}

export function useScale() {
  return React.useContext(SceneContext).scale;
}

export function useSceneContext() {
  return React.useContext(SceneContext);
}

export function useNewLightsContext() {
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
  // console.log('content lights', lights);
  return { lights, addLight, removeLight };
}

export function NoLights({ children }: { children: ReactNode }) {
  return (
    <ContextProvider value={useNewLightsContext()}>{children}</ContextProvider>
  );
}

type TransformBaseProps = {
  children: ReactNode;
  transformation: Transformation;
  opposite: Transformation;
};

export function TransformBase({
  transformation,
  opposite,
  children,
}: TransformBaseProps) {
  const { base, inverted } = useSceneContext();
  return (
    <ContextProvider
      value={{
        base: dot(transformation, base),
        inverted: dot(inverted, opposite),
      }}
      children={children}
    />
  );
}
