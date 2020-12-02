import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Moment from "react-moment";
import { Post, Comment } from "../components";

import PostModel from "../models/post";

export default function Profile({ userState, setUserState }) {
  const [userPosts, setUserPosts] = useState();
  const history = useHistory();
  useEffect(() => {
    // get posts from userState
  }, []);
  const renderPosts = () => {
    if (userState) {
      return userState.posts.map((post) => {
        return <Post key={post._id} post={post} />;
      });
    }
  };
  const renderComments = () => {
    if (userState) {
      return userState.comments.map((comment) => {
        // not sure what kind of data comment is... populated or id????
        return (
          <Link key={comment._id} to={`/post/${comment.parentPost}`}>
            <Comment />
          </Link>
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
      history.push("/register");
    }
  };
  return (
    <div className="page-container">
      <div className="profile-content">
        <div className="profile-info">{renderContent()}</div>
        <div className="profile-page-posts">{renderPosts()}</div>
        <div className="profile-page-comment">{renderComments()}</div>
      </div>
    </div>
  );
}
