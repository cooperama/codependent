import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CodegoryModel from "../models/codegory";

export default function Codegories() {
  const [codegories, setCodegories] = useState([]);

  // query db for CodegoryModel.all, store in state, map over to render
  useEffect(() => {
    CodegoryModel.all().then((data) => {
      console.log("data: ", data);
      // setCodegories([data])
      // Gotta skip over the Nerd Room Codegory though...
    });
  }, []);

  const renderCodegoryTopics = () => {
    return (
      <div className="codegory-topic">
        <p>Each Topic</p>
        {/* <Link to={`/codegory/${topic._id}`}>view posts in this codegory</Link> */}
      </div>
    );
  };
  return (
    <div className="page-container">
      <p>Codegories</p>
      <p>Show each Codegory topic + posts number maybe</p>
      <p>renderCodegoryTopics</p>
    </div>
  );
}
