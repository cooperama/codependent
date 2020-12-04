import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Loading, AddComment, Comment, EditPost } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import PostModel from "../models/post";
import UserModel from "../models/user";

export default function PostPage({ userState, setUserState }) {
  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState();
  const [editedPost, setEditedPost] = useState();
  const editPostRef = useRef();
  const deletePostBtnRef = useRef();
  const editPostBtnRef = useRef();
  const deletePostRef = useRef();
  const addCommentRef = useRef();
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    //
    if (localStorage.getItem("uid")) {
      console.log(localStorage);
      UserModel.getUser().then((data) => {
        console.log(data);
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
        }
      });
    }
    console.log("params? ", params);
    let postId;
    if (editedPost) {
      postId = editedPost._id;
    } else {
      postId = params.id;
    }

    console.log(params);
    console.log(editedPost);
    PostModel.getPost(postId).then((data) => {
      console.log("data from post model: ", data);
      setPost(data.post);
    });
    // Re-render page whenever there are new comments or edited posts
  }, [newComment, editedPost]);
  const addCommentClick = () => {
    //
    addCommentRef.current.classList.toggle("hide-content");
  };
  const editPostClick = () => {
    editPostRef.current.classList.toggle("hide-content");
    editPostBtnRef.current.innerText === "edit"
      ? (editPostBtnRef.current.innerText = "cancel")
      : (editPostBtnRef.current.innerText = "edit");
  };
  const deletePostClick = () => {
    deletePostRef.current.classList.toggle("hide-content");
    deletePostBtnRef.current.innerText === "delete"
      ? (deletePostBtnRef.current.innerText = "cancel")
      : (deletePostBtnRef.current.innerText = "delete");
  };
  const renderAddCommentForm = () => {
    if (userState) {
      return (
        <AddComment
          userState={userState}
          setUserState={setUserState}
          post={post}
          addCommentRef={addCommentRef}
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
    if (userState) {
      return (
        <EditPost
          userState={userState}
          setUserState={setUserState}
          post={post}
          setPost={setPost}
          editPostRef={editPostRef}
          editPostBtnRef={editPostBtnRef}
          editedPost={editedPost}
          setEditedPost={setEditedPost}
        />
      );
    } else {
      console.log("log in to add post or Post or whatever");
      // history.push("/register");
    }
  };
  const renderDeletePostForm = () => {
    if (userState) {
      return (
        <>
          <button className="delete-button-confirm" onClick={handleDelete}>
            confirm delete
          </button>
        </>
      );
    } else {
      console.log("log in to add post or comment or whatever");
      // history.push("/register");
    }
  };

  const handleDelete = () => {
    PostModel.delete(post._id).then((data) => {
      console.log("deleted: ", data);
      deletePostRef.current.classList.add("hide-content");
      history.push(`/codegories`);
    });
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
            setPost={setPost}
            setUserState={setUserState}
            parentPost={post}
            commentId={comment._id}
          />
        );
      });
    }
  };
  const linkDiv = () => {
    return (
      <div className="visit-link">
        <a href={post.link}>
          visit link <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
        </a>
      </div>
    );
  };
  const renderPost = () => {
    return (
      <div className="postpage-post-container">
        <div className="postpage-post-heading">
          <h1>{post.title}</h1>
        </div>
        <div className="url-content">
          {post.link && linkDiv()}
          {/* <iframe
            title={post.title}
            src={post.link}
            frameborder="0"
            onLoad={iframeLoaded}
            scrolling="no"
          ></iframe> */}
        </div>
        <div className="postpage-post-content ">
          <p>{post.content}</p>
        </div>

        <div className="postpage-settings">
          <div className="postpage-post-stats">
            <p> {post.codegory.topic} </p>
            <p> [{post.author.username}] </p>
            <p>
              <Moment fromNow ago>
                {post.createdAt}
              </Moment>
            </p>
          </div>
          <div>
            <div className="user-verified">
              <button ref={editPostBtnRef} onClick={editPostClick}>
                edit
              </button>
              <button ref={deletePostBtnRef} onClick={deletePostClick}>
                delete
              </button>
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
          {post.comments && renderComments()}
        </div>
      </div>
    );
  };
  return (
    <div className="page-container">{post ? renderPost() : <Loading />}</div>
  );
}
