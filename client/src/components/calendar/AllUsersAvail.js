import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

import AvailModel from "../../models/avail";

export default function AllUsersAvail({ userState, setUserState }) {
  const [allAvailable, setAllAvailable] = useState([]);

  const warningRef = useRef();
  const errorMessage = useRef();
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
    });
  }, []);

  const mouseEnterHandler = (mouseEnterInfo) => {
    // console.log(mouseEnterInfo.event.toPlainObject());
    // console.log(mouseEnterInfo.view.type === "timeGridDay");
    if (
      mouseEnterInfo.view.type !== "timeGridDay" &&
      mouseEnterInfo.jsEvent.target.children[0].classList.contains(
        "hide-content"
      )
    ) {
      mouseEnterInfo.jsEvent.target.children[0].classList.remove(
        "hide-content"
      );
    }
  };

  const mouseLeaveHandler = (mouseLeaveInfo) => {
    if (
      mouseLeaveInfo.view.type !== "timeGridDay" &&
      !mouseLeaveInfo.jsEvent.target.children[0].classList.contains(
        "hide-content"
      )
    ) {
      mouseLeaveInfo.jsEvent.target.children[0].classList.add("hide-content");
    }
  };

  // Show event content on calendar
  const renderEventContent = (eventInfo) => {
    const username = eventInfo.event.toPlainObject().extendedProps.user
      .username;
    if (eventInfo.view.type === "timeGridDay") {
      return (
        <>
          <div className="event-content-day-view">
            <div>
              <p>{eventInfo.timeText}</p>
              <p>[{username}]</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="event-content hide-content">
            <div className="event-modal">
              <p>{eventInfo.timeText}</p>
              <p>[{username}]</p>
            </div>
          </div>
        </>
      );
    }
  };

  const displayWarning = () => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const showWarning = async () => {
      warningRef.current.classList.remove("hide-content");
      await sleep(1500);
      warningRef.current.classList.add("hide-content");
    };
    showWarning();
  };

  const eventClickHandler = (eventInfo) => {
    const eventObj = eventInfo.event.toPlainObject().extendedProps;
    const start = eventInfo.event.toPlainObject().start;
    // If the event starts before current time
    if (Date.now() > new Date(start)) {
      errorMessage.current.innerText = "Too late for this study session...";
      displayWarning();
      // If the event was created by the user
    } else if (eventObj.user.username === userState.username) {
      errorMessage.current.innerText = "You want to study with yourself...?";
      displayWarning();
    } else {
      history.push(`/request/${eventObj._id}`);
    }
  };

  return (
    <>
      <div ref={warningRef} className="error-container hide-content">
        <span className="error-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </span>
        <p ref={errorMessage} className="error-message"></p>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        initialView="timeGridWeek"
        overlap={true}
        allDaySlot={false}
        events={allAvailable}
        eventContent={renderEventContent}
        eventClick={eventClickHandler}
        eventMouseEnter={mouseEnterHandler}
        eventMouseLeave={mouseLeaveHandler}
      />
    </>
  );
}
