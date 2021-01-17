import { Question } from '../../shared/interfaces/question';

interface State {
  questionsAnswered: number;
  correctAnswers: number;
  currentQuestion: Question | null;
  mode: 'ANSWERING' | 'CHECKING';
}

type Action =
  | {
      type: 'ANSWER';
      selectedAlternative: string;
    }
  | {
      type: 'NEXT';
      newQuestion: Question;
    }
  | {
      type: 'RESET';
      newQuestion: Question;
    };

export const initialState: State = {
  questionsAnswered: 0,
  correctAnswers: 0,
  currentQuestion: null,
  mode: 'ANSWERING',
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ANSWER': {
      if (state.currentQuestion?.answered) {
        return state;
      }

      const newState: State = {
        ...state,
        currentQuestion: {
          ...(state.currentQuestion as Question),
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
