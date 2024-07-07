import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import { formatDate } from "../../utils/common/processDate";

import EventBox from "./EventBox";

function Daily({ index }) {
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const currentViewMode = useSelector((state) => state.calendar.viewMode);
  const dates = useSelector((state) => state.calendar.dates);
  const events = useSelector((state) => state.calendar.events);

  const isWeekly = currentViewMode === "weekly";

  const formattedDate = formatDate(currentDate);
  const targetDate = dates.byId[formattedDate.newData]?.startedAt || [];

  const navigate = useNavigate();

  function updateScreen(event) {
    const eventId = event.currentTarget.getAttribute('event-id');
    eventId ? navigate(`/events/${eventId}`) : navigate(`/events/new`);
  }

  return (
    <table className="text-center w-[10rem]">
      <thead className="sticky top-[6rem] h-[5rem] bg-black">
        <tr>
          <td className="flex flex-col justify-center items-center w-[10rem] h-[5rem] gap-[0.5rem] z-20">
            <p className="font-bold text-green-700">{isWeekly ? formattedDate.newDay : formatDate(currentDate, index).newDay}</p>
            <p className="flex justify-center items-center rounded-full w-10 h-10 bg-black text-green-500 font-bold transition-all duration-1000 hover:bg-green-500 hover:text-black cursor-pointer">
              {isWeekly ? formatDate(currentDate, index).newDate : formattedDate.newDate}
            </p>
          </td>
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(24).keys()).map((index) => {
          const eventId = targetDate[index];
          const event = eventId ? events.byId[eventId] : {};

          return (
            <tr className="h-[10rem] cursor-pointer" key={index} event-id={event ? event.id : null} onClick={updateScreen}>
              <EventBox event={event} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Daily;

Daily.propTypes = {
  index: PropTypes.number.isRequired,
};
