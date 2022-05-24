import { React, useState, useEffect } from 'react';
import EventCard from '../event/EventCard';
import './style.css';

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/event/featured')
      .then((res) => res.json())
      .then((res) => {
        setFeatured(res.events);
      });
  }, []);

  return (
    <>
      <div className='featured-title'>Featured Events</div>
      <div className='featured-subtitle'>
        In case you are confused, please let us introduce our featured events.
      </div>
      <ul className='featured'>
        {featured.map((card) => {
          return <EventCard key={card.id} card={card} />;
        })}
      </ul>
    </>
  );
};

export default Featured;
