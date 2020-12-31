import React, { useCallback, useEffect, useReducer } from 'react';
import api from '../services/api';

export interface Country {
  name: string;
  capital: string;
  region: string;
  flag: string;
}

interface State {
  isLoading: boolean;
  countries: Array<Country>;
  error: string | null;
}

interface Props {
  children: React.ReactNode;
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

const initialState: State = {
  isLoading: false,
  countries: [],
  error: null,
};

function reducer(state: State = initialState, action: Action): State {
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

export const CountriesContext = React.createContext<State>(initialState);

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = useCallback(async () => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const { data } = await api.get('all');
      const countries: Array<Country> = data.map((c: Country) => ({
        name: c.name,
        region: c.region,
        capital: c.capital,
        flag: c.flag,
      }));
      dispatch({ type: 'REQUEST_SUCCESS', countries });
    } catch (err) {
      dispatch({ type: 'REQUEST_FAILURE', error: err.message });
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <CountriesContext.Provider value={state}>
      {children}
    </CountriesContext.Provider>
  );
};

export default Provider;
