import styled from 'styled-components';

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 10px;
  text-transform: uppercase;
  color: #fff;

  @media(min-width: 1024px) {
    font-size: 30px
  }

  @media(min-width: 1440px) {
    font-size: 36px;
  }
`;

export default Title;
