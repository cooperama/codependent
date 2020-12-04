import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Moment from "react-moment";
import CommentModel from "../models/comment";
import PostModel from "../models/post";
import UserModel from "../models/user";
import { EditComment } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
export default function Comment({
  parentPost,
  userState,
  setPost,
  setUserState,
  profilePage,
  commentId,
}) {
  const [comment, setComment] = useState();
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

  const renderButtons = () => {
    if (profilePage) {
      return (
        <>
          {/* <div className="comment-settings"> */}
          <Link to={`/post/${comment.parentPost._id}`}>
            {/* <div className="view-post-link"> */}
            <p className="view-thread">
              View Thread
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </p>

            {/* </div> */}
          </Link>
          {/* </div> */}
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  const renderComment = () => {
    return (
      <>
        <div className="comment-body">
          <p>{comment.content}</p>
        </div>
        <div className="comment-stats">
          <div className="comment-author-date">
            <p>[{comment.author.username}]</p>
            <p>
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}
              ago
            </p>
          </div>
          {/* <div className="comment-settings">
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
          </div> */}
          {renderButtons()}
        </div>
      </>
    );
  };
  return (
    <div className="each-comment-container">{comment && renderComment()}</div>
  );
}
