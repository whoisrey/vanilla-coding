import { createSlice } from "@reduxjs/toolkit";

import initialState from "../../store/initialState";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    toggleView: (state) => {
      if (state.viewMode === "daily") {
        state.viewMode = "weekly";
      } else if (state.viewMode === "weekly") {
        state.viewMode = "daily";
      }
    },
    changeDate: (state, action) => {
      state.currentDate = action.payload;
    },
    addEvent: function (state, action) {
      const { title, description, date, startedAt, endedAt } = action.payload;
      const eventId = `event${state.events.allIds.length + 1}`;

      state.events.byId[eventId] = {
        id: eventId,
        title,
        description,
        date,
        startedAt,
        endedAt,
      };

      state.events.allIds.push(eventId);

      if (!state.dates.byId[date]) {
        state.dates.byId[date] = {
          id: `date${state.dates.allIds.length + 1}`,
          startedAt: new Array(24).fill(null),
        };

        state.dates.allIds.push(`date${state.dates.allIds.length + 1}`);
      }

      state.dates.byId[date].startedAt[Number(startedAt)] = eventId;
    },
  },
});

export const { toggleView, changeDate, addEvent, editEvent, removeEvent } =
  calendarSlice.actions;

export default calendarSlice.reducer;
