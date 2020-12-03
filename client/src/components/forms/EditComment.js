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
    console.log(comment);
    console.log(parentPost);
    console.log(userState);
    setNewContent(comment.content);
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedComment = {
      content: newContent,
      parentPost: parentPost._id,
      author: userState._id,
    };
    CommentModel.update(comment._id, editedComment).then((data) => {
      console.log("Comment model updated: ", data);
      // ????? why am I doing the below?
      CommentModel.getComment(data.comment._id).then((data) => {
        setComment(data.comment);
        editCommentRef.current.classList.add("hide-content");
      });
    });
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
