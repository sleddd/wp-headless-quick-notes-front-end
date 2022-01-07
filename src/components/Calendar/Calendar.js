import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarMonth } from "../../lib/dates";
import CalendarWeek from "./CalendarWeek";
import { IconPickerItem } from "react-fa-icon-picker";
import "./calendar.scss";

const Calendar = (props) => {
  const dispatch = useDispatch();
  const calendarMonth = useSelector((state) => state.ui.calendar);

  useEffect(() => {
    dispatch({
      type: "UPDATE_CALENDAR",
      calendarMonth: calendarMonth
    });
  }, []);

  const monthNavHandler = (direction) => {
    let monthToGet = calendarMonth.numericalMonth;
    let yearToGet = calendarMonth.year;
    if (
      calendarMonth.numericalMonth >= 1 ||
      calendarMonth.numericalMonth <= 12
    ) {
      monthToGet = "previous" === direction ? monthToGet-- : monthToGet + 2;
    }
    if (monthToGet === 0) {
      monthToGet = 12;
      yearToGet--;
    }
    if (monthToGet === 13) {
      monthToGet = 1;
      yearToGet++;
    }
    const dateToGet = monthToGet + "/01/" + yearToGet;
    dispatch({
      type: "UPDATE_CALENDAR",
      calendarMonth: getCalendarMonth(new Date(dateToGet).toString())
    });
  };

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr>
            <th colSpan={7}>
              <div className="calendar__title">
                <IconPickerItem
                  icon="FaAngleLeft"
                  size={20}
                  color="#fff"
                  onClick={() => {
                    monthNavHandler("previous");
                  }}
                />
                <div>
                  {calendarMonth.monthName} {calendarMonth.year}
                </div>

                <IconPickerItem
                  icon="FaAngleRight"
                  size={20}
                  color="#fff"
                  onClick={() => {
                    monthNavHandler("next");
                  }}
                />
              </div>
            </th>
          </tr>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tues</th>
            <th>Weds</th>
            <th>Thurs</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody onClick={props.handler}>
          {calendarMonth.weeks.map((week) => (
            <CalendarWeek
              key={week.join("")}
              week={week}
              month={calendarMonth.numericalMonth + 1}
              year={calendarMonth.year}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
