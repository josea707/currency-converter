import React, { useEffect, useContext, useState } from 'react';
import CurrencyContext from '../context/currencies/currencyContext';
import CurrencyCard from './CurrencyCard';
import Spinner from './Spinner';
import MessageBox from './MessageBox';
const Currency = (props) => {
  const currencyContext = useContext(CurrencyContext);
  const {
    currencies,
    loading,
    getAllCurrencies,
    isError,
    clearError,
  } = currencyContext;
  const [currencySelected, setCurrencySelected] = useState('CAD');
  useEffect(() => {
    getAllCurrencies(currencySelected);
    // eslint-disable-next-line
  }, [currencySelected]);
  // eliminate any error alerts from other components
  useEffect(() => {
    if (isError) clearError();
    // eslint-disable-next-line
  }, []);
  console.log(isError);
  return (
    <div>
      {loading && currencies.length === 0 ? (
        <Spinner />
      ) : (
        <div>
          <label htmlFor='firstCurrency'>Select the Currency</label>
          <select
            name='currencySelected'
            onChange={(e) => setCurrencySelected(e.target.value)}
            value={currencySelected}
            className='row'
            style={{ height: '4rem', fontSize: '1.6rem' }}
          >
            {currencies.map((currency) => (
              <option
                value={currency[0]}
                key={`1+${currency[0]}`}
                name='currencySelected'
              >
                {currency[0]}
              </option>
            ))}
          </select>
          {isError && (
            <div className='margin-top-bottom'>
              <MessageBox
                type={'danger'}
                msg={'Unable to load currencies, please try again'}
              />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            currencies.map((currency) => (
              <CurrencyCard key={currency[0]} currency={currency} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Currency;
