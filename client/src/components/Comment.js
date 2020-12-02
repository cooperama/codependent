import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import CommentModel from "../models/comment";
import { EditComment } from "../components";

export default function Comment({
  parentPost,
  userState,
  setUserState,
  commentId,
}) {
  const [comment, setComment] = useState();
  // const [commentToEdit, setCommentToEdit] = useState();
  const [editedComment, setEditedComment] = useState();
  const editCommentRef = useRef();
  const deleteCommentRef = useRef();
  const addCommentRef = useRef();

  useEffect(() => {
    CommentModel.getComment(commentId).then((data) => {
      setComment(data.comment);
      console.log(data);
    });
  }, []);

  const editCommentClick = () => {
    // setComment(comment);
    console.log(comment);
    editCommentRef.current.classList.toggle("hide-content");
  };
  const deleteCommentClick = () => {
    //
    deleteCommentRef.current.classList.toggle("hide-content");
  };

  const renderEditCommentForm = () => {
    //
    if (userState) {
      // need to get comment id...
      return (
        <EditComment
          userState={userState}
          setUserState={setUserState}
          editCommentRef={editCommentRef}
          parentPost={parentPost}
          comment={comment}
          // editedComment={}
          // editedComment={editedComment}
          setComment={setComment}
        />
      );
    } else {
      console.log("log in to add post or comment or whatever");
      // history.push("/register");
    }
  };
  const renderDeleteCommentForm = () => {
    //
    if (userState) {
      // return (
      // <AddComment
      //   userState={userState}
      //   setUserState={setUserState}
      //   post={post}
      //   newComment={newComment}
      //   setNewComment={setNewComment}
      // />
      // );
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
