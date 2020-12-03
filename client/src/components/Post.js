import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import PostModel from "../models/post";
import UserModel from "../models/user";

export default function Post({ nerdRoom, post, userState, setUserState }) {
  const [postContent, setPostContent] = useState();
  useEffect(() => {
    //
    // if (localStorage.getItem("uid")) {
    //   console.log(localStorage);
    //   UserModel.getUser().then((data) => {
    //     console.log(data);
    //     if (data.user) {
    //       setUserState(data.user);
    //     } else {
    //       console.log("no user in profile useEffect..");
    //     }
    //   });
    // }
    // ^^^^^^^^^^^^^^^^^^^^^^^^
    console.log(post);
    PostModel.getPost(post._id).then((data) => {
      setPostContent(data.post);
    });
  }, []);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Need to render data from Mongo with \n!!!

  const renderPostContent = () => {
    if (postContent) {
      return (
        <>
          <div className="post-content ">
            <h3 className="truncated-title">{postContent.title}</h3>
            <p>by {postContent.author.username}</p>

            <p className="truncated-content">{postContent.content}</p>
          </div>
          <div className="post-content-second">
            <p>{postContent.codegory.topic}</p>
            <p>comments: {postContent.comments.length}</p>
            {/* {postContent.tags.length > 0 && (
              <p>tags: {postContent.tags.forEach((tag) => tag)}</p>
            )} */}

            <div className="view-post-link">
              <Link to={`/post/${postContent._id}`}>
                {nerdRoom ? "View Thread" : "View Post"}
                <span>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </span>
              </Link>
            </div>
          </div>
        </>
      );
    }
  };
  return <div className="each-post">{renderPostContent()}</div>;
}
