import { useState, React, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from '../datepicker'
import Dropdown from '../dropdown/dropdown'
import './style.css'

const FilterBar = ({
  setLocation,
  location,
  setFormData,
  formData,
  setDate,
  date,
  dark,
}) => {
  const [dateToggle, setDateToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dateContainer = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, dateToggle])

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setIsOpen(false)
    }
    if (
      dateContainer.current &&
      !dateContainer.current.contains(event.target)
    ) {
      setDateToggle(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  return (
    <ul className='filter-bar'>
      <li
        className={`${
          dark ? 'filter-bar__li--dark' : 'filter-bar__li'
        } filter-bar__venue`}>
        <i className='event__icon fa-solid fa-magnifying-glass'></i>
        <input
          placeholder='club, gigs, festivals or venue name'
          autoComplete='off'
          className={dark ? 'filter-bar__name--dark' : 'filter-bar__name'}
          id='name'
          value={formData.name}
          onChange={handleChange}
          name='name'
        />
      </li>
      <li
        ref={container}
        className={`${
          dark ? 'filter-bar__li--dark' : 'filter-bar__li'
        } filter-bar__location dropdown-container`}>
        <Dropdown
          location={location}
          setLocation={setLocation}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          dark={dark}
        />
      </li>
      <li
        ref={dateContainer}
        className={`${
          dark ? 'filter-bar__li--dark' : 'filter-bar__li'
        } filter-bar__date`}>
        <DatePicker
          dark={dark}
          date={date}
          setDate={setDate}
          dateToggle={dateToggle}
          setDateToggle={setDateToggle}
        />
      </li>
      <li
        className={`${
          dark ? 'filter-bar__li--dark' : 'filter-bar__li'
        } filter-bar__search-btn`}>
        <Link className='search-btn' to='/events'>
          Search
        </Link>
      </li>
    </ul>
  )
}

export default FilterBar
