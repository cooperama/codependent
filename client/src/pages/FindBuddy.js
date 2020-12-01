import React, { useState, useEffect } from "react";

export default function FindBuddy() {
  return (
    <div className="page-container">
      <div className="find-buddy-container">
        <div className="buddy-instructions">
          <p>FindBuddy</p>
          <ol>
            <li>1. Choose an available time</li>
            <li>2. Select overlapping time</li>
            <li>3. Send request</li>
          </ol>
        </div>
        <div className="all-availability">
          <p>AllUsersAvail Calendar Component</p>
        </div>
      </div>
    </div>
  );
}
