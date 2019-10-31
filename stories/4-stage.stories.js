import React from 'react';
import speaker from './speaker.png';
import seat from './seat.png';
import {
  SceneContainer,
  SceneContent,
  Plane,
  Roof,
  Floor,
  LWall,
  RWall,
  RotateX,
  RotateY,
  RotateZ,
  Move,
} from '../.';

export default {
  title: 'Stage',
};

export const stage = () => (
  <StoryScene>
    <Stage />
  </StoryScene>
);

export const platform = () => (
  <StoryScene>
    <Move dy={2}>
      <Platform />
    </Move>
  </StoryScene>
);

export const pulpit = () => (
  <StoryScene>
    <Move dy={1} dx={2}>
      <Pulpit />
    </Move>
  </StoryScene>
);

function StoryScene({ children }) {
  const [vw, vh] = useWindowSize();
  const h = Math.max((vw / vh < 1.12 ? vw / 1.12 : vh) * 0.8, 360);
  const scale = h * 0.181;
  const yMiddle = 0.28;
  const yOrigin = (0.55 * h) / vh;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        background: '#112',
        color: '#fafafa',
      }}
    >
      <SceneContainer
        style={{ height: '100%', width: '100%' }}
        perspective={12}
        origin={{ x: 0.5, y: yOrigin }}
        scale={scale}
      >
        <SceneContent
          style={{
            height: h,
            width: '100%',
            borderBottom: '1px red solid',
          }}
          origin={{ x: 0.5, y: yMiddle }}
        >
          {children}
        </SceneContent>
        <div style={{ height: '100%', transformStyle: 'preserve-3d' }}>
          <h1>Code Surfer</h1>
          <p>Lorem ipsum</p>
        </div>
      </SceneContainer>
    </div>
  );
}

function Stage() {
  const startZ = -4;
  return (
    <RotateY degrees={0}>
      <Move dz={startZ - 5}>
        <Background />
        {/* <Marker /> */}
      </Move>
      <Move dz={startZ - 3} dy={-3}>
        <Top />
        {/* <Marker /> */}
      </Move>
      <Move dz={startZ - 4}>
        <Screen />
        {/* <Marker /> */}
      </Move>
      <Move dy={3} dx={2} dz={startZ - 1}>
        <Pulpit />
        {/* <Marker /> */}
      </Move>
      <Move dx={-5} dz={startZ - 3}>
        <RotateY degrees={15}>
          <Banner />
          {/* <Marker /> */}
        </RotateY>
      </Move>
      <Move dx={5} dz={startZ - 3}>
        <RotateY degrees={-15}>
          <Banner />
          {/* <Marker /> */}
        </RotateY>
      </Move>
      <Move dy={3} dz={startZ}>
        <Platform />
        {/* <Marker /> */}
      </Move>
      <Rows rows={6} columns={14} fromZ={0} toZ={startZ + 2} dy={4} />
      <Move dy={4} dz={0}>
        <Bottom />
      </Move>
    </RotateY>
  );
}

function Screen() {
  return (
    <Plane w={8} h={4.5} style={{ background: '#222', padding: '10px' }}>
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'white',
        }}
      >
        <span>Lorem Ipsum</span>
      </div>
    </Plane>
  );
}

function Platform() {
  const width = 10;
  return (
    <React.Fragment>
      {/* floor */}
      <Floor pinY="bottom" h={6} w={width} style={{ background: '#555' }} />
      {/* front */}
      <Plane pinY="top" h={1} w={width} style={{ background: '#333' }} />
    </React.Fragment>
  );
}

function Top() {
  const width = 10;
  return (
    <React.Fragment>
      {/* roof */}
      <Roof pinY="top" h={6} w={width} style={{ background: '#555' }} />
      {/* front */}
      <Plane pinY="bottom" h={1} w={width} style={{ background: '#444' }} />
    </React.Fragment>
  );
}

function Pulpit() {
  const w = 0.5;
  const h = 1;
  return (
    <React.Fragment>
      <Plane w={w} h={h} style={{ background: '#444' }} pinY={'bottom'} />
      <Plane w={w} h={w} z={-0.2} y={-h * 0.9} pinY={'bottom'}>
        <img
          src={speaker}
          alt="speaker"
          style={{ width: '100%', height: 'auto' }}
        />
      </Plane>
    </React.Fragment>
  );
}

function Background() {
  return <Plane w={40} h={8} style={{ background: '#411' }} />;
}

function Banner() {
  return <Plane w={1.5} h={3.5} style={{ background: '#777' }} />;
}

function Rows({ rows, columns, fromZ, toZ, dy }) {
  const count = rows;
  const numbers = React.useMemo(
    () =>
      Array(count)
        .fill(0)
        .map((_, i) => fromZ + (i * (toZ - fromZ)) / (rows - 1)),
    []
  );
  return (
    <React.Fragment>
      {numbers.map(dz => (
        <Move dz={dz} dy={dy}>
          <Row />
        </Move>
      ))}
    </React.Fragment>
  );
}

function Bottom() {
  return (
    <React.Fragment>
      <Floor
        style={{ background: '#112', backfaceVisibility: 'hidden' }}
        h={11}
        w={40}
        y={-0.02}
        pinY="bottom"
      />
      <Roof
        style={{ background: '#112', backfaceVisibility: 'hidden' }}
        h={11}
        w={40}
        y={-0.02}
        z={0.1}
        pinY="top"
      />
      <Roof
        style={{ background: '#112', backfaceVisibility: 'hidden' }}
        h={11}
        w={40}
        y={0.01}
        pinY="top"
      />
    </React.Fragment>
  );
}

function Row() {
  const count = 14;
  const numbers = Array(count)
    .fill(0)
    .map(
      (_, i) =>
        i -
        (count - 1) / 2 +
        (Math.random() - 0.5) * Math.random() * Math.random()
    );
  return (
    <React.Fragment>
      {numbers.map(i => (
        <Seat key={i} number={i} />
      ))}
    </React.Fragment>
  );
}

function Seat({ number }) {
  const w = 0.8;
  return (
    <Plane w={w} h={w} x={number * w} pinY={'bottom'}>
      <img
        src={seat}
        alt="attendant"
        style={{ width: '100%', height: 'auto' }}
      />
    </Plane>
  );
}

function Marker() {
  return (
    <React.Fragment>
      <RotateZ degrees={45}>
        <Plane w={0.25} h={0.05} style={{ background: 'white' }} />
      </RotateZ>
      <RotateZ degrees={-45}>
        <Plane w={0.25} h={0.05} style={{ background: 'white' }} />
      </RotateZ>
    </React.Fragment>
  );
}

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return [
      isClient ? window.innerWidth : undefined,
      isClient ? window.innerHeight : undefined,
    ];
  }

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
