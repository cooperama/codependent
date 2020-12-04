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
  const [link, setLink] = useState();
  const [newContent, setNewContent] = useState();

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    setNewContent(post.content);
    setLink(post.link);
    setTitle(post.title);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedPost = {
      title,
      link,
      newContent,
      author: userState._id,
    };
    console.log(editedPost);
    console.log(post);
    // create post in dbf
    PostModel.update(post._id, editedPost).then((data) => {
      console.log("post mode create: ", data);
      PostModel.getPost(data.post._id).then((data) => {
        setEditedPost(data.post);
        editPostRef.current.classList.add("hide-content");
        // history.push(`/post/${data.post._id}`);
      });
    });
    editPostBtnRef.current.innerText = "edit";
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
      <input type="submit" value="edit post" />
    </form>
  );
}
