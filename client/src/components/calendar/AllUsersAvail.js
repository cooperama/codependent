import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";

import AvailModel from "../../models/avail";
import UserModel from "../../models/user";

// import RequestBuddy from "../../pages/RequestBuddy";

export default function AllUsersAvail({ userState, setUserState }) {
  const [allAvailable, setAllAvailable] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState({});
  // const [updatedAvail, setUpdatedAvail] = useState([]);
  // const [userState, setUserState] = useState({});
  // const params = useParams();
  const history = useHistory();

  // Set availability on calendar to all availability
  useEffect(() => {
    AvailModel.all().then((data) => {
      const backgroundEvents = data.avail.map((event) => {
        return {
          ...event,
          backgroundColor: "#025",
        };
      });
      setAllAvailable(backgroundEvents);

      // const starts = data.avail.map((avail) => new Date(avail.start));
      // starts.sort((a, b) => a - b);
      // console.log("starts....", starts);
      // for (let i = 0; i < starts.length; i++) {
      //   if (Date.now() > starts[i]) {
      //     console.log("too late: ", starts[i]);
      //   }
      // }
    });
  }, []);

  // Show event content on calendar
  const renderEventContent = (eventInfo) => {
    // const userObj = eventInfo.event.toPlainObject().extendedProps.user;
    const username = eventInfo.event.toPlainObject().extendedProps.user
      .username;
    return (
      <div>
        <p>{eventInfo.timeText}</p>
        <p>{username}</p>
      </div>
    );
  };

  const eventClickHandler = (eventInfo) => {
    const eventObj = eventInfo.event.toPlainObject().extendedProps;
    const start = eventInfo.event.toPlainObject().start;

    // If the event starts before current time
    if (Date.now() > new Date(start)) {
      return console.log("too late...");
    }
    if (eventObj.user) {
      const userObj = eventObj.user;
    }
    // const username = eventInfo.event.toPlainObject().extendedProps.user
    //   .username;

    AvailModel.getAvail(eventObj._id).then((data) => {
      if (data.err) {
        // handle error
        return;
      }
      history.push(`/request/${eventObj._id}`);
      // setSelectedEvent(data.avail);
      // setShowModal(true);
      // new page, render calendar (day view...) with only this event,
      // message: groovyBear is available from x -> y. would you like to request a study sesh?
      // on click yes, what time? --- how can I show a timeGrid of just the times of the event?
    });
  };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  return (
    <div>
      {/* {showModal && <RequestBuddy event={selectedEvent} />}
      {showModal && <button onClick={closeModal}>close modal</button>} */}
      {/* {!showModal && renderFullCalendar()} */}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        // plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // headerToolbar={{
        //   left: "prev,next today",
        //   center: "title",
        //   right: "dayGridMonth,timeGridWeek,timeGridDay",
        // }}
        initialView="timeGridWeek"
        overlap={true}
        // dayHeaders={false} // gets rid of dates at top...
        // render events on calendar
        // events={userState.available}
        events={allAvailable}
        eventContent={renderEventContent}
        // datesSet is called when a new DATE RANGE is rendered
        // datesSet={datesSetHandler} // READ
        // events set is called after event dat is initialized or changed
        // eventsSet={eventsSetHandler} // is this the same as datesSet???
        //

        // create new events
        // select={dateSelectHandler} // creates with eventAdd
        // eventAdd={eventAddHandler} // CREATE
        // update events (called on drag and drop/resize)
        // eventChange={eventChangeHandler} // UPDATE
        // delete events
        eventClick={eventClickHandler} // destroys with eventRemove
        // eventRemove={eventRemoveHandler}
      />
    </div>
  );
}
