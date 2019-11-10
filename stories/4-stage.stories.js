import React from 'react';
import speaker from './speaker.png';
import seat from './seat.png';
import logo from './logo.small.svg';
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
  useScale,
  FabricTexture,
  SpotLight,
  NoLights,
  PointLight,
} from '../.';
import useWindowSize from './use-window-size';

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

const whiteBackground = '#FAF9F5';
const darkBackground = '#202226';

const dividerTexture = `url("https://www.transparenttextures.com/patterns/bright-squares.png")`;
// const dividerTexture = `url("https://www.definicionabc.com/wp-content/uploads/rombo.jpg")`;
function StoryScene({ children }) {
  const [vw, vh] = useWindowSize();
  const h = Math.max((vw / vh < 1.12 ? vw / 1.12 : vh) * 0.75, 330);
  const scale = h * 0.2;
  const yMiddle = 0.33;
  const yOrigin = (0.6 * h) / vh;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        color: 'rgb(51,51,51)',
        background: '#222',
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
            // borderBottom: '1px red solid',
          }}
          origin={{ x: 0.5, y: yMiddle }}
        >
          {children}
        </SceneContent>
        <div
          style={{
            height: '100%',
            background: '#FAF9F5',
            transformStyle: 'preserve-3d',
            marginTop: -1,
          }}
        >
          <div
            style={{
              position: 'relative',
              height: h * 0.15,
              width: vw,
              backgroundImage: dividerTexture,
              backgroundColor: darkBackground,
              backgroundPosition: 'center top',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              height={h * 0.2}
              width="100%"
              style={{
                zIndex: '1',
                position: 'absolute',
                bottom: 0,
                height: '90%',
              }}
            >
              <path
                fill={whiteBackground}
                d="M0,192L40,186.7C80,181,160,171,240,144C320,117,400,75,480,74.7C560,75,640,117,720,122.7C800,128,880,96,960,90.7C1040,85,1120,107,1200,138.7C1280,171,1360,213,1400,234.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              ></path>
            </svg>
          </div>

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
      </Move>
      <Move dz={startZ - 4}>
        <Screen />
        {/* <Marker /> */}
      </Move>
      {/* <NoLights> */}
      {/* <PointLight color="#777" x={-2} z={startZ + 2} /> */}
      {/* <PointLight color="#fff" x={2} z={startZ + 2} /> */}

      <Move dz={startZ - 3} dy={-3}>
        <Top />
      </Move>
      <Move dz={startZ} dy={-3}>
        {/* <SpotLight color="#539ed8" toY={1} x={-2} toX={-2} toZ={-0.25} />
        <SpotLight color="#f9bc00" toY={1} x={-1} toX={0} toZ={-0.25} />
        <SpotLight color="#c30083" toY={1} x={0} toX={0} toZ={-0.25} />
        <SpotLight color="pink" toY={1} x={1} toX={0} toZ={-0.25} />
        <SpotLight color="#539ed8" toY={1} x={2} toX={2} toZ={-0.25} /> */}
      </Move>
      <Move dy={3.3} dx={2} dz={startZ - 1}>
        <Pulpit />
        {/* <Marker /> */}
      </Move>
      <Move dx={-5} dz={startZ - 3} dy={0.5}>
        <RotateY degrees={15}>
          <Banner />
          {/* <Marker /> */}
        </RotateY>
      </Move>
      <Move dx={5} dz={startZ - 3} dy={0.5}>
        <RotateY degrees={-15}>
          <Banner />
          {/* <Marker /> */}
        </RotateY>
      </Move>
      <Move dy={3.3} dz={startZ}>
        <Platform />
        {/* <Marker /> */}
      </Move>
      {/* </NoLights> */}
      {/* <Rows rows={6} columns={14} fromZ={-1} toZ={startZ + 1} dy={4} /> */}
      <Move dy={4.5} dz={0}>
        <Bottom />
      </Move>
    </RotateY>
  );
}

function Screen() {
  const scale = useScale();
  return (
    <Plane w={8} h={4.5} style={{ background: '#111', padding: scale * 0.1 }}>
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
  const width = 14;
  return (
    <React.Fragment>
      {/* floor */}
      <Floor
        pinY="bottom"
        h={6}
        w={width}
        style={{
          background: '#222',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/wood.png")`,
        }}
      />
      {/* front */}
      <Plane
        pinY="top"
        h={1.5}
        w={width}
        style={{
          background: '#222',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/wood.png")`,
        }}
      />
    </React.Fragment>
  );
}

function Top() {
  const width = 10;
  return (
    <React.Fragment>
      {/* roof */}
      <Roof
        pinY="top"
        h={6}
        w={width}
        style={{
          background: '#222',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/wood.png")`,
        }}
      />
      {/* front */}
      <Plane
        pinY="bottom"
        h={1}
        w={width}
        style={{
          background: '#222',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/wood.png")`,
        }}
      />
    </React.Fragment>
  );
}

function Pulpit() {
  const w = 0.5;
  const h = 0.9;
  const scale = useScale();
  return (
    <React.Fragment>
      <Plane
        w={w}
        h={h}
        style={{
          background: '#333',
          color: '#FFF8',
          textAlign: 'center',
          fontFamily: 'monospace',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/purty-wood.png")`,
        }}
        pinY={'bottom'}
      >
        <div style={{ fontSize: scale * 0.2, paddingTop: '40%' }}>RAD</div>
        <div style={{ fontSize: scale * 0.15 }}>CONF</div>
      </Plane>
      <Plane w={w} h={w} z={-0.2} y={-h * 0.93} pinY={'bottom'}>
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
  const scale = useScale();
  return (
    <Plane
      w={14}
      h={10}
      style={{
        background: '#222',
        backgroundImage: `url("https://www.transparenttextures.com/patterns/worn-dots.png")`,
        backgroundSize: scale * 3,
      }}
    ></Plane>
  );
}

function Banner() {
  return (
    <Plane
      w={1.5}
      h={4}
      style={{
        background: '#777',
        backgroundImage: `url("https://www.transparenttextures.com/patterns/shattered.png")`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '10%',
          opacity: 0.7,
          transformStyle: 'preserve-3d',
        }}
      >
        <img src={logo} alt="Code Surfer Logo" width="70%" />
      </div>
    </Plane>
  );
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
      <Floor
        z={(fromZ + toZ) / 2}
        h={fromZ - toZ}
        w={0.8 * 14}
        y={dy}
        style={{ background: '#222' }}
      />
      {numbers.map((dz, i) => (
        <Move dz={dz} dy={dy} key={i}>
          <Row />
        </Move>
      ))}
    </React.Fragment>
  );
}

function Bottom() {
  const scale = useScale();
  return (
    <React.Fragment>
      {/* <Floor
        style={{
          background: '#202226',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/subtle-stripes.png")`,
          backgroundSize: scale,
        }}
        h={11}
        w={16}
        y={-0.02}
        pinY="bottom"
      /> */}
      <Floor
        style={{
          background: darkBackground,
          backgroundImage: dividerTexture,
          backgroundPosition: 'center bottom',
        }}
        h={1}
        w={(window.innerWidth * 1.08) / scale}
        y={-1.156}
        pinY="bottom"
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
