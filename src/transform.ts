export type Transformation = number[];

export function matrix3d(array: Transformation) {
  return `matrix3d(${array.join(',')})`;
}

export function origin() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

export function rotateX(degrees: number) {
  const radians = degrees * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1];
}

export function rotateY(degrees: number) {
  const radians = degrees * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1];
}

export function rotateZ(degrees: number) {
  const radians = degrees * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

export function translate(x: number, y: number, z: number) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}

export function dot(A: Transformation, B: Transformation) {
  return A.map((_, k) => {
    const c0 = k % 4;
    const r0 = k - c0;
    return (
      A[r0] * B[c0] +
      A[r0 + 1] * B[c0 + 4] +
      A[r0 + 2] * B[c0 + 8] +
      A[r0 + 3] * B[c0 + 12]
    );
  });
}

export function transformPoint(
  [x, y, z]: [number, number, number],
  A: Transformation
) {
  return [
    x * A[0] + y * A[4] + z * A[8] + A[12],
    x * A[1] + y * A[5] + z * A[9] + A[13],
    x * A[2] + y * A[6] + z * A[10] + A[14],
  ];
}

// https://codesandbox.io/s/reverent-kowalevski-xh52d
