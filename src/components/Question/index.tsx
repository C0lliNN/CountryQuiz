import React from 'react';
import { Container, Img, Title, Alternative, Button } from './styles';
import { IQuestion } from '../../pages/Home';
import illustration from '../../assets/images/question_illustration.svg';
import correctIcon from '../../assets/icons/check.svg';
import wrongIcon from '../../assets/icons/close.svg';

interface Props extends IQuestion {
  // eslint-disable-next-line no-unused-vars
  onAnswer(alternative: string): void;
  onNext(): void;
}

export default function Question({
  title,
  alternatives,
  answered,
  flag,
  selectedAlternative,
  correctAnswer,
  onAnswer,
  onNext,
}: Props) {
  const alternativeNodes = alternatives.map((alternative, i) => {
    let icon = null;
    let className = '';

    if (answered) {
      if (alternative === selectedAlternative) {
        icon = <img className="icon" src={wrongIcon} alt="" />;
        className = 'wrong';
      }
      if (alternative === correctAnswer) {
        icon = <img className="icon" src={correctIcon} alt="" />;
        className = 'correct';
      }
    }

    return (
      <Alternative
        key={alternative}
        onClick={() => onAnswer(alternative)}
        className={className}
      >
        <span className="letter">{String.fromCharCode(i + 65)}</span>
        {flag ? (
          <img className="flag" src={alternative} alt="" />
        ) : (
          <span className="text">{alternative}</span>
        )}
        {icon}
      </Alternative>
    );
  });

  return (
    <Container className={answered ? 'answered' : ''}>
      <Img src={illustration} alt="" />
      <Title>{title}</Title>
      {alternativeNodes}
      <Button onClick={onNext}>Next</Button>
    </Container>
  );
}
