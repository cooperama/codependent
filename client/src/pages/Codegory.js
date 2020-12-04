import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Post, AddPost, Loading } from "../components";
import CodegoryModel from "../models/codegory";
import UserModel from "../models/user";

export default function Codegory({ userState, setUserState }) {
  const [codegory, setCodegory] = useState({});
  // const [nerdRoom, setNerdRoom] = useState(false);
  const addPostRef = useRef();
  const params = useParams();

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
    // const codeId = params.id;
    CodegoryModel.getCodegory(params.id).then((data) => {
      // CodegoryModel.getCodegory(codeId).then((data) => {
      console.log(data);
      setCodegory(data.codegory);
      // if (data.codegory.topic === "Nerd Room") {
      //   setNerdRoom(true);
      // }
    });
  }, []);

  const addPostClick = () => {
    addPostRef.current.classList.toggle("hide-content");
  };

  const renderAddPostForm = () => {
    if (userState) {
      return (
        <AddPost
          userState={userState}
          setUserState={setUserState}
          codegoryId={codegory._id}
        />
      );
    } else {
      console.log("log in to add post or comment or whatever");
      // history.push("/register");
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
        return <Post post={post} key={post._id} />;
      });
    }
  };
  const renderCodegory = () => {
    return (
      <div className="codegorypage-container postpage-post-container">
        <div className="codegorypage-heading postpage-post-heading">
          <h1>{codegory.topic}</h1>
        </div>
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
        <div className="codegorypage-posts-container">
          {codegory.posts && renderPosts()}
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      {codegory ? renderCodegory() : <Loading />}
    </div>
  );
}
