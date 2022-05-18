import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className={'nav'}>
      <ul className='nav__list'>
        {/* <li className="nav__logo--item"><img src={ logo } alt="" /></li> */}
        {/* <li className="nav__logo--item">HP</li> */}
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/events'>Events</Link>
        </li>
        {/* <li><Link to='/camping' >Camping</Link></li>
        <li><Link to='/forum' >Forum</Link></li>
        <li><Link to='/shop' >Shop</Link></li> */}
      </ul>
    </nav>
  )
}

export default Nav
