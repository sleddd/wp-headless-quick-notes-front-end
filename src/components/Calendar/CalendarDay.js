import React from "react";
import { Link } from "react-router-dom";

const CalendarDay = (props) => {
  const today = new Date().toLocaleDateString("en-US");
  const classes =
    today == props.month + "/" + props.day + "/" + props.year
      ? "calendar__current-day"
      : "";
  return (
    <td className={classes}>
        <Link to={`/calendar/${props.month}/${props.day}/${props.year}`}>
          {props.day < 1 ? "" : props.day}
        </Link>
    </td>
  );
};

export default CalendarDay;
