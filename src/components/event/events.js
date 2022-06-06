import { useEffect, useState } from 'react';
import EventCard from './eventcard';
import EventSearchForm from './eventsearchform';
import './style.css';
const host = process.env.REACT_APP_API_URL;

const Events = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
  dark,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(false);
  const [dataCount, setDataCount] = useState(0);

  const perPage = 8;
  const start = date[0].startDate;
  const end = date[0].endDate;

  let url = `${host}/event`;
  const dateRange = `&startDate=${start}&endDate=${end}`;
  const pagination = `&page=${page}&perPage=${perPage}`;
  let path = `location=${location}&genre=${formData.name}${dateRange}${pagination}`;

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch(`${url}?${path}`, options)
      .then((res) => {
        if (!res.ok) throw Error('could not fetch the data from the source');
        return res.json();
      })
      .then((res) => {
        setDataCount(res.eventsCount);
        setData((x) => {
          return [...new Set([...x, ...res.eventsData])];
        });
      });
  }, [filter]);

  function handleFlag(target) {
    const updatedThisWeek = data.map((x) => {
      return x.id === target.id ? { ...x, isBookmarked: !x.isBookmarked } : x;
    });
    setData(updatedThisWeek);
  }

  function loadMore() {
    if (data.length < dataCount || page === 0) {
      setPage((x) => x + 1);
      setFilter((x) => !x);
    }
  }

  if (!data) return <></>;

  return (
    <div
      className={dark ? 'main-event-container--dark' : 'main-event-container'}>
      <div className={dark ? 'event-hero--dark' : 'event-hero'}>
        <EventSearchForm
          setPage={setPage}
          setFilter={setFilter}
          setData={setData}
          setLocation={setLocation}
          location={location}
          setFormData={setFormData}
          formData={formData}
          setDate={setDate}
          date={date}
          dark={dark}
        />
      </div>
      <ul className='events-cards'>
        {data.map((card) => {
          return (
            <EventCard
              handleFlag={handleFlag}
              dark={dark}
              key={card.id}
              card={card}
            />
          );
        })}
        {data.length >= 1 && (
          <button onClick={loadMore} className='loadMore'>
            Load more results
          </button>
        )}
      </ul>
    </div>
  );
};

export default Events;
