import { useState, React, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from '../DatePicker';
import Dropdown from '../dropdown/Dropdown';
import './style.css';

const FilterBar = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
}) => {
  const [dateToggle, setDateToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dateContainer = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dateToggle]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (
      dateContainer.current &&
      !dateContainer.current.contains(event.target)
    ) {
      setDateToggle(false);
    }
  };

  return (
    <ul className='filter-bar'>
      <li className='filter-bar__li filter-bar__venue'>
        <i className='event__icon fa-solid fa-magnifying-glass'></i>
        <input
          placeholder='artist, venue or keyword'
          autoComplete='off'
          className='filter-bar__name'
          id='name'
          value={formData.name}
          onChange={handleChange}
          name='name'
        />
      </li>
      <li
        ref={container}
        className='dropdown-container filter-bar__li filter-bar__location'>
        <Dropdown
          location={location}
          setLocation={setLocation}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </li>
      <li ref={dateContainer} className='filter-bar__li filter-bar__date'>
        <DatePicker
          date={date}
          setDate={setDate}
          dateToggle={dateToggle}
          setDateToggle={setDateToggle}
        />
      </li>
      <li className='filter-bar__li filter-bar__search-btn'>
        <Link to='/events'>Search</Link>
      </li>
    </ul>
  );
};

export default FilterBar;
