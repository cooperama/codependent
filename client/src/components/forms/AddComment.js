import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import CommentModel from "../../models/comment";

export default function AddComment({ codegoryId, userState, setUserState }) {
  const [comment, setComment] = useState({});
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    // const codegoryId = params.id;
    // console.log("codegory id", codegoryId);
    // how to get user???
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      title,
      content,
      // codegory: codegoryId,
      // author: userState._id,
    };
    // create Comment in db
    CommentModel.create(newComment).then((data) => {
      console.log("Comment model create: ", data);
      // history.push(`/post/${data.post._id}`);
    });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input
          onChange={handleTitleChange}
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">content</label>
        <textarea
          onChange={handleContentChange}
          name="content"
          id="content"
          // cols="30"
          // rows="10"
        ></textarea>
      </div>
      <input type="submit" value="add comment" />
    </form>
  );
}
