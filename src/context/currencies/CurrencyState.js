import React, { useReducer } from 'react';
import CurrencyContext from './currencyContext';
import CurrencyReducer from './currencyReducer';

import {
  GET_ALL_CURRENCIES,
  SET_LOADING,
  ERROR_LOADING_CURRENCIES,
  GET_RATE_TWO_CURRENCIES_SUCCESS,
  GET_RATE_TWO_CURRENCIES_FAIL,
  GET_RATE_CHART_SUCCESS,
  GET_RATE_CHART_FAIL,
  CLEAR_ERROR,
} from '../types';

// global state for github
const CurrencyState = (props) => {
  const initialState = {
    currencies: [],
    date: '',
    base: '',
    loading: false,
  };
  const [state, dispatch] = useReducer(CurrencyReducer, initialState);
  /* Get all the exchange rates for all the currencies
    where the base currency is specified by the user. (default: CAD)
  */
  const getAllCurrencies = async (currency) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(
        `https://api.exchangeratesapi.io/latest?access_key=${process.env.REACT_APP_API_KEY}&base=${currency}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      const res = await response.json();
      if (!res.success) throw Error;
      dispatch({
        type: GET_ALL_CURRENCIES,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: ERROR_LOADING_CURRENCIES,
      });
    }
  };

  /* get exchange rate from a base currency and another 
  currency selected by the user
   */
  const getExchangeRate = async (firstCurrency, secondCurrency) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(
        `https://api.exchangeratesapi.io/latest?access_key=${process.env.REACT_APP_API_KEY}&base=${firstCurrency}&symbols=${secondCurrency}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );
      const res = await response.json();
      if (!res.success) throw Error;
      dispatch({
        type: GET_RATE_TWO_CURRENCIES_SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: GET_RATE_TWO_CURRENCIES_FAIL,
      });
    }
  };

  /*  Get the historical rate of the base currency (firstCurrency)
      against another currency (secondCurrency) up to one year.
  */
  const getHistoricalRates = async (
    firstCurrency,
    secondCurrency,
    firstDate,
    secondDate
  ) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(
        `https://api.exchangeratesapi.io/timeseries?access_key=${process.env.REACT_APP_API_KEY}&base=${firstCurrency}&symbols=${secondCurrency}&start_date=${secondDate}&end_date=${firstDate}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );
      const res = await response.json();
      if (!res.success) throw Error;
      dispatch({
        type: GET_RATE_CHART_SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: GET_RATE_CHART_FAIL,
      });
    }
  };
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  // return provider -> Have to wrap entire app by the provider
  return (
    <CurrencyContext.Provider
      // anything we want available to the entire app
      value={{
        currencies: state.currencies,
        date: state.date,
        base: state.base,
        loading: state.loading,
        rate: state.rate,
        historicalRates: state.historicalRates,
        isError: state.isError,
        getAllCurrencies,
        getExchangeRate,
        getHistoricalRates,
        clearError,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyState;
