import { combineReducers } from "redux";
import { uiReducer } from "./ui";

export const rootReducer = combineReducers({
  ui: uiReducer
});
