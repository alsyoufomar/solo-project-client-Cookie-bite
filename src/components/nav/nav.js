import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import './style.css';

const Nav = () => {
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
    <nav className={'nav'}>
      <ul className='nav__list'>
        <li className='nav__logo--item'>
          <i className='fa-solid fa-cookie-bite'></i>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/events'>Events</Link>
        </li>
        <li>
          <Link to='/forum'>Forum</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <div className='nav-login-list'>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='dropdown-icon-container'>
          <i className='fa-solid fa-caret-down'></i>
        </div>
        {isOpen && (
          <ul ref={container} className='nav__dropdown'>
            {!localStorage.getItem('isLoggedIn') && (
              <Link to='/signup'>
                <li className='nav__dropdown-item nav__register'>Sign up</li>
              </Link>
            )}
            {!localStorage.getItem('isLoggedIn') && (
              <Link to='/login'>
                <li className='nav__dropdown-item nav__login'>
                  <i className='dropdown-icon fa-solid fa-right-to-bracket'></i>{' '}
                  Login
                </li>
              </Link>
            )}
            {localStorage.getItem('isLoggedIn') && (
              <Link to='/profile'>
                <li className='nav__dropdown-item nav__profile'>
                  <i className='dropdown-icon fa-solid fa-user'></i> Profile
                </li>
              </Link>
            )}
            {localStorage.getItem('isLoggedIn') && (
              <Link to='/bookmark'>
                <li className='nav__dropdown-item nav__bookmark'>
                  <i className='dropdown-icon fa-regular fa-bookmark'></i>{' '}
                  Bookmark
                </li>
              </Link>
            )}
            {localStorage.getItem('isLoggedIn') && (
              <li
                onClick={handleLogout}
                className='nav__dropdown-item nav__logout'>
                <i className='dropdown-icon fa-solid fa-right-from-bracket'></i>
                Logout
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
