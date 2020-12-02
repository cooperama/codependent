import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Loading, AddComment, Comment } from "../components";
import Moment from "react-moment";
import PostModel from "../models/post";

export default function PostPage({ userState, setUserState }) {
  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState();
  const addCommentRef = useRef();
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    //
    console.log("params? ", params);
    PostModel.getPost(params.id).then((data) => {
      console.log("data from post model: ", data);
      setPost(data.post);
    });
  }, []);
  const addCommentClick = () => {
    //
    addCommentRef.current.classList.toggle("hide-content");
  };
  const renderAddCommentForm = () => {
    //
    if (userState) {
      return (
        <AddComment
          userState={userState}
          setUserState={setUserState}
          post={post}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      );
    } else {
      console.log("log in to add post or comment or whatever");
      // history.push("/register");
    }
  };
  const renderComments = () => {
    //
    if (post.comments.length === 0) {
      return (
        <div className="empty-page">
          <p>There seem to be no comments here yet!</p>
          <p>Why not add one?</p>
        </div>
      );
    } else {
      return post.comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            userState={userState}
            setUserState={setUserState}
            parentPost={post}
            commentId={comment._id}
          />
        );
      });
    }
  };
  const renderPost = () => {
    return (
      <div className="postpage-post-container">
        <div className="postpage-post-heading">
          <div className="postpage-post-stats">
            <p> {post.codegory.topic} </p>
            <p> [{post.author.username}] </p>
            <p>
              <Moment fromNow>{post.createdAt}</Moment>
            </p>
          </div>
          <h1>{post.title}</h1>
        </div>
        <div className="postpage-post-content ">
          <p>{post.content}</p>
        </div>

        <div className="postpage-settings">
          <div className="user-verified">
            <button>edit</button>
            <button>delete</button>
          </div>
          <div>
            <button onClick={addCommentClick}>comment</button>
          </div>
        </div>
        <div ref={addCommentRef} className="postpage-addcomment hide-content">
          {renderAddCommentForm()}
        </div>
        <div className="postpage-comments-container">
          {post.comments && renderComments()}
        </div>
      </div>
    );
  };
  return (
    <div className="page-container">{post ? renderPost() : <Loading />}</div>
  );
}
