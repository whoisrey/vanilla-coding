import React from "react";

import { useSelector } from "react-redux";

import { formatDate, getStartOfWeek } from "../../utils/common/processDate";

import Daily from "./Daily";

function Weekly() {
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const startOfWeek = getStartOfWeek(currentDate);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const firstDateOfWeek = new Date(startOfWeek);
    const dates = firstDateOfWeek.setDate(firstDateOfWeek.getDate() + i);

    return formatDate(dates).newData;
  });

  return (
    <div className="flex">
      {weekDates.map((_, index) => (
        <Daily key={index} index={index} />
      ))}
    </div>
  );
}

export default Weekly;
