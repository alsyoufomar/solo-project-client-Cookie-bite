import { useState, useEffect } from 'react';
import './cardStyle.css';

export default function EventCard(props) {
  const { card } = props;
  const [saved, setSaved] = useState(null);

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

  const handleBookmark = async (eventId) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };

    fetch(`http://localhost:5000/event/${eventId}/save`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log('add bookmark', res);
        setSaved(!saved);
        if (!res.error) {
          // setData([res.data, ...data]);
          // setThreadData(emptyThraed);
        }
      })
      .catch((err) => console.log('the error message!', err.message));
  };

  return (
    <li className='event'>
      <a href={card.url} rel='noreferrer' target='_blank'>
        <div className='event__image'>
          {card.featured && <span className='featured-tag'>Featured</span>}
          <img src={card.image} alt={card.title} />
        </div>
      </a>
      <div onClick={() => handleBookmark(card.id)} className='fav-list'>
        <i className='fa-regular fa-bookmark'></i>
      </div>
      <ul className='event__info'>
        <li className='event__info-item event__title'>
          <a href={card.url} rel='noreferrer' target='_blank'>
            {card.title}
          </a>
        </li>
        <li className='event__info-item event__date'>
          <i className='fa-solid fa-calendar-day'></i>
          {card.date ? card.date.trim() : card.date}
        </li>
        <li className='event__info-item event__time'>{card.time}</li>
        <li className='event__info-item event__address'>
          <i className='fa-solid fa-location-dot'></i>
          {card.address ? card.address.replace(/\+/gm, '\n') : card.location}
        </li>
        <li className='event__info-item event__ageLimit'>{card.age}</li>
      </ul>
    </li>
  );
}
