import { useState, React } from 'react';
import './style.css';

const Dropdown = ({ setIsOpen, isOpen, location, setLocation }) => {
  function handleDropdown(e) {
    setLocation(e.target.innerHTML);
  }
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className='button'>
        <i className='event__icon fa-solid fa-location-dot'></i>
        {location}
      </button>
      {isOpen && (
        <div className='dropdown'>
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
