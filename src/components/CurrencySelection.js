import React, { useEffect } from 'react';
const CurrencySelection = ({
  firstCurrency,
  secondCurrency,
  valueToExchange,
  onChange,
  currencies,
  submitExchangeRate,
  switchCurrencies,
  disable,
}) => {
  useEffect(() => {}, [switchCurrencies]);
  return (
    <div>
      <form
        onSubmit={!disable ? submitExchangeRate : (e) => e.preventDefault()}
        className='exchange-container__form'
      >
        {!disable && (
          <div>
            <label htmlFor='search-bar'>Amount</label>
            <input
              type='number'
              name='search-bar'
              value={valueToExchange}
              onChange={onChange}
              className='exchange-container__form--search'
            />
          </div>
        )}
        <div>
          <label htmlFor='firstCurrency'>From</label>
          <select
            name='firstCurrency'
            onChange={onChange}
            className='exchange-container__form--select'
            value={firstCurrency}
          >
            {currencies.map((currency) => (
              <option
                value={currency[0]}
                key={`2+${currency[0]}`}
                name='firstCurrency'
              >
                {currency[0]}
              </option>
            ))}
          </select>
        </div>

        <button
          className='btn btn-primary btn-round exchange-container__form--button'
          onClick={switchCurrencies}
        >
          {' '}
          Switch
        </button>

        <div>
          <label htmlFor='secondCurrency'>To</label>
          <select
            name='secondCurrency'
            onChange={onChange}
            className='exchange-container__form--select'
            value={secondCurrency}
          >
            {currencies.map((currency) => (
              <option
                value={currency[0]}
                key={`1+${currency[0]}`}
                name='secondCurrency'
              >
                {currency[0]}
              </option>
            ))}
          </select>
        </div>
        {!disable && (
          <input
            type='submit'
            value='Convert'
            className='btn btn-primary btn-pill exchange-container__form--submit'
          />
        )}
      </form>
    </div>
  );
};

export default CurrencySelection;
