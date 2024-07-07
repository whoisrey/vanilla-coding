import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDate: new Date().toISOString(),
  mode: "normal",
};

export const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    updateTime: (state) => {
      state.currentDate = new Date().toISOString();
    },
    setClockMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { updateTime, setClockMode } = clockSlice.actions;

export default clockSlice.reducer;
