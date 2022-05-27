import { React, useState, useEffect } from 'react';
import EventCard from '../event/EventCard';
import './style.css';

const ThisWeek = ({ dark }) => {
  const [thisWeek, setThisWeek] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 8;
  const pagination = `&page=${page}&perPage=${perPage}`;

  function loadMore() {
    setPage((x) => x + 1);
  }

  console.log('page', page);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch('http://localhost:5000/event/ThisWeek?' + pagination, options)
      .then((res) => res.json())
      .then((res) => {
        console.log('this week', res);
        setThisWeek((x) => {
          return [...new Set([...x, ...res.events])];
        });
      });
  }, [page]);

  return (
    <>
      <div className={dark ? 'thisWeek-title--dark' : 'thisWeek-title'}>
        Happening this week
      </div>
      <div className={dark ? 'thisWeek-subtitle--dark' : 'thisWeek-subtitle'}>
        Attending an event without planning can be one of the best things Ever!
      </div>
      <ul className='thisWeek'>
        {thisWeek.map((card) => {
          return <EventCard dark={dark} key={card.id} card={card} />;
        })}
        <button onClick={loadMore} className='loadMore'>
          Load more results
        </button>
      </ul>
    </>
  );
};

export default ThisWeek;
