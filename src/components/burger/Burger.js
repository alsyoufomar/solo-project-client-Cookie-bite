import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Dropdown = ({ dark }) => {
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
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={dark ? 'button--dark' : 'button'}>
        {location}
      </button>
      {isOpen && (
        <div className={dark ? 'dropdown--dark' : 'dropdown'}>
          <ul name='location'>
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
        </div>
      )}
    </>
  );
};

export default Dropdown;
