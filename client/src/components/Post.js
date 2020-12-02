import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import PostModel from "../models/post";

export default function Post({ post }) {
  const [postContent, setPostContent] = useState();
  useEffect(() => {
    //
    console.log(post);
    PostModel.getPost(post._id).then((data) => {
      console.log("post dataaaaaaa: ", data.post);
      setPostContent(data.post);
    });
  }, []);
  const renderPostContent = () => {
    if (postContent) {
      return (
        <>
          <div className="post-content">
            <h3>{postContent.title}</h3>
            <p>by {postContent.author.username}</p>

            <p>{postContent.content}</p>
          </div>
          <div className="post-content-second">
            <p>{postContent.codegory.topic}</p>
            <p>comments: {postContent.comments.length}</p>
            {/* {postContent.tags.length > 0 && (
              <p>tags: {postContent.tags.forEach((tag) => tag)}</p>
            )} */}

            <div className="view-post-link">
              <Link to={`/post/${postContent._id}`}>
                View Post
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
