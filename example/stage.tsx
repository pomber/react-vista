import * as React from 'react';
import { Scene, Plane, Roof, Floor, LWall, RWall } from '../.';

export default function Stage() {
  return (
    <div>
      <Scene
        className="scene"
        style={{ height: '800px' }}
        perspective={10}
        scale={50}
        origin={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
      >
        <Plane w={1} h={0.1} style={{ background: '#2229' }} />
        <Plane w={0.1} h={1} style={{ background: '#2229' }} />

        {/* <Plane pinX="right" x={-5.4} z={10} w={9} h={9} y={10} />
        <Plane w={10} h={10} y={10} />
        <Plane pinX="left" x={6.6} z={-10} w={11} h={11} y={10} /> */}

        {/* <Plane w={100} h={100} x={60} style={{ background: '#9df8' }} />
        <Plane w={100} h={100} pinY="top" style={{ background: '#9df8' }} />
        <Plane
          w={100}
          h={100}
          x={-60}
          style={{ background: '#9df8' }}
          rotate={{ x: 0, y: 1, z: 0, a: 45 }}
        />
        <Plane
          w={100}
          h={100}
          pinY="bottom"
          style={{ background: '#9df8' }}
          rotate={{ x: 1, y: 0, z: 0, a: 30 }}
        /> */}

        <Floor
          pinY="bottom"
          w={10}
          h={5}
          y={2 + 4.5 / 2}
          style={{ background: '#6299' }}
        />
        <Plane
          pinY="top"
          w={10}
          h={1}
          y={2 + 4.5 / 2}
          style={{ background: '#a869' }}
        />
        <Plane w={8} h={4.5} z={-4} style={{ background: '#ab69' }} />
        <Plane
          w={18}
          h={10}
          z={-5}
          pinY="top"
          y={-2 - 4.5 / 2}
          style={{ background: '#9445' }}
        />
        <Plane
          w={0.5}
          h={1}
          x={2}
          y={2 + 4.5 / 2}
          z={-1}
          pinY="bottom"
          style={{ background: '#2b99' }}
        />
        <RWall w={1.5} h={4} pinY="top" x={6} y={-1} z={-3} turn={0.2} />
        <LWall w={1.5} h={4} pinY="top" x={-6} y={-1} z={-3} turn={0.2} />
        <Roof
          pinY="top"
          w={10}
          h={4}
          z={-1}
          y={-2 - 4.5 / 2}
          style={{ background: '#6299' }}
        />
      </Scene>
    </div>
  );
}
