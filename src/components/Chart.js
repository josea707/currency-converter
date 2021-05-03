import React, { useState, useContext, useEffect } from 'react';
import CurrencyContext from '../context/currencies/currencyContext';
import LoadingForm from '../components/LoadingForm';
import CurrencySelection from './CurrencySelection';
import SimpleLineChart from './SimpleLineChart';
import Moment from 'moment';
import MessageBox from './MessageBox';
const Chart = () => {
  const currencyContext = useContext(CurrencyContext);
  const {
    loading,
    currencies,
    getHistoricalRates,
    historicalRates,
    isError,
    clearError,
  } = currencyContext;
  const [firstCurrency, setFirstCurrency] = useState('CAD');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [graphData, setGraphData] = useState('');
  useEffect(() => {
    if (historicalRates !== undefined && historicalRates.success)
      setGraphData(historicalRates.rates);
  }, [historicalRates]);
  useEffect(() => {
    if (isError) clearError();
    // eslint-disable-next-line
  }, []);
  const switchCurrencies = (e) => {
    e.preventDefault();
    if (firstCurrency !== '' && secondCurrency !== '') {
      const swap = firstCurrency;
      setFirstCurrency(secondCurrency);
      setSecondCurrency(swap);
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    e.target.name === 'firstCurrency'
      ? setFirstCurrency(e.target.value)
      : setSecondCurrency(e.target.value);
  };
  const getRates = async (secondDate) => {
    if (firstCurrency !== '' && secondCurrency !== '') {
      const firstDate = Moment().format('YYYY-MM-DD');
      getHistoricalRates(firstCurrency, secondCurrency, firstDate, secondDate);
    } else alert('Please select 2 currencies');
  };
  return (
    <div className='chart-container'>
      <h2 className='center'> Charts </h2>
      <div className='exchange-container__form'>
        <CurrencySelection
          firstCurrency={firstCurrency}
          secondCurrency={secondCurrency}
          onChange={onChange}
          disable={true}
          switchCurrencies={switchCurrencies}
          currencies={currencies}
        />
      </div>
      <div className='chart-container__buttons'>
        <button
          onClick={() =>
            getRates(Moment().subtract(7, 'days').format('YYYY-MM-DD'))
          }
          className='btn btn-primary'
        >
          Weekly
        </button>
        <button
          onClick={() =>
            getRates(Moment().subtract(1, 'months').format('YYYY-MM-DD'))
          }
          className='btn btn-primary'
        >
          Monthly
        </button>
        <button
          onClick={() =>
            getRates(Moment().subtract(1, 'years').format('YYYY-MM-DD'))
          }
          className='btn btn-primary'
        >
          Yearly
        </button>
      </div>
      {loading && <LoadingForm />}
      {isError && (
        <div className='margin-top-bottom'>
          <MessageBox
            type={'danger'}
            msg={'Unable to load the chart, please try again'}
          />
        </div>
      )}
      {!loading && graphData !== '' && <SimpleLineChart data={graphData} />}
    </div>
  );
};

export default Chart;
