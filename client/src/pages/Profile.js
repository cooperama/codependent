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
        console.log(post);
        return (
          <div key={post._id} className="user-post-container">
            {/* <Link to={`/post/${post._id}`}> */}
            <Post post={post} />
            {/* </Link> */}
          </div>
        );
      });
    }
  };
  const renderComments = () => {
    if (userState) {
      return userState.comments.map((comment) => {
        // not sure what kind of data comment is... populated or id????
        // return (
        //   <div key={comment} className="user-comment-container">
        //     {/* comments will link to the parent post */}
        //     <Link to={`/post/${comment.parentPost}`}>
        //       <Comment />
        //     </Link>
        //   </div>
        // );
        return <h3>comment!</h3>;
      });
    }
  };
  const renderContent = () => {
    if (userState) {
      return (
        <div className="profile-content">
          <h1>{userState.username}</h1>
          <p>{userState.email}</p>
          <p>
            joined: <Moment format="MMM DD, YYYY">{userState.createdAt}</Moment>
          </p>
        </div>
      );
    } else {
      history.push("/register");
    }
  };
  return (
    <div className="page-container">
      <p>Profile</p>
      {renderContent()}
      {renderPosts()}
      {renderComments()}
    </div>
  );
}
