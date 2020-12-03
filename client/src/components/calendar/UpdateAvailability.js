import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";

import UserModel from "../../models/user";
import AvailModel from "../../models/avail";

import { useHistory } from "react-router-dom";

export default function UpdateAvailability() {
  // If I try to set availability for the calendar events from the userState... it gives me an error.
  const [availability, setAvailability] = useState([]);
  // const [updatedAvail, setUpdatedAvail] = useState([]);
  const [userState, setUserState] = useState({});
  const history = useHistory();

  // Set availability on calendar to user's current availability
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      UserModel.getUser().then((data) => {
        setAvailability(data.user.available);
        // setUpdatedAvail(data.user.available);
        setUserState(data.user);
        console.log(userState);
      });
    } else {
      console.log("no local storage uid thing...", userState);
    }
  }, []);

  // Show event content on calendar
  const renderEventContent = (eventInfo) => {
    return <p>{eventInfo.timeText}</p>;
  };

  // Add event to calendar
  const dateSelectHandler = (e) => {
    const calendarApi = e.view.calendar;
    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      eventId: uuidv4(),
      start: e.startStr,
      startISO: e.start.toISOString(),
      end: e.endStr,
      endISO: e.end.toISOString(),
    });
  };

  // Add avail to db
  const eventAddHandler = (e) => {
    const newAvail = {
      // this has the start and end times
      ...e.event.toPlainObject(),
      user: userState._id,
      eventId: e.event.toPlainObject().extendedProps.eventId,
      available: true,
    };
    AvailModel.create(newAvail).then((data) => {
      setUserState({
        ...userState,
        available: [...userState.available, data.avail],
      });
      console.log(" avail created! ", userState);
    });

    // setUpdatedAvail([...updatedAvail, e.event.toPlainObject()]);
  };

  // Click event to remove it
  const eventClickHandler = (e) => {
    // Get avail id - _id if already on User Model, eventId if not added to user yet
    let availIdToDelete = e.event.toPlainObject().extendedProps;
    if (availIdToDelete._id) {
      availIdToDelete = availIdToDelete._id;
    } else if (availIdToDelete.eventId) {
      // After clicking the update avail button, this causes an error because foundAvail does't exist...
      const foundAvail = userState.available.filter((avail) => {
        return avail.eventId === availIdToDelete.eventId;
      });
      availIdToDelete = foundAvail[0]._id;
    } else {
      console.log("event click handler ~ no idssss ");
    }

    AvailModel.delete(availIdToDelete).then((data) => {
      // filter out avail to delete and update userState
      const newAvail = userState.available.filter(
        (avail) => avail._id !== availIdToDelete
      );
      setUserState({
        ...userState,
        available: newAvail,
      });
      // setUpdatedAvail(newAvail);
      console.log("user state from event click: ", userState);
    });

    e.event.remove();
  };

  const eventRemoveHandler = (e) => {
    const availObjectIds = userState.available.map((avail) => {
      return avail._id;
    });
    setUserState({
      ...userState,
      available: availObjectIds,
    });
    // UserModel.update(userState._id, userState).then((data) => {
    //   console.log("in event remove handler... ", data);
    //   // not working....
    // });
  };

  // Update User model when done updating avail.
  const updateUserAvailability = () => {
    // Create ObjectIds of availability to update User Model with
    const availObjectIds = userState.available.map((avail) => {
      return avail._id;
    });
    setUserState({
      ...userState,
      available: availObjectIds,
    });
    UserModel.update(userState._id, userState).then((data) => {
      // history.push(`/myprofile`);
      console.log("in user update handler... ", data);
      setUserState({
        ...userState,
        available: availObjectIds,
      });
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="timeGridWeek"
        selectable={true}
        selectMirror={true}
        // render events on calendar
        // events={userState.available}
        events={availability}
        eventContent={renderEventContent}
        // datesSet is called when a new DATE RANGE is rendered
        // datesSet={datesSetHandler} // READ
        // events set is called after event dat is initialized or changed
        // eventsSet={eventsSetHandler} // is this the same as datesSet???
        //

        // create new events
        select={dateSelectHandler} // creates with eventAdd
        eventAdd={eventAddHandler} // CREATE
        // delete events
        eventClick={eventClickHandler} // destroys with eventRemove
        eventRemove={eventRemoveHandler}
      />
      <button onClick={updateUserAvailability}>Update Availability</button>
    </div>
  );
}
