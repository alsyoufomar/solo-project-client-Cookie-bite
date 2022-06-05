import { React } from 'react';
import './style.css';

const Dropdown = ({ setIsOpen, isOpen, location, setLocation, dark }) => {
  function handleDropdown(e) {
    setLocation(e.target.innerHTML);
  }
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={dark ? 'button--dark' : 'button'}>
        <i className='event__icon fa-solid fa-location-dot'></i>
        {location}
      </button>
      {isOpen && (
        <div className={dark ? 'dropdown--dark' : 'dropdown'}>
          <ul name='location'>
            <li className='dropdown-item' onClick={handleDropdown}>
              London
            </li>
            <li className='dropdown-item' onClick={handleDropdown}>
              Liverpool
            </li>
            <li className='dropdown-item' onClick={handleDropdown}>
              Birmingham
            </li>
            <li className='dropdown-item' onClick={handleDropdown}>
              Edinburgh
            </li>
            <li className='dropdown-item' onClick={handleDropdown}>
              Manchester
            </li>
            <li className='dropdown-item' onClick={handleDropdown}>
              Cardiff
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
