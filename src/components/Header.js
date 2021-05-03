import React from 'react';
import Logo from '../images/Logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='flex-header'>
        <Link to='/'>
          <img src={Logo} alt='Logo' className='logo'></img>
        </Link>

        <div className='header-second'>
          <ul className='header-second__container'>
            <li className='header-second__element'>
              <Link to='/exchange'>Exchange</Link>
            </li>
            <li className='header-second__element'>
              <Link to='/chart'>Chart</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
