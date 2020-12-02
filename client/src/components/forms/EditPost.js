import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import PostModel from "../../models/post";

export default function EditPost({
  setPost,
  editedPost,
  setEditedPost,
  post,
  userState,
  setUserState,
  editPostRef,
  editPostBtnRef,
}) {
  // const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [newContent, setNewContent] = useState();

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    setNewContent(post.content);
    setTitle(post.title);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedPost = {
      title,
      newContent,
      author: userState._id,
    };
    console.log(editedPost);
    console.log(post);
    // create post in dbf
    PostModel.update(post._id, editedPost).then((data) => {
      console.log("post mode create: ", data);
      setEditedPost(data.post);
      editPostRef.current.classList.add("hide-content");
      // history.push(`/post/${data.post._id}`);
    });
    editPostBtnRef.current.innerText = "edit";
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setNewContent(e.target.value);
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
        <textarea
          onChange={handleContentChange}
          name="content"
          id="content"
          value={newContent}
        ></textarea>
      </div>
      <input type="submit" value="edit post" />
    </form>
  );
}
