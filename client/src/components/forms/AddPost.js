import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import PostModel from "../../models/post";

export default function AddPost({ codegoryId, userState, setUserState }) {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
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
    if (!userState) {
      return;
      // return history.push(`/register`);
    }
    const newPost = {
      title,
      link,
      content,
      codegory: codegoryId, //
      author: userState._id,
    };
    console.log(newPost);
    // create post in db
    PostModel.create(newPost).then((data) => {
      console.log("post model create: ", data);
      history.push(`/post/${data.post._id}`);
    });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
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
      <input
        onChange={handleLinkChange}
        type="url"
        name="link"
        id="link"
        placeholder="https://www....com (optional)"
      />

      <textarea
        onChange={handleContentChange}
        name="content"
        id="content"
        placeholder="be good"
      ></textarea>
      <input className="btn" type="submit" value="add post" />
    </form>
  );
}
