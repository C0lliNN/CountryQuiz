import React from 'react';
import illustration from '../../assets/images/results_illustration.svg';
import { Container, Title, Info, Button } from './styles';

interface Props {
  correctAnswers: number;
  handleReset(): void;
}

export default function Feedback({ correctAnswers, handleReset }: Props) {
  return (
    <Container>
      <img src={illustration} alt="" />
      <div>
        <Title>Results</Title>
        <Info>
          You got
          <span>{correctAnswers}</span>
          correct answers
        </Info>
      </div>

      <Button type="button" onClick={handleReset}>
        Try Again
      </Button>
    </Container>
  );
}
