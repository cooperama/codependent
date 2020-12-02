import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import CommentModel from "../models/comment";
import PostModel from "../models/post";
import { EditComment } from "../components";

export default function Comment({
  parentPost,
  userState,
  setPost,
  setUserState,
  commentId,
}) {
  const [comment, setComment] = useState();
  const [editedComment, setEditedComment] = useState();
  const editCommentRef = useRef();
  const deleteCommentRef = useRef();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    CommentModel.getComment(commentId).then((data) => {
      setComment(data.comment);
      console.log(data);
    });
  }, []);

  const editCommentClick = (e) => {
    e.target.innerText === "edit"
      ? (e.target.innerText = "cancel")
      : (e.target.innerText = "edit");
    editCommentRef.current.classList.toggle("hide-content");
  };
  const deleteCommentClick = (e) => {
    e.target.innerText === "delete"
      ? (e.target.innerText = "cancel")
      : (e.target.innerText = "delete");
    deleteCommentRef.current.classList.toggle("hide-content");
  };
  const handleDelete = () => {
    CommentModel.delete(comment._id).then((data) => {
      console.log("deleted: ", data);
      deleteCommentRef.current.classList.add("hide-content");
      PostModel.getPost(data.comment.parentPost).then((data) => {
        setPost(data.post);
      });
      // history.push(`/post/${comment.parentPost._id}`);
    });
  };
  const renderEditCommentForm = () => {
    if (userState) {
      return (
        <EditComment
          userState={userState}
          setUserState={setUserState}
          editCommentRef={editCommentRef}
          parentPost={parentPost}
          comment={comment}
          setComment={setComment}
        />
      );
    } else {
      console.log("log in to add post or comment or whatever");
      // history.push("/register");
    }
  };

  const renderDeleteCommentForm = () => {
    if (userState) {
      return (
        <>
          <button className="delete-button-confirm" onClick={handleDelete}>
            confirm delete
          </button>
        </>
      );
    } else {
      console.log("log in to add post or comment or whatever");
      // history.push("/register");
    }
  };
  const renderComment = () => {
    return (
      <>
        <div className="comment-body">
          <p>{comment.content}</p>
        </div>
        <div className="comment-stats">
          <div>
            <p>[{comment.author.username}]</p>
            <p>
              <Moment fromNow>{comment.createAt}</Moment>
            </p>
            {/* <p>{comment.parentPost.codegory.topic}</p>
          <p>{comment.parentPost.title}</p> */}
          </div>
          <div className="comment-settings">
            <div className="user-verified">
              <button onClick={editCommentClick}>edit</button>
              <button onClick={deleteCommentClick}>delete</button>
            </div>
          </div>
          <div
            ref={editCommentRef}
            className="postpage-editcomment hide-content"
          >
            {renderEditCommentForm()}
          </div>
          <div
            ref={deleteCommentRef}
            className="postpage-deletecomment hide-content"
          >
            {renderDeleteCommentForm()}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="each-comment-container">{comment && renderComment()}</div>
  );
}
