import { getCalendarMonth, getTime } from "../../lib/dates";

const ui = {
  calendar: getCalendarMonth(new Date().toString())
};

export const uiReducer = (state = ui, action ) => {
  let updatedState = Object.assign({}, state);
  switch (action.type) {
    case "UPDATE_CALENDAR":
      updatedState.calendar = action.calendarMonth;
      break;
  }
  return updatedState;
};
