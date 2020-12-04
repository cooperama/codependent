import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import Moment from "react-moment";

import AvailModel from "../../models/avail";

import { useParams, useHistory } from "react-router-dom";

export default function ShowEvent() {
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [requestedTime, setRequestedTime] = useState([]);
  const [outOfBounds, setOutOfBounds] = useState(false);

  const params = useParams();

  useEffect(() => {
    AvailModel.getAvail(params.id).then((data) => {
      // convert data to array and map over to add background prop
      const backgroundEvent = [].concat(data.avail).map((event) => {
        return {
          ...event,
          display: "background",
        };
      });
      setSelectedEvent(backgroundEvent);
      // setSelectedEvent([data.avail]);
    });
  }, []);

  // Show event content on calendar
  const renderEventContent = (eventInfo) => {
    // const eventObj = eventInfo.event.toPlainObject().extendedProps;
    return (
      <div>
        <p>{eventInfo.timeText}</p>
      </div>
    );
  };

  // Add event to calendar
  const dateSelectHandler = (e) => {
    console.log("date select");
    // select times, add to state
    const calendarApi = e.view.calendar;
    // calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      eventId: uuidv4(),
      start: e.startStr,
      startISO: e.start.toISOString(),
      end: e.endStr,
      endISO: e.end.toISOString(),
      backgroundColor: "purple",
    });
  };
  // Add avail to db
  const eventAddHandler = (e) => {
    const endTime = new Date(e.event.toPlainObject().end);
    const availEndTime = new Date(selectedEvent[0].end);
    if (endTime > availEndTime) {
      console.log("no!");
      setOutOfBounds(true);
    } else {
      setRequestedTime([...requestedTime, e.event.toPlainObject()]);
    }
  };

  const eventClickHandler = (eventInfo) => {
    const eventObj = eventInfo.event.toPlainObject().extendedProps;
    const endTime = new Date(eventInfo.event.toPlainObject().end);
    const availEndTime = new Date(selectedEvent[0].end);
    const updateRequestedTime = requestedTime.filter((time) => {
      return time.extendedProps.eventId !== eventObj.eventId;
    });
    if (endTime > availEndTime) {
      setOutOfBounds(false);
    } else {
      setRequestedTime(updateRequestedTime);
    }
    eventInfo.event.remove();
  };

  const eventRemoveHandler = (e) => {};

  const renderWarning = () => {
    return (
      <div>
        <p>Can't request a time outside of user's availability.</p>
        <p>Click slot to remove.</p>
      </div>
    );
  };

  const submitStudyRequest = () => {
    console.log("submit");
  };

  const renderTimeBanner = () => {
    console.log(requestedTime);
    return requestedTime.map((time) => {
      let start = new Date(time.start);
      let end = new Date(time.end);
      return (
        <div key={time.extendedProps.eventId}>
          <button onClick={submitStudyRequest}>
            Request Study Sesh for <Moment format="HH:mm">{start}</Moment> to{" "}
            <Moment format="HH:mm">{end}</Moment>
          </button>
        </div>
      );
    });
  };

  const renderCalendar = () => {
    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // headerToolbar={{
          //   left: "prev,next today",
          //   center: "title",
          //   right: "dayGridMonth,timeGridWeek,timeGridDay",
          // }}
          initialView="timeGridDay"
          initialDate={selectedEvent[0].start}
          selectable={true}
          selectMirror={true}
          // overlap={true}
          // dayHeaders={false} // gets rid of dates at top...

          events={selectedEvent}
          eventContent={renderEventContent}
          // create new events
          select={dateSelectHandler} // creates with eventAdd
          eventAdd={eventAddHandler} // CREATE
          eventClick={eventClickHandler}
        />
      </>
    );
  };

  return (
    <div>
      <h1>Show Event</h1>
      {outOfBounds && renderWarning()}
      {requestedTime && renderTimeBanner()}
      {selectedEvent.length !== 0 && renderCalendar()}
    </div>
  );
}
