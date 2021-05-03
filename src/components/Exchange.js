import React, { useState, useContext, useEffect } from 'react';
import CurrencyContext from '../context/currencies/currencyContext';
import LoadingForm from './LoadingForm';
import CurrencySelection from './CurrencySelection';
import MessageBox from './MessageBox';
const Exchange = () => {
  const currencyContext = useContext(CurrencyContext);
  const {
    loading,
    currencies,
    getExchangeRate,
    rate,
    isError,
    clearError,
  } = currencyContext;
  const [firstCurrency, setFirstCurrency] = useState('CAD');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [valueToExchange, setValueToExchange] = useState(1.0);
  const [showRate, setShowRate] = useState('');
  const [result, setResult] = useState(0);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (rate != null && Object.keys(rate).length !== 0) {
      setResult(valueToExchange * rate[secondCurrency]);
      setShowResults(true);
      setShowRate(rate[secondCurrency]);
    }
    // eslint-disable-next-line
  }, [rate]);
  useEffect(() => {
    setShowResults(false);
    clearError();
    // eslint-disable-next-line
  }, []);
  const onChange = (e) => {
    e.preventDefault();
    e.target.name === 'firstCurrency'
      ? setFirstCurrency(e.target.value)
      : e.target.name === 'secondCurrency'
      ? setSecondCurrency(e.target.value)
      : setValueToExchange(e.target.value);
    setShowResults(false);
  };

  const switchCurrencies = () => {
    if (firstCurrency !== '' && secondCurrency !== '') {
      const swap = firstCurrency;
      setFirstCurrency(secondCurrency);
      setSecondCurrency(swap);
    }
  };
  const submitExchangeRate = (e) => {
    e.preventDefault();
    firstCurrency === '' || secondCurrency === ''
      ? alert('Select currencies')
      : getExchangeRate(firstCurrency, secondCurrency);
  };
  return (
    <div>
      <h2 className='center'> Convert Currencies</h2>
      <div className='exchange-container'>
        <CurrencySelection
          submitExchangeRate={submitExchangeRate}
          onChange={onChange}
          currencies={currencies}
          switchCurrencies={switchCurrencies}
          firstCurrency={firstCurrency}
          secondCurrency={secondCurrency}
          valueToExchange={valueToExchange}
        />
        {loading && <LoadingForm />}
        {isError && (
          <div className='margin-top-bottom'>
            <MessageBox
              type={'danger'}
              msg={'Unable to calculate the exchange value, please try again'}
            />
          </div>
        )}
        <div
          className={
            showResults
              ? 'exchange-container__result display'
              : 'exchange-container__result hidden'
          }
        >
          <div className=' exchange-container__result--rate'>
            <p>
              {' '}
              {valueToExchange} {firstCurrency} ={' '}
            </p>
            <h4>
              {' '}
              {result} {secondCurrency}{' '}
            </h4>
          </div>
          <div className='exchange-container__result-exchange'>
            <p>
              {' '}
              1 {firstCurrency} = {showRate} {secondCurrency}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
