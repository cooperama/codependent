import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CodegoryModel from "../models/codegory";
import UserModel from "../models/user";

import { Post, AddPost } from "../components";

export default function NerdRoom({ userState, setUserState }) {
  const [codegory, setCodegory] = useState();
  const params = useParams();
  const addPostRef = useRef();
  const history = useHistory();
  // make api call for Codegory using id from params
  useEffect(() => {
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
    const codeId = params.id;
    CodegoryModel.getNerdRoom().then((data) => {
      console.log(data);
      setCodegory(data.codegory);
    });
  }, []);

  const renderPosts = () => {
    if (!codegory.posts) {
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

  const addPostClick = () => {
    addPostRef.current.classList.toggle("hide-content");
  };

  const renderAddPostForm = () => {
    if (userState) {
      return (
        <>
          <AddPost
            userState={userState}
            setUserState={setUserState}
            codegory={codegory}
          />
        </>
      );
    } else {
      history.push("/register");
    }
  };

  const renderContent = () => {
    return (
      <>
        <div className="codegorypage-settings postpage-settings">
          <button onClick={addPostClick}>
            create post
            <span className="font-icon" onClick={addPostClick}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </button>
        </div>
        <div ref={addPostRef} className="codegorypage-addpost hide-content">
          {renderAddPostForm()}
        </div>
        <div className="nerdpage-posts-container">
          {codegory && renderPosts()}
        </div>
      </>
    );
  };

  return (
    <div className="page-container">
      <div className="codegorypage-container">
        <div className="codegorypage-heading nerd-room-heading-div">
          <h1 className="nerd-room-heading">Nerd Room</h1>
        </div>
        {codegory && renderContent()}
      </div>
    </div>
  );
}
