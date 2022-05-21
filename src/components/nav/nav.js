import { Link } from 'react-router-dom';
import './style.css';

const Nav = () => {
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
    </nav>
  );
};

export default Nav;
