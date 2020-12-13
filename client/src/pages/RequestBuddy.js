import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import Moment from "react-moment";

import AvailModel from "../models/avail";

import { useParams, useHistory } from "react-router-dom";

export default function RequestBuddy({ userState, setUserState }) {
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [requestedTime, setRequestedTime] = useState([]);
  const [outOfBounds, setOutOfBounds] = useState(false);

  const params = useParams();

  useEffect(() => {
    AvailModel.getAvail(params.id).then((data) => {
      // convert data to array (is currently an obj) and map over to add background prop and display on calendar
      const backgroundEvent = [].concat(data.avail).map((event) => {
        return {
          ...event,
          display: "background",
        };
      });
      setSelectedEvent(backgroundEvent);
    });
  }, []);

  // Show selected event content on calendar
  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <p>{eventInfo.timeText}</p>
      </div>
    );
  };

  // Add event to calendar
  const dateSelectHandler = (e) => {
    const calendarApi = e.view.calendar;

    calendarApi.addEvent({
      eventId: uuidv4(),
      start: e.startStr,
      startISO: e.start.toISOString(),
      end: e.endStr,
      endISO: e.end.toISOString(),
    });
  };

  // Add requested time to state
  const eventAddHandler = (e) => {
    // Handle selection out of buddy's availability
    const endTime = new Date(e.event.toPlainObject().end);
    const startTime = new Date(e.event.toPlainObject().start);
    const availEndTime = new Date(selectedEvent[0].end);
    const availStartTime = new Date(selectedEvent[0].start);
    if (endTime > availEndTime || startTime < availStartTime) {
      setOutOfBounds(true);
    } else {
      setRequestedTime([...requestedTime, e.event.toPlainObject()]);
    }
  };

  const eventClickHandler = (eventInfo) => {
    const eventObj = eventInfo.event.toPlainObject().extendedProps;
    const endTime = new Date(eventInfo.event.toPlainObject().end);
    const startTime = new Date(eventInfo.event.toPlainObject().start);
    const availEndTime = new Date(selectedEvent[0].end);
    const availStartTime = new Date(selectedEvent[0].start);

    if (endTime > availEndTime || startTime < availStartTime) {
      setOutOfBounds(false);
    } else {
      const updateRequestedTime = requestedTime.filter((time) => {
        return time.extendedProps.eventId !== eventObj.eventId;
      });
      setRequestedTime(updateRequestedTime);
    }
    eventInfo.event.remove();
  };

  const renderWarning = () => {
    return (
      <div className="error-container">
        <span className="error-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </span>
        <p className="error-message">
          Can't request a time outside of user's availability.
        </p>
        <p className="error-message">Click slot to remove.</p>
      </div>
    );
  };

  const submitStudyRequest = (e) => {
    // Select chosen time & set in state
    const chosenTime = requestedTime.filter((time) => {
      return time.extendedProps.eventId === e.target.dataset.eventId;
    });
    setSelectedTime(chosenTime);
  };

  const requestModal = () => {
    return (
      <div className="request-modal">
        <div className="request-modal-content">
          <p>To: [{selectedEvent[0].user.username}]</p>
          <p>
            <Moment format="HH:mm">{selectedTime.start}</Moment> to{" "}
            <Moment format="HH:mm">{selectedTime.end}</Moment>
          </p>
          <button onClick={handleConfirm} className="btn btn-wide">
            confirm
          </button>
        </div>
      </div>
    );
  };

  const handleConfirm = () => {
    // {/* // create Paired doc with paired = false */}
  };

  const renderTimeBanner = () => {
    return requestedTime.map((time) => {
      let start = new Date(time.start);
      let end = new Date(time.end);
      return (
        <div className="study-times-div" key={time.extendedProps.eventId}>
          <button
            data-event-id={time.extendedProps.eventId}
            className="btn btn-wide"
            onClick={submitStudyRequest}
          >
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
          initialView="timeGridDay"
          initialDate={selectedEvent[0].start}
          selectable={true}
          selectMirror={true}
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
    <div className="page-container">
      <div className="page-heading">
        {selectedEvent[0] && (
          <h1>Study With [{selectedEvent[0].user.username}]</h1>
        )}
      </div>
      <div className="buddy-instructions">
        <li>2. Select and drag to choose a time. Click to remove.</li>
      </div>
      {outOfBounds && renderWarning()}
      {requestedTime && renderTimeBanner()}
      {selectedEvent.length !== 0 && renderCalendar()}
    </div>
  );
}
