import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import CodegoryModel from "../models/codegory";

export default function Codegories({ userState, setUserState }) {
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
          <Link key={codegory._id} to={`/codegories/${codegory._id}`}>
            <div className="codegory-card">
              <div className="codegories-topic">
                <p>{codegory.topic}</p>
              </div>
              <div className="codegories-topic-second">
                <div className="codegories-blurb">
                  <p>Icons here would be cool!</p>
                </div>
                <div>
                  <div className="codegories-posts-count">
                    <p>
                      {postsLength} {postsLength === 1 ? "post" : "posts"}
                    </p>
                  </div>
                  <div className="codegories-link-div">
                    <span>
                      <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      }
    });
  };
  return (
    <div className="page-container">
      <h1 className="codegories-heading">Codegories</h1>
      <div className="codegories-container">{renderCodegoryTopics()}</div>
    </div>
  );
}
