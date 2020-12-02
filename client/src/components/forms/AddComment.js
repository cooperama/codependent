import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import CommentModel from "../../models/comment";

export default function AddComment({
  post,
  userState,
  setUserState,
  newComment,
  setNewComment,
}) {
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
      content,
      parentPost: post._id,
      author: userState._id,
    };
    // create Comment in db
    CommentModel.create(newComment).then((data) => {
      console.log("Comment model create: ", data);
      // setting new comment state (PostPage)
      setNewComment(data.comment);
    });
    e.target.value = "";
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <div className="form-group">
        <textarea
          onChange={handleContentChange}
          name="content"
          id="content"
          placeholder="be nice"
        ></textarea>
      </div>
      <div>
        <input type="submit" value="add comment" />
      </div>
    </form>
  );
}
