import React from "react";
import CalendarDay from "./CalendarDay";

const CalendarWeek = (props) => {
  return (
    <tr>
      {props.week.map(function (day, index) {
        return (
          <CalendarDay
            key={index + day}
            day={day}
            month={props.month}
            year={props.year}
          />
        );
      })}
    </tr>
  );
};
export default CalendarWeek;
