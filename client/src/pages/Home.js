import React, { useState, useEffect } from "react";

import { Post, MyListView } from "../components";

export default function Home() {
  // Get User, store in State
  const renderCodePosts = () => {};
  const renderNerdPosts = () => {};
  const renderCalendarList = () => {};
  return (
    <div className="page-container">
      <div className="home-container">
        <div className="main-content">
          <div className="recent-code-posts">
            Gonna wanna render Codegory Posts (Post)
          </div>
          <div className="recent-nerd-posts">
            Gonna wanna render Nerd Room Posts (Post)
          </div>
        </div>

        <div className="calendar-list">
          Gonna wanna render calendar list for the week. (MyListView)
        </div>
      </div>
    </div>
  );
}
