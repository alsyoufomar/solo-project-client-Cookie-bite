import { useEffect, useState } from 'react';
import EventCard from '../event/EventCard';
import './style.css';
const host = process.env.REACT_APP_API_URL;

const Bookmark = ({ dark }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch(`${host}/event/bookmark`, options)
      .then((res) => {
        if (!res.ok) throw Error('could not fetch the data from the source');
        return res.json();
      })
      .then((res) => {
        setData(res.foundBookmarks);
      });
  }, []);

  function handleFlag(target) {
    const updatedBookmarks = data.map((x) => {
      return x.event.id === target.id
        ? {
            ...x,
            event: {
              ...x.event,
              isBookmarked: !x.event.isBookmarked,
            },
          }
        : x;
    });
    setData(updatedBookmarks);
  }

  if (!data) return <></>;

  return (
    <div className={dark ? 'bookmark--dark' : 'bookmark'}>
      <ul className='bookmark-cards'>
        {data.map((card) => {
          return (
            <EventCard
              dark={dark}
              handleFlag={handleFlag}
              key={card.id}
              card={card.event}
            />
          );
        })}
      </ul>
      <i className='big-guy fa-solid fa-cookie-bite'></i>
    </div>
  );
};

export default Bookmark;
