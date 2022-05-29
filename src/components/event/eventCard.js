import './cardStyle.css';

export default function EventCard(props) {
  const { card, dark, handleFlag } = props;

  const handleBookmark = async (event) => {
    handleFlag(event);
    if (!event.isBookmarked) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      };

      fetch(`http://localhost:5000/event/${event.id}/save`, options)
        .then((res) => res.json())
        .catch((err) => console.log('the error message!', err.message));
    } else {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      };

      fetch(`http://localhost:5000/event/unsave/${event.bookmarkId}`, options)
        .then((res) => res.json())
        .catch((err) => console.log('the error message!', err.message));
    }
  };

  return (
    <li className={dark ? 'event--dark' : 'event'}>
      <a href={card.url} rel='noreferrer' target='_blank'>
        <div className='event__image'>
          {card.featured && <span className='featured-tag'>Featured</span>}
          <img src={card.image} alt={card.title} />
        </div>
      </a>
      <div onClick={() => handleBookmark(card)} className='fav-list'>
        <i
          className={`fa-${
            card.isBookmarked ? 'solid' : 'regular'
          } fa-bookmark`}></i>
      </div>
      <ul className='event__info'>
        <li className='event__info-item event__title'>
          <a
            className={dark ? 'event__title-a--dark' : 'event__title-a'}
            href={card.url}
            rel='noreferrer'
            target='_blank'>
            {card.title}
          </a>
        </li>
        <div className='info-event'>
          <li className='event__info-item event__date'>
            <i className='fa-solid fa-calendar-day'></i>
            {card.date ? card.date.trim().substring(0, 10) : card.date}
          </li>
          <li className='event__info-item event__time'>{card.time}</li>
          <li
            className={`event__info-item ${
              dark ? 'event__address--dark' : 'event__address'
            }`}>
            <i className='fa-solid fa-location-dot'></i>
            {card.address ? card.address.replace(/\+/gm, '\n') : card.location}
          </li>
          <li className='event__info-item event__ageLimit'>{card.age}</li>
        </div>
      </ul>
    </li>
  );
}
