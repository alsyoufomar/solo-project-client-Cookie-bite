import { useState, React, useRef, useEffect } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: 'Location',
  });

  const container = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleDropdown(e) {
    setFormData((city) => {
      return {
        ...city,
        ['location']: e.target.innerHTML,
      };
    });
  }

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className='hero'>
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
            <button onClick={() => setIsOpen(!isOpen)} className='button'>
              <i className='event__icon fa-solid fa-location-dot'></i>
              {formData.location}
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
          </li>
          <li className='filter-bar__li filter-bar__date'>
            <i className='event__icon fa-solid fa-calendar-day'></i>
            date
          </li>
          <li className='filter-bar__li filter-bar__search-btn'>Search</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
