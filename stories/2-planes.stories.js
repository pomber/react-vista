// import React from 'react';
// import { action } from '@storybook/addon-actions';
// import { Button } from '@storybook/react/demo';
// import { SceneContainer, SceneContent, Box, RotateX, PointLight } from '../.';

// export default {
//   title: 'Plane',
// };

// export const plane = () => <P />;

// function P() {
//   return (
//     <div>
//       <SceneContainer
//         className="scene"
//         style={{ height: '80vh', border: '1px solid red' }}
//         perspective={100}
//       >
//         <p>foo bar</p>
//         <p>foo bar</p>
//         <p>foo bar</p>
//         <Content />
//         <Content />
//         <Content />
//         <p>foo bar</p>
//         <p>foo bar</p>
//         <p>foo bar</p>
//       </SceneContainer>
//     </div>
//   );
// }

// function Content() {
//   return (
//     <SceneContent
//       style={{
//         border: '1px solid blue',
//         width: 200,
//         height: 200,
//       }}
//     >
//       <RotateX degrees={90}>
//         <Face />
//       </RotateX>
//       <RotateX degrees={180}>
//         <Face />
//       </RotateX>
//       <RotateX degrees={-90}>
//         <Face />
//       </RotateX>
//       <Face />
//       <PointLight x={10} />
//       {/* <PointLight x={10} /> */}
//     </SceneContent>
//   );
// }

// function Face() {
//   return (
//     <Box
//       z={-20}
//       style={{
//         border: '1px solid white',
//         width: 40,
//         height: 40,
//       }}
//     ></Box>
//   );
// }
