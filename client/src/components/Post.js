import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PostModel from "../models/post";

export default function Post({ nerdRoom, post, userState, setUserState }) {
  const [postContent, setPostContent] = useState();
  useEffect(() => {
    PostModel.getPost(post._id).then((data) => {
      setPostContent(data.post);
    });
  }, []);

  const renderNerdPosts = () => {
    if (postContent.codegory) {
      return (
        <p>
          {postContent.codegory.topic === "Nerd Room"
            ? ""
            : postContent.author.username}
        </p>
      );
    }
  };

  const renderCodePosts = () => {
    if (postContent.codegory) {
      return (
        <p>
          {postContent.codegory.topic === "Nerd Room" ? (
            postContent.author.username
          ) : (
            <Link to={`codegories/${postContent.codegory._id}`}>
              {postContent.codegory.topic}
            </Link>
          )}
        </p>
      );
    }
  };

  const renderPostContent = () => {
    if (postContent) {
      return (
        <>
          <div className="post-content ">
            <h3 className="truncated-title">{postContent.title}</h3>
            {renderNerdPosts()}
            <p className="truncated-content">{postContent.content}</p>
          </div>
          <div className="post-content-second">
            {renderCodePosts()}
            <p>
              <Moment fromNow ago>
                {postContent.createdAt}
              </Moment>
              <span> ago</span>
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
