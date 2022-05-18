import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import EventCard from './eventCard';

const Events = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [cursorId, setCursor] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [formData, setFormData] = useState({
    location: '',
    genre: '',
  });
  const perPage = 12;
  const start = date[0].startDate;
  const end = date[0].endDate;

  let url = 'http://localhost:5000/event';
  let path = `location=${formData.location}&genre=${formData.genre}&startDate=${start}&endDate=${end}&cursorId=${cursorId}&perPage=${perPage}`;

  useEffect(() => {
    fetch(`${url}?${path}`)
      .then((res) => res.json())
      .then((res) => {
        setData((x) => {
          console.log('the new response', res.events[1]);
          console.log('the old response', x);
          if (currentPage[0] === res.events[1][0]) {
            return [...x];
          } else return [...x, ...res.events[1]];
        });
        setCurrentPage(res.events[1]);
      });
  }, [filters, cursorId]);

  console.log('my data', data, cursorId);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function dateToStr(str) {
    const updated = str.toString().substring(4, 15).split(' ');
    let day = updated[1] + 'th';
    let month = updated[0];
    return updated;
  }

  return (
    <>
      <ul className='shopping-cards'>
        <li>
          <select
            id='location'
            value={formData.location}
            onChange={handleChange}
            name='location'>
            <option value=''>--Pick Location--</option>
            <option value='London'>London</option>
            <option value='Liverpool'>Liverpool</option>
            <option value='Birmingham'>Birmingham</option>
            <option value='Edinburgh'>Edinburgh</option>
            <option value='Manchester'>Manchester</option>
            <option value='Cardiff'>Cardiff</option>
          </select>
          <br />
          <select
            id='genre'
            value={formData.genre}
            onChange={handleChange}
            name='genre'>
            <option value=''>--Pick Genre--</option>
            <option value='club'>Club</option>
            <option value='gigs'>Gigs</option>
            <option value='festivals'>Festivals</option>
            <option value='ComedyTheatreArts'>Comedy, Theatre & Arts</option>
            <option value='ExperiencesAttractions'>
              Experiences & Attractions
            </option>
            <option value='FoodDrink'>Food & Drink</option>
          </select>
          <button onClick={() => setDateToggle((x) => !x)}>Date</button>
          {dateToggle && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setDate([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
          )}
          <button onClick={() => setFilters((x) => !x)}>apply filters</button>
        </li>
        {data.map((card) => {
          return <EventCard key={card.id} card={card} />;
        })}
        <li>
          <button onClick={() => setCursor(data[data.length - 1].id)}>
            next
          </button>
        </li>
      </ul>
    </>
  );
};

export default Events;
