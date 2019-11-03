import React, { ReactNode } from 'react';

type Light = {
  type: 'point';
  x: number;
};

type SceneContext = {
  scale: number;
  addLight: (key: string, light: Light) => void;
  removeLight: (key: string) => void;
  lights: Map<string, Light>;
};

export const defaultContext: SceneContext = {
  scale: 1,
  addLight: () => {},
  removeLight: () => {},
  lights: new Map<string, Light>(),
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

export function useContext() {
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
  console.log('content lights', lights);
  return { lights, addLight, removeLight };
}
