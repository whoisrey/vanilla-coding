import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import alarmReducer from "../slices/alarmSlice";
import clockReducer from "../slices/clockSlice";

const reducer = {
  alarm: alarmReducer,
  clock: clockReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
