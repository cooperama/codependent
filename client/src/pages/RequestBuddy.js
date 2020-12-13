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

export default function ShowEvent() {
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [requestedTime, setRequestedTime] = useState([]);
  const [outOfBounds, setOutOfBounds] = useState(false);

  const params = useParams();

  useEffect(() => {
    AvailModel.getAvail(params.id).then((data) => {
      // convert data to array (is currently an obj) and map over to add background prop
      const backgroundEvent = [].concat(data.avail).map((event) => {
        return {
          ...event,
          display: "background",
        };
      });
      setSelectedEvent(backgroundEvent);
    });
  }, []);

  // Show event content on calendar
  const renderEventContent = (eventInfo) => {
    return (
      <div>
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
    console.log(selectedEvent);
  };

  const eventClickHandler = (eventInfo) => {
    const eventObj = eventInfo.event.toPlainObject().extendedProps;
    const endTime = new Date(eventInfo.event.toPlainObject().end);
    const startTime = new Date(eventInfo.event.toPlainObject().start);
    const availEndTime = new Date(selectedEvent[0].end);
    const availStartTime = new Date(selectedEvent[0].start);

    // const updateRequestedTime = requestedTime.filter((time) => {
    //   return time.extendedProps.eventId !== eventObj.eventId;
    // });

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

  const eventRemoveHandler = (e) => {};

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

  const submitStudyRequest = () => {
    console.log("submit");
  };

  const renderTimeBanner = () => {
    return requestedTime.map((time) => {
      let start = new Date(time.start);
      let end = new Date(time.end);
      return (
        <div className="study-times-div" key={time.extendedProps.eventId}>
          <button className="btn btn-wide" onClick={submitStudyRequest}>
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
        {selectedEvent && (
          <h1>Study With [{selectedEvent[0].user.username}]</h1>
        )}
      </div>
      {outOfBounds && renderWarning()}
      {requestedTime && renderTimeBanner()}
      {selectedEvent.length !== 0 && renderCalendar()}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/daygrid";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { v4 as uuidv4 } from "uuid";

// import UserModel from "../models/user";
// import AvailModel from "../models/avail";

// import { useParams, useHistory } from "react-router-dom";

// export default function RequestBuddy({ userState, setUserState }) {
//   const [selectedEvent, setSelectedEvent] = useState({});

//   const params = useParams();
//   const history = useHistory();

//   // Set availability
//   useEffect(() => {
//     if (localStorage.getItem("uid")) {
//       UserModel.getUser().then((data) => {
//         setUserState(data.user);
//       });
//     } else {
//       console.log("no local storage uid thing...", userState);
//       history.push("/register");
//     }
//     AvailModel.getAvail(params.id).then((data) => {
//       if (data.error) {
//         console.log(data.error);
//       }
//       setSelectedEvent(data.avail);
//       console.log("data.avail: ", data.avail);
//     });
//   }, []);

//   // Show event content on calendar
//   const renderEventContent = (eventInfo) => {
//     return <p>{eventInfo.timeText}</p>;
//   };

//   // Add event to calendar
//   const dateSelectHandler = (e) => {
//     const calendarApi = e.view.calendar;
//     calendarApi.unselect(); // clear date selection

//     calendarApi.addEvent({
//       eventId: uuidv4(),
//       start: e.startStr,
//       startISO: e.start.toISOString(),
//       end: e.endStr,
//       endISO: e.end.toISOString(),
//     });
//   };
//   // Add avail to db
//   const eventAddHandler = (e) => {};

//   // Click event to remove it
//   const eventClickHandler = (e) => {
//     // Get avail id - _id if already on User Model, eventId if not added to user yet
//     e.event.remove();
//   };

//   const eventRemoveHandler = (e) => {};

//   return (
//     <div>
//       <p>Select the time you'd like to study</p>
//       <FullCalendar
//         plugins={[timeGridPlugin, interactionPlugin]}
//         // plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         // headerToolbar={{
//         //   // left: "prev,next today",
//         //   center: "title",
//         //   // right: "timeGridDay",
//         // }}
//         initialView="timeGridDay"
//         selectable={true}
//         selectMirror={true}
//         events={selectedEvent}
//         eventContent={renderEventContent}
//         // slotMinTime={new Date(selectedEvent.start)}
//         // slotMaxTime={new Date(selectedEvent.end)}
//         // create new events
//         select={dateSelectHandler} // creates with eventAdd
//         eventAdd={eventAddHandler} // CREATE
//         // update events (called on drag and drop/resize)
//         // eventChange={eventChangeHandler} // UPDATE
//         // delete events
//         eventClick={eventClickHandler} // destroys with eventRemove
//         eventRemove={eventRemoveHandler}
//       />
//       <button>send study request</button>
//     </div>
//   );
// }
