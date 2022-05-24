import { Link } from 'react-router-dom';
import './style.css';

const Nav = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
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
          <Link to='/about'>About us</Link>
        </li>
      </ul>
      <ul className='nav-login'>
        <li className='nav-login-item nav__register'>
          <Link to='/signup'>Sign up</Link>
        </li>
        <li className='nav-login-item nav__login'>
          <Link to='/login'>Login</Link>
        </li>
        <li onClick={handleLogout} className='nav-login-item nav__logout'>
          Logout
        </li>
        <li className='nav-login-item nav__profile'>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
