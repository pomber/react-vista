import React from 'react';
import speaker from './speaker.png';
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
  return (
    <SceneContainer
      className="scene"
      style={{ height: '80vh', border: '1px solid red' }}
      perspective={20}
      scale={40}
    >
      <SceneContent
        style={{
          border: '1px solid blue',
          height: '100%',
        }}
      >
        {children}
      </SceneContent>
      <div style={{ height: '100%' }} />
    </SceneContainer>
  );
}

function Stage() {
  return (
    <RotateY degrees={-0}>
      <Move dz={-5}>
        <Background />
        <Marker />
      </Move>
      <Move dz={-3} dy={-3}>
        <Top />
        <Marker />
      </Move>
      <Move dz={-4}>
        <Screen />
        <Marker />
      </Move>
      <Move dy={3} dx={2} dz={-2}>
        <Pulpit />
        <Marker />
      </Move>
      <Move dx={-5} dz={-3}>
        <RotateY degrees={15}>
          <Banner />
          <Marker />
        </RotateY>
      </Move>
      <Move dx={5} dz={-3}>
        <RotateY degrees={-15}>
          <Banner />
          <Marker />
        </RotateY>
      </Move>
      <Move dy={3}>
        <Platform />
        <Marker />
      </Move>
    </RotateY>
  );
}

function Screen() {
  return <Plane w={8} h={4.5} style={{ background: '#3939' }} />;
}

function Platform() {
  const width = 14;
  return (
    <React.Fragment>
      {/* floor */}
      <Floor pinY="bottom" h={6} w={width} style={{ background: '#a929' }} />
      {/* front */}
      <Plane pinY="top" h={1} w={width} style={{ background: '#29a' }} />
    </React.Fragment>
  );
}

function Top() {
  const width = 16;
  return (
    <React.Fragment>
      {/* roof */}
      <Roof pinY="top" h={6} w={width} style={{ background: '#3939' }} />
      {/* front */}
      <Plane pinY="bottom" h={1} w={width} style={{ background: '#3399' }} />
    </React.Fragment>
  );
}

function Pulpit() {
  const w = 0.5;
  const h = 1;
  return (
    <React.Fragment>
      <Plane w={w} h={h} style={{ background: '#99f9' }} pinY={'bottom'} />
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
  return <Plane w={16} h={9} style={{ background: '#822a' }} />;
}

function Banner() {
  return <Plane w={1.5} h={3.5} style={{ background: '#8f6a' }} />;
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
