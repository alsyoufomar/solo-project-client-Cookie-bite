import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import './style.css';

const PhoneNav = ({ dark, setDark }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
    console.log('logged out');
  };

  return (
    <nav className={'phone-nav'}>
      <ul className='nav__list--phone'>
        <li className='dropdown-icon-container'>
          <Link to='/'>
            <i className='fa-solid fa-house'></i>
          </Link>
        </li>
        <li className='dropdown-icon-container'>
          <Link to='/events'>
            <i className='fa-solid fa-cookie-bite'></i>
          </Link>
        </li>
        <li className='dropdown-icon-container'>
          <Link to='/forum'>
            <i className='fa-solid fa-message'></i>
          </Link>
        </li>
        <li className='dropdown-icon-container'>
          <Link to='/about'>
            <i className='fa-solid fa-circle-info'></i>
          </Link>
        </li>
        <div ref={container} className='nav-login-list'>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className='dropdown-icon-container'>
            <i className='fa-solid fa-bars'></i>
          </div>
          {isOpen && (
            <ul
              ref={container}
              className={
                dark ? 'nav__dropdown--dark--phone' : 'nav__dropdown--phone'
              }>
              {!localStorage.getItem('isLoggedIn') && (
                <Link to='/signup'>
                  <li className='nav__dropdown-item--phone nav__register'>
                    <i className='fa-solid fa-user-plus'></i>
                  </li>
                </Link>
              )}
              {!localStorage.getItem('isLoggedIn') && (
                <Link to='/login'>
                  <li className='nav__dropdown-item--phone nav__login'>
                    <i className='dropdown-icon fa-solid fa-right-to-bracket'></i>
                  </li>
                </Link>
              )}
              {localStorage.getItem('isLoggedIn') && (
                <Link to='/profile'>
                  <li className='nav__dropdown-item--phone nav__profile'>
                    <i className='dropdown-icon fa-solid fa-user'></i>
                  </li>
                </Link>
              )}
              {localStorage.getItem('isLoggedIn') && (
                <Link to='/bookmark'>
                  <li className='nav__dropdown-item--phone nav__bookmark'>
                    <i className='dropdown-icon fa-regular fa-bookmark'></i>
                  </li>
                </Link>
              )}
              {localStorage.getItem('isLoggedIn') && (
                <li
                  onClick={handleLogout}
                  className='nav__dropdown-item--phone nav__logout'>
                  <i className='dropdown-icon fa-solid fa-right-from-bracket'></i>
                </li>
              )}
              <li
                onClick={() => setDark(!dark)}
                className='nav__dropdown-item--phone nav__logout'>
                {!dark && <i className='fa-solid fa-toggle-off'> </i>}
                {dark && <i className='fa-solid fa-toggle-on'></i>}
              </li>
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default PhoneNav;
