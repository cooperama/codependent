import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CodegoryModel from "../models/codegory";
import UserModel from "../models/user";

export default function Codegories({ userState, setUserState }) {
  const [codegories, setCodegories] = useState([]);
  const history = useHistory();
  // Make api call for all codegories
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      console.log(localStorage);
      UserModel.getUser().then((data) => {
        console.log(data);
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
          history.push("/register");
        }
      });
    }
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
                <div className="codegories-posts-count">
                  <p>
                    {postsLength} {postsLength === 1 ? "post" : "posts"}
                  </p>
                </div>
                <div className="codegories-link-div">
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
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
