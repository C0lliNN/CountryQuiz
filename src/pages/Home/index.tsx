import React, { useContext, useEffect, useReducer } from 'react';
import Card from '../../components/Card';
import Feedback from '../../components/Feedback';
import Question from '../../components/Question';
import Spinner from '../../components/Spinner';
import Title from '../../components/Title';
import { CountriesContext, Country } from '../../context/countries';
import { Container } from './styles';

export interface IQuestion {
  title: string;
  alternatives: Array<string>;
  flag: boolean;
  answered: boolean;
  correctAnswer: string;
  selectedAlternative: string | null;
}

function isCountry(obj: any): obj is Country {
  return obj && (obj as Country).flag !== undefined;
}

function getRandomElements<T>(array: T[], n: number): T[] {
  const clonedArray = [...array];
  const results: T[] = [];

  let i = 0;
  while (i < n) {
    const removedItem = clonedArray
      .splice(Math.floor(Math.random() * array.length), 1)
      .pop() as T;
    if (!removedItem || (isCountry(removedItem) && !removedItem.capital)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    results.push(removedItem);
    i += 1;
  }

  return results;
}

interface State {
  questionsAnswered: number;
  correctAnswers: number;
  currentQuestion: IQuestion | null;
  mode: 'ANSWERING' | 'CHECKING';
}

type Action =
  | {
      type: 'ANSWER';
      selectedAlternative: string;
    }
  | {
      type: 'NEXT';
      newQuestion: IQuestion;
    }
  | {
      type: 'RESET';
      newQuestion: IQuestion;
    };

const initialState: State = {
  questionsAnswered: 0,
  correctAnswers: 0,
  currentQuestion: null,
  mode: 'ANSWERING',
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ANSWER': {
      if (state.currentQuestion?.answered) {
        return state;
      }

      const newState: State = {
        ...state,
        currentQuestion: {
          ...(state.currentQuestion as IQuestion),
          answered: true,
          selectedAlternative: action.selectedAlternative,
        },
      };

      newState.questionsAnswered += 1;
      if (action.selectedAlternative === state.currentQuestion?.correctAnswer) {
        newState.correctAnswers += 1;
      }
      return newState;
    }
    case 'NEXT': {
      const newState: State = {
        ...state,
      };

      if (newState.questionsAnswered >= 5) {
        newState.mode = 'CHECKING';
      } else {
        newState.currentQuestion = action.newQuestion;
      }

      return newState;
    }
    case 'RESET':
      return {
        ...initialState,
        currentQuestion: action.newQuestion,
      };

    default:
      return state;
  }
}

export default function Home() {
  const data = useContext(CountriesContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentQuestion, mode, correctAnswers } = state;

  function generateNewQuestion(): IQuestion {
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
        <Question
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
