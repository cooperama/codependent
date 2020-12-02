import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import PostModel from "../../models/post";

export default function AddPost({ codegoryId, userState, setUserState }) {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    // const codegoryId = params.id;
    console.log("codegory id", codegoryId);
    // how to get user???
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      codegory: codegoryId,
      author: userState._id,
    };
    // create post in db
    PostModel.create(newPost).then((data) => {
      console.log("post mode create: ", data);
      history.push(`/post/${data.post._id}`);
    });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <input
        onChange={handleTitleChange}
        type="text"
        name="title"
        id="title"
        placeholder="title"
      />

      <textarea
        onChange={handleContentChange}
        name="content"
        id="content"
        placeholder="text"
      ></textarea>
      <input type="submit" value="add post" />
    </form>
  );
}
