import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CodegoryModel from "../models/codegory";

import { Post, AddPost } from "../components";

export default function Codegory() {
  const [codegory, setCodegory] = useState({});
  const [nerdRoom, setNerdRoom] = useState(false);
  const params = useParams();
  // make api call for Codegory using id from params
  useEffect(() => {
    const codeId = params.id;
    CodegoryModel.getCodegory(codeId).then((data) => {
      console.log(data);
      setCodegory(data.codegory);
      // If this codegory is the Nerd Room, render differently... maybe?
      if (data.codegory.topic === "Nerd Room") {
        setNerdRoom(true);
      }
    });
  }, []);

  const renderContent = () => {
    if (codegory.posts.length === 0) {
      return (
        <div className="empty-page">
          <p>There seem to be no posts here yet!</p>
          <p>Why not make one?</p>
          <AddPost />
        </div>
      );
    } else {
      return codegory.posts.map((post) => {
        return <Post key={post._id} />;
      });
    }
  };

  return (
    <div className="page-container">
      <p>{codegory.topic}</p>
      {codegory.posts && renderContent()}
    </div>
  );
}
