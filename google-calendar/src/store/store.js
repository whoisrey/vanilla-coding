import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import calendarReducer from "../utils/slices/calendarSlice";

import initialState from "./initialState";

const reducer = {
  calendar: calendarReducer,
};

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
