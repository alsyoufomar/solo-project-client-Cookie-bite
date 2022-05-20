import { useEffect, useState, useRef } from 'react';
import EventCard from './eventCard';
import DatePicker from '../DatePicker';
import Dropdown from '../dropdown/Dropdown';
import './style.css';

const Events = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
}) => {
  const [data, setData] = useState([]);
  const [dateToggle, setDateToggle] = useState(false);
  const [cursorId, setCursor] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const dateContainer = useRef(null);
  const container = useRef(null);

  const perPage = 12;
  const start = date[0].startDate;
  const end = date[0].endDate;

  let url = 'http://localhost:5000/event';
  const dateRange = `&startDate=${start}&endDate=${end}`;
  const pagination = `&cursorId=${cursorId}&perPage=${perPage}`;
  let path = `location=${location}&genre=${formData.name}${dateRange}${pagination}`;

  useEffect(() => {
    fetch(`${url}?${path}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.events[1]);
      });
  }, [filter]);

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

  return (
    <>
      <div className='event-hero'>
        <ul className='filter-form'>
          <li className='filter-form__li filter-form__title'>
            Looking for Events?
          </li>
          <li className='filter-form__li filter-form__venue'>
            <i className='event__icon fa-solid fa-magnifying-glass'></i>
            <input
              placeholder='artist, venue or keyword'
              autoComplete='off'
              className='filter-form__name'
              id='name'
              value={formData.name}
              onChange={handleChange}
              name='name'
            />
          </li>
          <li ref={container} className='filter-form__li filter-form__location'>
            <Dropdown
              location={location}
              setLocation={setLocation}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </li>
          <li ref={dateContainer} className='filter-form__li filter-form__date'>
            <DatePicker
              date={date}
              setDate={setDate}
              dateToggle={dateToggle}
              setDateToggle={setDateToggle}
            />
          </li>
          <li
            onClick={() => setFilter((x) => !x)}
            className='filter-form__li filter-form__btn'>
            <button>search</button>
          </li>
        </ul>
      </div>
      <ul className='events-cards'>
        {data.map((card) => {
          return <EventCard key={card.id} card={card} />;
        })}
      </ul>
    </>
  );
};

export default Events;
