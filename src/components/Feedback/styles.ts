import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  box-sizing: border-box;
  & div {
    margin: 20px 0;
  }
  @media (min-width: 1024px) {
    padding: 30px 0;
    & div {
      margin: 30px 0;
    }
  }
  @media (min-width: 1440px) {
    padding: 40px 0;
    & div {
      margin: 40px 0;
    }
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  color: #1d355d;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 36px;
  }

  @media (min-width: 1440px) {
    font-size: 48px;
  }
`;

export const Info = styled.p`
  font-size: 14px;
  margin: 0%;
  text-align: center;
  display: flex;
  align-items: center;
  color: #1d355d;
  & span {
    font-size: 36px;
    margin: 0 4px;
    font-weight: bold;
    color: #60bf88;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

export const Button = styled.button`
  border: 2px solid #1d355d;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 10px 32px;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: #1d355d;
  font-weight: 600;
  font-size: 14px;

  @media (min-width: 1024px) {
    font-size: 16px;
    padding: 12px 40px;
  }
  @media (min-width: 1440px) {
    font-size: 18px;
    padding: 18px 60px;
  }
`;
