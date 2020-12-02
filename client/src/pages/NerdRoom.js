import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CodegoryModel from "../models/codegory";

import { Post, AddPost } from "../components";

export default function NerdRoom({ userState, setUserState }) {
  const [codegory, setCodegory] = useState({});
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
          <div key={post._id}>
            <Post post={post} />
          </div>
        );
      });
    }
  };

  const renderContent = () => {
    if (userState) {
      return (
        <AddPost
          userState={userState}
          setUserState={setUserState}
          codegoryId={codegory._id}
        />
      );
    } else {
      history.push("/register");
    }
  };

  return (
    <div className="page-container">
      <h1>Nerd Room</h1>
      <p>{codegory.topic}</p>
      {codegory.posts && renderPosts()}
      {renderContent()}
    </div>
  );
}
