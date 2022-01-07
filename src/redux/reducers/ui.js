import { getCalendarMonth, getTime } from "../../lib/dates";

const ui = {
  calendar: getCalendarMonth(new Date().toString()),
  menu: {
    status: "closed",
    time: ""
  }
};

export const uiReducer = (state = ui, action ) => {
  let updatedState = Object.assign({}, state);
  switch (action.type) {
    case "UPDATE_TIME":
      updatedState.menu.time = getTime();
      break;
    case "UPDATE_CALENDAR":
      updatedState.calendar = action.calendarMonth;
      break;
    case "UPDATE_NAV_STATUS":
      updatedState.menu.status = action.status;
      break;
  }
  return updatedState;
};
