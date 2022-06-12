import { React, useState, useEffect } from 'react';
import EventCard from '../event/eventcard';
import './style.css';
const host = process.env.REACT_APP_API_URL;

const ThisWeek = ({ dark }) => {
  const [thisWeek, setThisWeek] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(false);
  const [dataCount, setDataCount] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const perPage = 8;
  const pagination = `&page=${page}&perPage=${perPage}`;

  function handleFlag(target) {
    const updatedThisWeek = thisWeek.map((x) => {
      return x.id === target.id ? { ...x, isBookmarked: !x.isBookmarked } : x;
    });
    setThisWeek(updatedThisWeek);
  }

  function loadMore() {
    if (thisWeek.length < dataCount || page === 0) {
      setPage((x) => x + 1);
      setFilter((x) => !x);
    }
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch(`${host}/event/ThisWeek?` + pagination, options)
      .then((res) => {
        if (!res.ok) throw Error('could not fetch the data from the source');
        return res.json();
      })
      .then((res) => {
        setDataCount(res.thisWeekCount);
        setThisWeek((x) => {
          return [...new Set([...x, ...res.thisWeekData])];
        });
        setIsPending(false);
      });
  }, [page, filter, pagination]);

  if (isPending || !thisWeek) {
    return <i className='spinner fa-solid fa-cookie-bite'></i>;
  }

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
          return (
            <EventCard
              handleFlag={handleFlag}
              dark={dark}
              key={card.id}
              card={card}
            />
          );
        })}
        <button onClick={loadMore} className='loadMore'>
          Load more results
        </button>
      </ul>
    </>
  );
};

export default ThisWeek;
