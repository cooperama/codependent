import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import CommentModel from "../models/comment";

export default function Comment({
  parentPost,
  userState,
  setUserState,
  commentId,
}) {
  const [comment, setComment] = useState();
  const addCommentRef = useRef();
  useEffect(() => {
    // get comments belonging to <parentPost className=""></parentPost>
    CommentModel.getComment(commentId).then((data) => {
      setComment(data.comment);
      console.log(data);
    });
  }, []);
  const renderComment = () => {
    return (
      <>
        <div className="comment-body">
          <p>{comment.content}</p>
        </div>
        <div className="comment-stats">
          <p>[{comment.author.username}]</p>
          <p>{comment.parentPost.codegory.topic}</p>
          <p>{comment.parentPost.title}</p>
          <div className="comment-settings">
            <div className="user-verified">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="each-comment-container">{comment && renderComment()}</div>
  );
}
