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
  const [sameUser, setSameUser] = useState();
  const editCommentRef = useRef();
  const deleteCommentRef = useRef();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    CommentModel.getComment(commentId).then((data) => {
      setComment(data.comment);
      console.log(data);
      if (data.comment) {
        if (data.comment.author) {
          if (data.comment.author._id === userState._id) {
            console.log("they are the same!");
            setSameUser(true);
          } else {
            setSameUser(false);
            console.log("they are not the same!");
          }
        }
      }
    });
    console.log();
  }, []);

  const editCommentClick = (e) => {
    e.target.innerText === "edit"
      ? (e.target.innerText = "cancel")
      : (e.target.innerText = "edit");
    editCommentRef.current.classList.toggle("hide-content");
  };

  const deleteCommentClick = (e) => {
    deleteCommentRef.current.classList.toggle("hide-content");
    if (e.target.innerText === "delete") {
      e.target.innerText = "cancel";
      e.target.style.backgroundColor = "#212637";
    } else {
      e.target.innerText = "delete";
      e.target.style.backgroundColor = "#500";
    }
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

  const renderButtons = () => {
    if (profilePage) {
      return (
        <>
          <Link to={`/post/${comment.parentPost._id}`}>
            <p className="view-thread">
              View Thread
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </p>
          </Link>
        </>
      );
    } else {
      if (sameUser) {
        return (
          <>
            <button className="btn btn-edit" onClick={editCommentClick}>
              edit
            </button>
            <button
              className="btn btn-delete hide-content"
              ref={deleteCommentRef}
              onClick={handleDelete}
            >
              confirm delete
            </button>
            <button className="btn btn-delete" onClick={deleteCommentClick}>
              delete
            </button>
          </>
        );
      }
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
          <div className="settings-buttons">{renderButtons()}</div>
        </div>
        <div ref={editCommentRef} className="postpage-editcomment hide-content">
          {renderEditCommentForm()}
        </div>
      </>
    );
  };

  return (
    <div className="each-comment-container">{comment && renderComment()}</div>
  );
}
