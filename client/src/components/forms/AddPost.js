import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddPost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState({ title: "" });
  const [content, setContent] = useState({ content: "" });

  const params = useParams();

  useEffect(() => {
    const codegoryId = params.id;
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
