import { React } from 'react';
import FilterBar from '../filterbar/filterbar';
import Featured from './featured';
import ThisWeek from './thisweek';
import { Link } from 'react-router-dom';

import './style.css';

const Home = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
  dark,
}) => {
  return (
    <div className={dark ? 'home--dark' : 'home'}>
      <div className='hero'>
        <div className='brand-title'>
          <i className='fa-solid fa-cookie-bite'></i>ookie bite
        </div>
        <FilterBar
          setLocation={setLocation}
          location={location}
          setFormData={setFormData}
          formData={formData}
          setDate={setDate}
          date={date}
          dark={dark}
        />
      </div>
      <Featured dark={dark} />
      <ThisWeek dark={dark} />
    </div>
  );
};

export default Home;
