import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

export const CurrencyCard = ({ currency }) => {
  const symbol = getSymbolFromCurrency(currency[0]);
  return (
    <div className='cards'>
      <div className='cards__flag'>
        <div
          className={`currency-flag currency-flag-lg currency-flag-${currency[0].toLowerCase()}`}
        >
          {''}
        </div>
      </div>
      <div className='cards__currency'> {currency[0]}</div>
      <div className='cards__rate'>{symbol + currency[1]}</div>
    </div>
  );
};

export default CurrencyCard;
