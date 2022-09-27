import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCalendarMonth, months } from "../../lib/dates";
import "./day.scss";

export const DayNav = ({ month, day, year }) => {
   const dispatch         = useDispatch();
   const currentMonthInfo = getCalendarMonth(`${month}/${day}/${year}`);
   const prevMonthInfo    = getCalendarMonth(`${month - 1}/${day}/${year}`);
   const prevDay          = day == 1 ? prevMonthInfo.totalDays : day - 1 ;
   const nextDay          = day == currentMonthInfo.totalDays ? 1 : day + 1;
   const prevMonth        = day == 1 ? month - 1 : month;
   const nextMonth        = day == currentMonthInfo.totalDays ? month + 1 : month;
   const prevYear         = month == 1 ? year - 1 : year;
   const nextYear         = month == 12 ? year + 1 : year;
 
   useEffect(() => {
    dispatch({
        type: "UPDATE_CALENDAR",
        calendarMonth: currentMonthInfo
    });
  }, [month]);

   
  return (
    <ul className="dayNav">
        <li>
            <Link to={`/calendar/${prevMonth}/${prevDay}/${prevYear}`}>	&#171; Prev</Link>
        </li>
        <li>
            <Link to="/calendar">
                <h1>{months[month - 1]} {day}, {year}</h1> 
            </Link>
        </li>
        <li>
            <Link to={`/calendar/${nextMonth}/${nextDay}/${nextYear}`}>Next &#187;</Link>
        </li>
    </ul>
  );
};