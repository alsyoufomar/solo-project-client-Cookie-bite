import { React, useState, useEffect } from 'react';
import EventCard from '../event/eventcard';
import './style.css';
const host = process.env.REACT_APP_API_URL;

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
    fetch(`${host}/event/featured`, options)
      .then((res) => {
        if (!res.ok) throw Error('could not fetch the data from the source');
        return res.json();
      })
      .then((res) => {
        setFeatured(res.events);
      });
  }, []);

  function handleFlag(target) {
    const updatedFeatured = featured.map((x) => {
      return x.id === target.id ? { ...x, isBookmarked: !x.isBookmarked } : x;
    });
    setFeatured(updatedFeatured);
  }

  if (!featured) return <></>;

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
          return (
            <EventCard
              handleFlag={handleFlag}
              dark={dark}
              key={card.id}
              card={card}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Featured;
