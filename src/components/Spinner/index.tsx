import React from 'react';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }`;

const Container = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(1, 79, 223, 0.2);
  border-right: 1.1em solid rgba(1, 79, 223, 0.2);
  border-bottom: 1.1em solid rgba(1, 79, 223, 0.2);
  border-left: 1.1em solid #014fdf;
  transform: translateZ(0);
  animation: ${load} 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;

export default function Spinner() {
  return <Container>Loading...</Container>;
}
