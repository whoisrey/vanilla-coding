import { useSelector } from "react-redux";

import Timeline from "./Timeline";
import Weekly from "./Weekly";
import Daily from "./Daily";

function Calendar() {
  const viewMode = useSelector((state) => state.calendar.viewMode);

  return (
    <div className="flex px-[1rem]">
      <Timeline />
      {viewMode === "weekly" ?  <Weekly /> : <Daily />}
    </div>
  )
}

export default Calendar;
