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

const initialState = {
  loading: true,
  currencies: [],
  base: '',
  date: '',
  rate: {},
  historicalRates: {},
  isError: false,
};
// takes 2 parameters.
export default function currencyReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CURRENCIES:
      return {
        ...state,
        currencies: Object.keys(payload.rates).map((key) => [
          key,
          payload.rates[key],
        ]),
        base: payload.base,
        date: payload.date,
        loading: false,
        isError: false,
      };
    case GET_RATE_TWO_CURRENCIES_SUCCESS:
      return {
        ...state,
        rate: payload.rates,
        loading: false,
        isError: false,
      };
    case GET_RATE_CHART_SUCCESS:
      return {
        ...state,
        historicalRates: payload,
        loading: false,
        isError: false,
      };

    case GET_RATE_TWO_CURRENCIES_FAIL:
    case ERROR_LOADING_CURRENCIES:
    case GET_RATE_CHART_FAIL:
      return {
        ...state,
        loading: false,
        isError: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
