import { useEffect, useState } from 'react';
import EventCard from '../event/EventCard';
import './style.css';

const Bookmark = ({}) => {
  const [data, setData] = useState([]);

  const url = `http://localhost:5000/event/bookmark`;
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        console.log('bookmark data', res.foundBookmarks);
        setData(res.foundBookmarks);
      });
  }, []);

  return (
    <div className='bookmark'>
      <ul className='bookmark-cards'>
        {data.map((card) => {
          return <EventCard key={card.id} card={card.event} />;
        })}
      </ul>
      <i className='big-guy fa-solid fa-cookie-bite'></i>
    </div>
  );
};

export default Bookmark;
