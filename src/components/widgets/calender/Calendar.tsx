import DatePicker from 'react-datepicker'
// import { useState } from 'react';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';


interface CalenderProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}
const Calender: React.FC<CalenderProps> = ({ selectedDate, onDateChange }) => {
  // const [startDate, setStartDate] = useState<Date | null>(null);

  const minDate = new Date(1959,1,31); // Today
  const maxDate = new Date(2025, 11, 31); // Dec 31, 2025

  return (
  <DatePicker

  showMonthYearDropdown
  scrollableMonthYearDropdown
  // showFourColumnMonthYearPicker
  selected={selectedDate}
  onChange={onDateChange}
  // onChange={handleDateChange}
  dateFormat="MMMM d, yyyy"
  minDate={minDate}  // Add minDate
  maxDate={maxDate}  // Add maxDate
  className='bg-gray-100 br-30'
  placeholderText='   Click to Select Date'
  required
 />
     

  
  );
};

export default Calender