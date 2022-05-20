import { useState, React } from 'react';
import { DateRange } from 'react-date-range';

const DatePicker = ({ setDateToggle, dateToggle, date, setDate }) => {
  const start = date[0].startDate;
  const end = date[0].endDate;

  function dateToStr(str) {
    const updated = str.toString().substring(4, 15).split(' ');
    return `${updated[0]} ${updated[1]}, ${updated[2]} `;
  }

  return (
    <>
      <i className='event__icon fa-solid fa-calendar-day'></i>
      <button className='button' onClick={() => setDateToggle((x) => !x)}>
        {dateToStr(start) + ' - ' + dateToStr(end)}
      </button>
      {dateToggle && (
        <DateRange
          className='fa-calendar'
          editableDateInputs={true}
          onChange={(item) => {
            setDate([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
      )}
    </>
  );
};

export default DatePicker;
