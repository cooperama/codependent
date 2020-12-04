import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PostModel from "../models/post";

export default function Post({ nerdRoom, post, userState, setUserState }) {
  const [postContent, setPostContent] = useState();
  useEffect(() => {
    console.log(post);
    PostModel.getPost(post._id).then((data) => {
      setPostContent(data.post);
    });
  }, []);

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
            <p>{postContent.codegory.topic}</p>{" "}
            <p>
              <Moment fromNow ago>
                {postContent.createdAt}
              </Moment>
              ago
            </p>
            <>comments: {postContent.comments.length}</>
            <div className="view-post-link">
              <Link to={`/post/${postContent._id}`}>
                {nerdRoom ? "View Thread" : "View Post"}
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
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
