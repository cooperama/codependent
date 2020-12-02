import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import CommentModel from "../../models/comment";

export default function EditComment({
  parentPost,
  userState,
  setUserState,
  editedComment,
  setComment,
  comment,
  editCommentRef,
}) {
  const [newContent, setNewContent] = useState();

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    // const codegoryId = params.id;
    // console.log("codegory id", codegoryId);
    // how to get user???
    console.log(comment);
    console.log(parentPost);
    console.log(userState);
    setNewContent(comment.content);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedComment = {
      content: newContent,
      parentPost: parentPost._id,
      author: userState._id,
    };
    // update Comment in db
    CommentModel.update(comment._id, editedComment).then((data) => {
      console.log("Comment model updated: ", data);
      // when data comes back:
      CommentModel.getComment(data.comment._id).then((data) => {
        setComment(data.comment);
      });
      // setting new comment state (PostPage)
      // setNewComment(data.comment);
    });
    editCommentRef.current.classList.add("hide-content");
    // e.target.value = "";
  };
  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };
  const handleCancel = (e) => {
    editCommentRef.current.classList.add("hide-content");
  };
  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="edit-comment-form">
        <textarea
          className="edit-textarea"
          onChange={handleContentChange}
          name="content"
          id="content"
          value={newContent}
        ></textarea>
        <div className="buttons-container">
          <input type="submit" value="edit" />
          <input onClick={handleCancel} type="button" value="cancel" />
        </div>
      </form>
    );
  };
  return <>{comment && renderForm()}</>;
}
