import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CodegoryModel from "../models/codegory";
import UserModel from "../models/user";

import { Post, AddPost, Loading } from "../components";

export default function NerdRoom({ userState, setUserState }) {
  const [codegory, setCodegory] = useState();
  const addPostRef = useRef();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      UserModel.getUser().then((data) => {
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
          history.push("/register");
        }
      });
    } else {
      history.push("/register");
    }
    CodegoryModel.getNerdRoom().then((data) => {
      setCodegory(data.codegory);
    });
  }, []);

  const addPostClick = (e) => {
    addPostRef.current.classList.toggle("hide-content");
    e.target.innerText === "create post"
      ? (e.target.innerText = "cancel")
      : (e.target.innerText = "create post");
  };

  const renderAddPostForm = () => {
    if (userState) {
      return (
        <>
          <AddPost
            userState={userState}
            setUserState={setUserState}
            codegoryId={codegory._id}
          />
        </>
      );
    } else {
      history.push("/register");
    }
  };

  const renderPosts = () => {
    if (codegory.posts.length === 0) {
      return (
        <div className="empty-page">
          <p>There seem to be no posts here yet!</p>
          <p>Why not make one?</p>
        </div>
      );
    } else {
      return codegory.posts.map((post) => {
        return (
          <Post
            key={post._id}
            nerdRoom={codegory}
            post={post}
            userState={userState}
            setUserState={setUserState}
          />
        );
      });
    }
  };

  const renderContent = () => {
    return (
      <>
        <div className="create-post-container">
          <button className="btn btn-wide" onClick={addPostClick}>
            create post
          </button>
        </div>
        <div ref={addPostRef} className="codegorypage-addpost hide-content">
          {renderAddPostForm()}
        </div>
        <div className="nerdpage-posts-container">{renderPosts()}</div>
      </>
    );
  };

  return (
    <div className="page-container">
      <div className="codegorypage-container">
        <div className="page-heading">
          {/* <div className="codegorypage-heading nerd-room-heading-div page-heading"> */}
          <h1 className="nerd-room-heading">Nerd Room</h1>
        </div>
        {codegory ? renderContent() : <Loading />}
      </div>
    </div>
  );
}
