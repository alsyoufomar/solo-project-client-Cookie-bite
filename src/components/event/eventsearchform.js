import { useEffect, useState, useRef } from 'react';
import DatePicker from '../datepicker';
import Dropdown from '../dropdown/dropdown';
import './style.css';

const EventSearchForm = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
  dark,
  setData,
  setPage,
  setFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const dateContainer = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dateToggle]);

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

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function searchEvents(e) {
    e.preventDefault();
    setData([]);
    setPage(0);
    setFilter((x) => !x);
  }

  return (
    <form onSubmit={searchEvents}>
      <ul className={dark ? 'filter-form--dark' : 'filter-form'}>
        <li
          className={`filter-form__li 
              ${dark ? 'filter-form__title--dark' : 'filter-form__title'}`}>
          Looking for Events?
        </li>
        <li
          className={`filter-form__li 
              ${dark ? 'filter-form__venue--dark' : 'filter-form__venue'}`}>
          <i className='event__icon fa-solid fa-magnifying-glass'></i>
          <input
            placeholder='artist, venue or keyword'
            autoComplete='off'
            className={dark ? 'filter-form__name--dark' : 'filter-form__name'}
            id='name'
            value={formData.name}
            onChange={handleChange}
            name='name'
          />
        </li>
        <li
          ref={container}
          className={`filter-form__li 
              ${
                dark ? 'filter-form__location--dark' : 'filter-form__location'
              }`}>
          <Dropdown
            dark={dark}
            location={location}
            setLocation={setLocation}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </li>
        <li
          ref={dateContainer}
          className={`filter-form__li 
              ${dark ? 'filter-form__date--dark' : 'filter-form__date'}`}>
          <DatePicker
            dark={dark}
            date={date}
            setDate={setDate}
            dateToggle={dateToggle}
            setDateToggle={setDateToggle}
          />
        </li>
        <li
          className={`filter-form__li 
              ${dark ? 'filter-form__btn--dark' : 'filter-form__btn'}`}>
          <button className={dark ? 'btn-btn--dark' : 'btn-btn'}>search</button>
        </li>
      </ul>
    </form>
  );
};

export default EventSearchForm;
