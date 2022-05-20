import { React } from 'react';
import FilterBar from '../filterBar/Filterbar';
import './style.css';

const Home = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
}) => {
  return (
    <div className='hero'>
      <div className='brand-title'>
        <i class='fa-solid fa-cookie-bite'></i>ookie bite
      </div>
      <FilterBar
        setLocation={setLocation}
        location={location}
        setFormData={setFormData}
        formData={formData}
        setDate={setDate}
        date={date}
      />
    </div>
  );
};

export default Home;
