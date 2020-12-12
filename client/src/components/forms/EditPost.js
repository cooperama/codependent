import React, { useState, useEffect, useRef } from "react";

import PostModel from "../../models/post";

export default function EditPost({
  setPost,
  // editedPost,
  setEditedPost,
  post,
  userState,
  setUserState,
  editPostRef,
  editPostBtnRef,
}) {
  // const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [newContent, setNewContent] = useState();

  useEffect(() => {
    setNewContent(post.content);
    setLink(post.link);
    setTitle(post.title);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    editPostRef.current.classList.add("hide-content");
    editPostBtnRef.current.innerText = "edit";

    const editedPost = {
      title,
      link,
      content: newContent,
      author: userState._id,
    };
    console.log(editedPost);
    console.log(post);
    // create post in db
    PostModel.update(post._id, editedPost).then((data) => {
      console.log("post model update: ", data);
      PostModel.getPost(data.post._id).then((data) => {
        // setPost(data.post);
        setEditedPost(data.post);
        // history.push(`/post/${data.post._id}`);
      });
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <div className="form-group">
        <input
          onChange={handleTitleChange}
          type="text"
          name="title"
          id="title"
          value={title}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleLinkChange}
          type="url"
          name="link"
          id="link"
          value={link}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleContentChange}
          name="content"
          id="content"
          value={newContent}
        ></textarea>
      </div>
      <input className="btn btn-edit" type="submit" value="edit post" />
    </form>
  );
}
