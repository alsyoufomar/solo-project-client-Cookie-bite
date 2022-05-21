import { React, useState, useEffect } from 'react';
import EventCard from './event/eventCard';
import './home/style.css';

const ThisWeek = () => {
  const [thisWeek, setThisWeek] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/event/ThisWeek')
      .then((res) => res.json())
      .then((res) => {
        setThisWeek(res.events);
      });
  }, []);

  return (
    <>
      <div className='thisWeek-title'>Happening this week</div>
      <div className='thisWeek-subtitle'>
        Attending an event without planning can be one of the best things Ever!
      </div>
      <ul className='thisWeek'>
        {thisWeek.map((card) => {
          return <EventCard key={card.id} card={card} />;
        })}
        <button className='loadMore'>Load more results</button>
      </ul>
    </>
  );
};

export default ThisWeek;
