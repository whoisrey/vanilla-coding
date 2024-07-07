import React, { useState } from 'react';

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { handleEditChange, handleEditClick, handleDeleteClick, handleCancelEdit, handleEditSubmit } from "../../utils/common/manageEdit";

import Button from "../common/Button";

import EventTextInput from "./EventTextInput";
import EventHourInput from "./EventHourInput";

function EventDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const events = useSelector((state) => state.calendar.events.byId);
  const params = useParams();

  const eventId = params.event_id;
  const targetEvent = events[eventId];

  function handleEditSubmit(event) {
    event.preventDefault();
    setIsEditing(false);
  }

  return (
    <div className="flex flex-col items-center absolute top-[6rem] left-0 right-0 bottom-0 gap-[2rem] bg-black">
      <div className="flex flex-col items-center gap-[2rem] mt-[4rem] p-[2rem] bg-green-500 border-b-[6px] border-b-green-800 border-r-[8px] border-r-green-600 text-slate-700">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex flex-col items-center gap-[2rem]">
            <div className="flex flex-col gap-[1rem]">
              <EventTextInput id="title" value={targetEvent.title} onChange={handleEditChange} maxLength="10" name="text_title"/>
              <EventTextInput id="description" value={targetEvent.description} onChange={handleEditChange} maxLength="20" name="text_description"/>
            </div>
            <div className="flex gap-[2rem]">
              <EventHourInput id="startedAt" value={targetEvent.startedAt} type="number" onChange={handleEditChange} name="date_started_at" />
              <EventHourInput id="endedAt" value={targetEvent.endedAt} type="number" onChange={handleEditChange} name="date_ended_at" />
            </div>
            <div className="flex gap-[2rem]">
              <Button name="edit_save" type="submit" text="Save" action={handleEditSubmit} />
              <Button name="edit_cancel" text="Cancel" action={handleCancelEdit}/>
            </div>
          </form>
        ) : (
          <>
            <p className="font-bold text-black">{targetEvent.title}</p>
            <p>{targetEvent.description}</p>
            <p className="text-[0.8rem]">{targetEvent.startedAt} ~ {targetEvent.endedAt}</p>
            <div className="flex gap-[1rem]">
              <Button name="edit_" text="Edit" action={handleEditClick}/>
              <Button name="edit_delete" text="Delete" action={handleDeleteClick}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
