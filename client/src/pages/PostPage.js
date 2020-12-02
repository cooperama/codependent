import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Loading, AddComment, Comment, EditPost } from "../components";
import Moment from "react-moment";
import PostModel from "../models/post";

export default function PostPage({ userState, setUserState }) {
  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState();
  const [postToEdit, setPostToEdit] = useState();
  const [editedPost, setEditedPost] = useState();
  const editPostRef = useRef();
  const deletePostRef = useRef();
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
  const editPostClick = () => {
    //
    editPostRef.current.classList.toggle("hide-content");
  };
  const deletePostClick = () => {
    //
    deletePostRef.current.classList.toggle("hide-content");
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
  const renderEditPostForm = () => {
    //
    if (userState) {
      // need to get Post id...
      return (
        <EditPost
          userState={userState}
          setUserState={setUserState}
          post={post}
          // PostToEdit={PostToEdit}
          // PostToEdit={PostToEdit}
          // editedPost={}
          // editedPost={editedPost}
          setEditedPost={setEditedPost}
        />
      );
    } else {
      console.log("log in to add post or Post or whatever");
      // history.push("/register");
    }
  };
  const renderDeletePostForm = () => {
    //
    if (userState) {
      // return (
      // <AddPost
      //   userState={userState}
      //   setUserState={setUserState}
      //   post={post}
      //   newPost={newPost}
      //   setNewPost={setNewPost}
      // />
      // );
    } else {
      console.log("log in to add post or Post or whatever");
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
          <h1>{post.title}</h1>
        </div>
        <div className="postpage-post-content ">
          <p>{post.content}</p>
        </div>

        <div className="postpage-settings">
          <div className="postpage-post-stats">
            <p> {post.codegory.topic} </p>
            <p> [{post.author.username}] </p>
            <p>
              <Moment fromNow>{post.createdAt}</Moment>
            </p>
          </div>
          <div>
            <div className="user-verified">
              <button onClick={editPostClick}>edit</button>
              <button onClick={deletePostClick}>delete</button>
            </div>
            <div>
              <button onClick={addCommentClick}>comment</button>
            </div>
          </div>
        </div>
        <div ref={addCommentRef} className="postpage-addcomment hide-content">
          {renderAddCommentForm()}
        </div>
        <div ref={editPostRef} className="postpage-editPost hide-content">
          {renderEditPostForm()}
        </div>
        <div ref={deletePostRef} className="postpage-deletePost hide-content">
          {renderDeletePostForm()}
        </div>
        <div className="postpage-comments-container">
          {post.comments.length === 0 ? <p>no comments!</p> : <p>comments:</p>}
          {post.comments && renderComments()}
        </div>
      </div>
    );
  };
  return (
    <div className="page-container">{post ? renderPost() : <Loading />}</div>
  );
}
