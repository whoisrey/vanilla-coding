import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addEvent } from "../../utils/slices/calendarSlice";

import Button from "../common/Button";

import EventTextInput from "./EventTextInput";
import EventHourInput from "./EventHourInput";
import EventDateInput from "./EventDateInput";

function EventForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eventInfo, setEventInfo] = useState({
    title: '',
    description: '',
    startedAt: '',
    endedAt: '',
    date: '',
  });

  function updateChangedValue(e) {
    const { id, value } = e.target;
    const updatedValue = (id === "startedAt" || id === "endedAt") ? value.padStart(2, "0") : value;
    setEventInfo((prevData) => ({
      ...prevData,
      [id]: updatedValue,
    }));
  };

  function handleSubmitInfo(e) {
    e.preventDefault();
    dispatch(addEvent(eventInfo));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center absolute top-[6rem] left-0 right-0 bottom-0 bg-black">
      <form className="flex flex-col gap-[2rem] p-[2rem] mt-[4rem] bg-green-500 border-b-[6px] border-b-green-800 border-r-[8px] border-r-green-600 text-slate-700" onSubmit={handleSubmitInfo}>
        <EventTextInput id="title" name="text_title" value={eventInfo.title} maxLength="10" onChange={updateChangedValue}/>
        <EventTextInput id="description" name="text_description" value={eventInfo.description} maxLength="20" onChange={updateChangedValue} />
        <div className="flex gap-[2rem]">
          <EventHourInput id="startedAt" type="number" name="time_started_at" value={eventInfo.startedAt} onChange={updateChangedValue} />
          <EventHourInput id="endedAt" type="number" name="time_ended_at" value={eventInfo.endedAt} onChange={updateChangedValue} />
        </div>
        <EventDateInput id="date" type="date" name="date_date" value={eventInfo.date} onChange={updateChangedValue} />
        <Button name="form_submit" type="submit" text="Submit" action={handleSubmitInfo} />
      </form>
    </div>
  );
}

export default EventForm;
