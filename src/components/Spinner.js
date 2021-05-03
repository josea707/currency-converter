import React, { Fragment } from 'react';
import spinner from '../images/spinner.gif';

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='Loading...'
        style={{
          wdith: '220px',
          margin: 'auto',
          display: 'block',
        }}
      />
    </Fragment>
  );
};

export default Spinner;
