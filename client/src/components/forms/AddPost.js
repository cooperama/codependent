import React from "react";

export default function AddPost() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // create post in db
  };
  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input type="text" name="title" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="content">content</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
      </div>
    </form>
  );
}
