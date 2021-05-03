import React, { useEffect, useContext } from 'react';
import './css/style.css';
import './css/flags.css';
import CurrencyContext from './context/currencies/currencyContext';
import Header from './components/Header';
import Currency from './components/Currency';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Exchange from './components/Exchange';
import Chart from './components/Chart';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const currencyContext = useContext(CurrencyContext);
  const { getAllCurrencies } = currencyContext;
  useEffect(() => {
    getAllCurrencies('CAD');
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className='grid-container'>
        <Header />
        <main className='main-container'>
          <Switch>
            <Route exact path='/' component={Currency} />
            <Route exact path='/exchange' component={Exchange} />
            <Route exact path='/chart' component={Chart} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
