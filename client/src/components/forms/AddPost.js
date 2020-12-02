import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddPost({ codegoryId }) {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const params = useParams();

  useEffect(() => {
    // const codegoryId = params.id;
    console.log("codegory id", codegoryId);
    // how to get user???
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // create post in db
  };
  const handleTitleChange = (e) => {
    setTitle({ title: e.target.value });
  };
  const handleContentChange = (e) => {
    setContent({ content: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit} className="add-post-form">
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
      <input type="submit" value="create post" />
    </form>
  );
}
