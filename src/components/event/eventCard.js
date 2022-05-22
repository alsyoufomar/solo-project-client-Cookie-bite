import './cardStyle.css';

export default function EventCard(props) {
  const { card } = props;
  return (
    <li className='event'>
      <a href={card.url} rel='noreferrer' target='_blank'>
        <div className='event__image'>
          <span className='featured-tag'>Featured</span>
          <img src={card.image} alt={card.title} />
        </div>
      </a>
      <div className='fav-list'>
        <i class='fa-regular fa-bookmark'></i>
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
          {card.fullAddress
            ? card.fullAddress.replace(/\+/gm, '\n')
            : card.location}
        </li>
        <li className='event__info-item event__ageLimit'>{card.age}</li>
      </ul>
    </li>
  );
}
