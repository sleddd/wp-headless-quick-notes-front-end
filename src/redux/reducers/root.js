import { combineReducers } from "redux";
import { uiReducer } from "./ui";
import { journalReducer } from "./journal";

export const rootReducer = combineReducers({
  ui: uiReducer, 
  journal: journalReducer
});
