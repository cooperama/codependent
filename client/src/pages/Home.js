import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import UserModel from "../models/user";
import PostModel from "../models/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Post } from "../components";

export default function Home({ userState, setUserState }) {
  const history = useHistory();
  const [recentPosts, setRecentPosts] = useState();
  const [recentForumPosts, setRecentForumPosts] = useState();

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      console.log(localStorage);
      UserModel.getUser().then((data) => {
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
          history.push("/register");
        }
      });
    } else {
      history.push("/register");
    }
    // get most recent posts
    PostModel.recentPosts().then((data) => {
      const codePosts = [];
      const forumPosts = [];
      if (codePosts && data.posts) {
        for (let i = 0; codePosts.length < 3 && i < data.posts.length; i++) {
          if (data.posts[i].codegory) {
            if (data.posts[i].codegory.topic !== "Nerd Room") {
              codePosts.push(data.posts[i]);
            }
          }
        }
        for (let i = 0; forumPosts.length < 3 && i < data.posts.length; i++) {
          if (data.posts[i].codegory) {
            if (data.posts[i].codegory.topic === "Nerd Room") {
              forumPosts.push(data.posts[i]);
            }
          }
        }
        setRecentForumPosts(forumPosts);
        setRecentPosts(codePosts);
      } else {
        history.push("/register");
      }
    });
  }, []);

  const renderCodePosts = () => {
    if (recentPosts && recentPosts.length !== 0) {
      return recentPosts.map((post) => {
        return (
          <Post
            key={post._id}
            userState={userState}
            setUserState={setUserState}
            post={post}
          />
        );
      });
    } else {
      return <p>No posts here yet!</p>;
    }
  };

  const renderForumPosts = () => {
    if (recentForumPosts && recentForumPosts.length !== 0) {
      return recentForumPosts.map((post) => {
        return (
          <Post
            key={post._id}
            userState={userState}
            setUserState={setUserState}
            post={post}
          />
        );
      });
    } else {
      return <p>No posts here yet!</p>;
    }
  };

  const renderCalendarList = () => {};

  return (
    <>
      <div className="page-container">
        <div className="home-container">
          <div className="main-content">
            <div className="home-banner-div">
              <h1>co[de]pendent</h1>
            </div>
            <div className="home-post-containers">
              <div className="recent-code-posts">
                {renderForumPosts && renderForumPosts()}

                <div className="view-posts">
                  <Link to="/nerdroom">
                    <p>View Forum</p>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="home-post-containers">
              <div className="recent-code-posts">
                {renderCodePosts && renderCodePosts()}

                <div className="view-posts">
                  <Link to="/codegories">
                    <p>View Codegories</p>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="calendar-list">
        <div className="calendar-icon-div">
          <span>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
          <span>
            <FontAwesomeIcon icon={faCalendar} />
          </span>
        </div> */}
      {/* Gonna wanna render calendar list for the week. (MyListView) */}
      {/* </div> */}
    </>
  );
}
