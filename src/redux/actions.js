//import { getLocalISO } from "../lib/dates";

export const journalItemActions = {
  UPDATE_DAYINDEX: "UPDATE_DAYINDEX"
};

export const updateDayIndex = (item) => {
  try {
    fetch("/api/v1/items/dayIndex", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: item.id,
        dayIndex: item.dayIndex
      })
    });
  } catch (err) {
    console.log(err);
  }
};
