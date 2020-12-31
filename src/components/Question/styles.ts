import styled from 'styled-components';

export const Container = styled.section`
  padding-top: 30px;
  padding-bottom: 12px;
  position: relative;
  &.answered {
    button {
      display: block;
    }
  }
  &:not(.answered) > div {
    cursor: pointer;
    &:hover {
      background: #f9a826;
      border-color: #f9a826;
      color: #fff;
    }
  }

  @media (min-width: 1024px) {
    padding-top: 40px;
    padding-bottom: 18px;
  }

  @media (min-width: 1440px) {
    padding-top: 58px;
    padding-bottom: 24px;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  color: #2f527b;
  margin: 0;
  margin-bottom: 18px;
  @media (min-width: 1024px) {
    font-size: 18px;
    margin-bottom: 24px;
  }
  @media (min-width: 1440px) {
    font-size: 24px;
    margin-bottom: 32px;
  }
`;

export const Img = styled.img`
  position: absolute;
  right: -32px;
  top: -50px;
  width: 100px;

  @media (min-width: 1024px) {
    width: 131px;
    top: -60px;
  }
  @media (min-width: 1440px) {
    width: 162px;
    top: -75px;
  }
`;

export const Alternative = styled.div`
  border: 2px solid rgba(96, 102, 208, 0.7);
  box-sizing: border-box;
  border-radius: 12px;
  padding: 4px 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: rgba(96, 102, 208, 0.7);
  transition: all 0.2s ease-in-out;

  &.correct {
    background-color: #60bf88;
    border-color: #60bf88;
    color: #fff;
  }
  &.wrong {
    background-color: #ea8282;
    border-color: #ea8282;
    color: #fff;
  }

  & .letter {
    text-transform: uppercase;
    padding-right: 30px;
    font-size: 14px;
  }

  & .text {
    font-size: 12px;
  }

  & .flag {
    display: block;
    height: 18px;
  }

  & .icon {
    margin-left: auto;
  }

  @media (min-width: 1024px) {
    padding: 6px 20px;
    margin-bottom: 18px;
    & .letter {
      padding-right: 30px;
      font-size: 20px;
    }

    & .text {
      font-size: 14px;
    }

    & .flag {
      height: 25px;
    }
  }

  @media (min-width: 1440px) {
    padding: 8px 20px;
    margin-bottom: 24px;

    & .letter {
      padding-right: 46px;
      font-size: 24px;
    }

    & .text {
      font-size: 18px;
    }

    & .flag {
      height: 40px;
    }
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background-color: #f9a826;
  border-radius: 12px;
  cursor: pointer;
  padding: 8px 15px;
  display: none;
  margin-left: auto;
  @media (min-width: 1024px) {
    padding: 10px 20px;
    font-size: 16px;
  }
  @media (min-width: 1440px) {
    padding: 15px 35px;
    font-size: 18px;
  }
`;
