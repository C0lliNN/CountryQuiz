/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import background from '../../assets/images/background.png';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  & > div {
    width: 300px;

    @media(min-width: 1024px) {
      width: 400px;
    }

    @media(min-width: 1440px) {
      width: 464px;
    }
  }
`;
