import React, { useContext, useEffect, useReducer } from 'react';
import Card from '../../components/Card';
import Feedback from '../../components/Feedback';
import QuestionComponent from '../../components/Question';
import Spinner from '../../components/Spinner';
import Title from '../../components/Title';
import { CountriesContext } from '../../context/countries';
import { Container } from './styles';
import { Question as QuestionInteface } from '../../shared/interfaces/question';
import { Country } from '../../shared/interfaces/country';
import { reducer, initialState } from './reducer';
import getRandomElements from './utility';

export default function Home() {
  const data = useContext(CountriesContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentQuestion, mode, correctAnswers } = state;

  function generateNewQuestion(): QuestionInteface {
    const types = ['capital', 'flag'];
    const type = getRandomElements(types, 1).pop() as 'capital' | 'flag';

    const countries = getRandomElements(data.countries, 4);
    const correctCountry = getRandomElements(countries, 1).pop() as Country;

    const alternatives = countries.map((c) => c[type]);

    return {
      title: `What is the ${type} of ${correctCountry.name}`,
      alternatives,
      flag: type === 'flag',
      answered: false,
      correctAnswer: correctCountry[type],
      selectedAlternative: null,
    };
  }

  useEffect(() => {
    if (data.countries.length) {
      dispatch({
        type: 'NEXT',
        newQuestion: generateNewQuestion(),
      });
    }
  }, [data.countries]);

  function handleAnswer(alternative: string) {
    dispatch({ type: 'ANSWER', selectedAlternative: alternative });
  }

  function handleNext() {
    dispatch({ type: 'NEXT', newQuestion: generateNewQuestion() });
  }

  function handleReset() {
    dispatch({ type: 'RESET', newQuestion: generateNewQuestion() });
  }

  let content = null;

  if (mode === 'ANSWERING') {
    if (currentQuestion) {
      content = (
        <QuestionComponent
          title={currentQuestion.title}
          alternatives={currentQuestion.alternatives}
          flag={currentQuestion.flag}
          answered={currentQuestion.answered}
          correctAnswer={currentQuestion.correctAnswer}
          selectedAlternative={currentQuestion.selectedAlternative}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      );
    } else {
      content = <Spinner />;
    }
  } else {
    content = (
      <Feedback correctAnswers={correctAnswers} handleReset={handleReset} />
    );
  }

  return (
    <Container>
      <div>
        <Title>Country Quiz</Title>
        <Card>{content}</Card>
      </div>
    </Container>
  );
}
