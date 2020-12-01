import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CodegoryModel from "../models/codegory";

export default function Codegories() {
  const [codegories, setCodegories] = useState([]);

  // Make api call for all codegories
  useEffect(() => {
    CodegoryModel.all().then((data) => {
      setCodegories(data.codegories);
    });
  }, []);

  const renderCodegoryTopics = () => {
    // Skip over the Nerd Room codegory
    return codegories.map((codegory) => {
      if (codegory.topic !== "Nerd Room") {
        const postsLength = codegory.posts.length;
        return (
          <div key={codegory._id} className="codegory-topic">
            <p>{codegory.topic}</p>
            <p>
              This Codegory has {postsLength}{" "}
              {postsLength === 1 ? "post" : "posts"} associated with it.
            </p>
            <Link to={`/codegories/${codegory._id}`}>
              view posts in this codegory
            </Link>
          </div>
        );
      }
    });
  };
  return (
    <div className="page-container">
      <p>Codegories</p>
      {renderCodegoryTopics()}
    </div>
  );
}
