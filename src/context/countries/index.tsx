import React, { useCallback, useEffect, useReducer } from 'react';
import { Country } from '../../shared/interfaces/country';
import api from '../../services/api';
import { reducer, initialState } from './reducer';

export const CountriesContext = React.createContext(initialState);

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCountries = useCallback(
    (data: []) =>
      data.map((c: Country) => ({
        name: c.name,
        region: c.region,
        capital: c.capital,
        flag: c.flag,
      })),
    [],
  );

  const getData = useCallback(async () => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const { data } = await api.get('all');
      const countries: Array<Country> = getCountries(data);

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
