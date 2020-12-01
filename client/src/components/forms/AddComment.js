import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddComment() {
  const [comment, setComment] = useState({});
  const [content, setContent] = useState({});

  const params = useParams();

  useEffect(() => {
    const codegoryId = params.id;
    // how to get user???
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // create post in db
  };

  const handleContentChange = (e) => {
    setContent({ content: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
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
      <input type="submit" value="create comment" />
    </form>
  );
}
