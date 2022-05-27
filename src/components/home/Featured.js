import { React, useState, useEffect } from 'react';
import EventCard from '../event/EventCard';
import './style.css';

const Featured = ({ dark }) => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch('http://localhost:5000/event/featured', options)
      .then((res) => res.json())
      .then((res) => {
        setFeatured(res.events);
      });
  }, []);

  return (
    <>
      <div className={dark ? 'featured-title--dark' : 'featured-title'}>
        Featured Events
      </div>
      <div className={dark ? 'featured-subtitle--dark' : 'featured-subtitle'}>
        In case you are confused, please let us introduce our featured events.
      </div>
      <ul className='featured'>
        {featured.map((card) => {
          return <EventCard dark={dark} key={card.id} card={card} />;
        })}
      </ul>
    </>
  );
};

export default Featured;
