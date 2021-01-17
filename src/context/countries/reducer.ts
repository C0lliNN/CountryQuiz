import { Country } from '../../shared/interfaces/country';

interface State {
  isLoading: boolean;
  countries: Array<Country>;
  error: string | null;
}

type Action =
  | {
      type: 'REQUEST_START';
    }
  | {
      type: 'REQUEST_SUCCESS';
      countries: Array<Country>;
    }
  | {
      type: 'REQUEST_FAILURE';
      error: string;
    };

export const initialState: State = {
  isLoading: false,
  countries: [],
  error: null,
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'REQUEST_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'REQUEST_SUCCESS':
      return {
        isLoading: false,
        countries: action.countries,
        error: null,
      };
    case 'REQUEST_FAILURE':
      return {
        isLoading: false,
        countries: [],
        error: action.error,
      };
    default:
      return state;
  }
}
