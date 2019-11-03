import React from 'react';
let globalId = 1;
export function useId() {
  const idRef = React.useRef<string>();
  if (!idRef.current) {
    idRef.current = `id-${globalId++}`;
  }

  return idRef.current;
}
