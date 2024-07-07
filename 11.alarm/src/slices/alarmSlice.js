import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "normal",
  dates: {
    byId: {
      "": {
        alarms: [],
      },
    },
    allIds: [""],
  },
  ids: {
    byId: {
      alarm1: {
        id: "",
        date: "",
        time: "",
      },
    },
    allIds: [],
  },
};

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    addAlarm: (state, action) => {
      const { date, mode, time, message } = action.payload;
      const id = `alarm${state.ids.allIds.length + 1}`;

      if (state.dates.byId[date]) {
        state.dates.byId[date].alarms.push({
          id,
          date,
          mode,
          time,
          message,
        });

        state.dates.byId[date].alarms.sort((prev, next) =>
          prev.time > next.time ? 1 : -1
        );
      } else {
        state.dates.byId[date] = {
          alarms: [
            {
              id,
              date,
              mode,
              time,
              message,
            },
          ],
        };

        state.dates.allIds.push(date);
        state.dates.allIds.sort();
      }

      state.ids.byId[id] = {
        id,
        date,
        time,
      };

      if (!state.ids.allIds.includes(id)) {
        state.ids.allIds.push(id);
      }
    },
    removeAlarm: (state, action) => {
      const { date, id } = action.payload;

      state.dates.byId[date].alarms = state.dates.byId[date].alarms.filter(
        (alarm) => alarm.id !== id
      );

      if (state.dates.byId[date].alarms.length === 0) {
        delete state.dates.byId[date];

        state.dates.allIds = state.dates.allIds.filter(
          (dateId) => dateId !== date
        );
      }

      delete state.ids.byId[id];

      state.ids.allIds = state.ids.allIds.filter((alarmId) => alarmId !== id);
    },
  },
});

export const { setMode, addAlarm, removeAlarm } = alarmSlice.actions;

export default alarmSlice.reducer;
