import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CodegoryModel from "../models/codegory";

import { Post, AddPost } from "../components";

export default function NerdRoom({ userState, setUserState }) {
  const [codegory, setCodegory] = useState();
  const params = useParams();
  const history = useHistory();
  // make api call for Codegory using id from params
  useEffect(() => {
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
          <div className="forum-post" key={post._id}>
            <Post nerdRoom={codegory} post={post} />
          </div>
        );
      });
    }
  };

  const renderContent = () => {
    if (userState) {
      return (
        <>
          {codegory && renderPosts()}
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

  return (
    <div className="page-container">
      <div className="codegorypage-container">
        <div className="codegorypage-heading">
          <h1>Nerd Room</h1>
        </div>
        <div className="codegorypage-posts-container">{renderContent()}</div>
      </div>
    </div>
  );
}
