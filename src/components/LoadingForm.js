import React, { Fragment } from 'react';
import Sp from '../images/loading-form.gif';
export const LoadingForm = () => {
  return (
    <Fragment>
      <img
        src={Sp}
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

export default LoadingForm;
