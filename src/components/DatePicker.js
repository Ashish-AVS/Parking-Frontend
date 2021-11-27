import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickers = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  console.log(startDate);
  const addDays = (date, days) => {
    return new Date(new Date().getTime()+(days*24*60*60*1000));;
  }
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()}
      maxDate={addDays(new Date(), 2)}
      placeholderText="Select a date between today and 3 days in the future"
    />
  );
};

export default DatePickers;
