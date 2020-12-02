import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import PostModel from "../models/post";

export default function PostPage({ userState, setUserState }) {
  const [post, setPost] = useState();
  const params = useParams();
  useEffect(() => {
    //
    console.log("params? ", params);
    PostModel.getPost(params.id).then((data) => {
      console.log("data from post model: ", data);
      setPost(data.post);
    });
  }, []);
  const renderPost = () => {
    return (
      <div className="postpage-post-container">
        <h3>{post.title}</h3>
        <p>written by: {post.author.username}</p>
        <p>{post.content}</p>
      </div>
    );
  };
  return (
    <div className="page-container">
      <h1>Post Page</h1>
      {post && renderPost()}
    </div>
  );
}
