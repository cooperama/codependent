import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import Moment from "react-moment";
import { Post, Comment, UpdateAvailability } from "../components";

import PostModel from "../models/post";
import UserModel from "../models/user";

export default function Profile({ userState, setUserState }) {
  const [userPosts, setUserPosts] = useState();
  const [profilePage, setProfilePage] = useState(true);
  const history = useHistory();
  const calendarRef = useRef();

  const infoRef = useRef();
  const postsRef = useRef();
  const commentsRef = useRef();
  const containerRefs = [infoRef, postsRef, commentsRef];

  const profileTabRef = useRef();
  const postsTabRef = useRef();
  const commentsTabRef = useRef();
  const tabRefs = [profileTabRef, postsTabRef, commentsTabRef];

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      UserModel.getUser().then((data) => {
        console.log(data);
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
  }, []);

  const renderPosts = () => {
    if (userState) {
      if (userState.posts.length === 0) {
        return (
          <div className="no-posts-div">
            <p>You have no posts yet!</p>
          </div>
        );
      }
      return userState.posts.map((post) => {
        return (
          <Post
            userState={userState}
            setUserState={setUserState}
            key={post._id}
            post={post}
          />
        );
      });
    }
  };
  const renderComments = () => {
    if (userState) {
      if (userState.posts.length === 0) {
        return (
          <div className="no-posts-div">
            <p>You have no comments yet!</p>
          </div>
        );
      }
      return userState.comments.map((comment) => {
        return (
          <Comment
            userState={userState}
            setUserState={setUserState}
            profilePage={profilePage}
            commentId={comment._id}
            key={comment._id}
          />
        );
      });
    }
  };
  const renderContent = () => {
    if (userState) {
      return (
        <>
          <div className="profile-names">
            <h1 className="profile-username">{userState.username}</h1>
            <p>{userState.fullname}</p>
            <p>{userState.email}</p>
          </div>
          <div className="profile-stats">
            <p>
              Member since:
              <Moment format="MMM DD, YYYY">{userState.createdAt}</Moment>
            </p>
            <p>Posts: {userState.posts.length}</p>
            <p>Comments: {userState.comments.length}</p>
          </div>
        </>
      );
    } else {
      console.log("no user state in profile........");
      history.push("/register");
    }
  };

  const handleTabClick = (e) => {
    tabRefs.forEach((tab) => {
      tab.current.classList.remove("profile-tab-active");
    });
    e.target.classList.add("profile-tab-active");
    switch (e.target.innerText) {
      case "My Profile":
        containerRefs.forEach((container) => {
          container.current.classList.add("hide-content");
        });
        infoRef.current.classList.remove("hide-content");
        break;
      case "My Posts":
        containerRefs.forEach((container) => {
          container.current.classList.add("hide-content");
        });
        postsRef.current.classList.remove("hide-content");
        break;
      case "My Comments":
        containerRefs.forEach((container) => {
          container.current.classList.add("hide-content");
        });
        commentsRef.current.classList.remove("hide-content");
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-container">
      <div className="profile-heading">
        {userState && <h1>{userState.username}</h1>}
      </div>
      <div className="profile-content">
        <div className="profile-controller">
          <div className="profile-page-tabs">
            <li
              ref={profileTabRef}
              onClick={handleTabClick}
              className="profile-tab-active"
            >
              My Profile
            </li>
            <li ref={postsTabRef} onClick={handleTabClick}>
              My Posts
            </li>
            <li ref={commentsTabRef} onClick={handleTabClick}>
              My Comments
            </li>
          </div>
          <div className="avail-button-div">
            <Link to="/updateavail">
              <button>Update Availability</button>
            </Link>
          </div>
        </div>

        <div ref={infoRef} className="profile-info">
          {renderContent()}
        </div>
        <div ref={postsRef} className="profile-page-posts hide-content">
          {renderPosts()}
        </div>
        <div ref={commentsRef} className="profile-page-comment hide-content">
          {renderComments()}
        </div>
      </div>
      {/* <div ref={calendarRef} className="calendar-container ">
        <div className="calendar-availability">
          <UpdateAvailability />
        </div>
      </div> */}
      {/* <div ref={calendarRef} className="calendar-container hide-content">
        <div className="calendar-availability">
          <UpdateAvailability />
        </div>
      </div> */}
    </div>
  );
}
