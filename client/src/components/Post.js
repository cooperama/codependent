import React, { useState, useEffect } from "react";
import PostModel from "../models/post";

export default function Post({ post }) {
  const [postContent, setPostContent] = useState();
  useEffect(() => {
    //
    console.log(post);
    PostModel.getPost(post._id).then((data) => {
      console.log("post dataaaaaaa: ", data.post);
      setPostContent(data.post);
    });
  }, []);
  const renderPostContent = () => {
    if (postContent) {
      return (
        <div>
          <div className="post-content">
            <h3>{postContent.title}</h3>
            <p>{postContent.author.username}</p>
            <p>{postContent.codegory.topic}</p>
            <p>{postContent.content}</p>
          </div>
          <div className="post-stats">
            <p>comments: {postContent.comments.length}</p>
            <p>tags: {postContent.tags.forEach((tag) => tag)}</p>
          </div>
        </div>
      );
    }
  };
  return <div className="each-post">{renderPostContent()}</div>;
}
