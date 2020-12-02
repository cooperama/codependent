import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import CodegoryModel from "../models/codegory";
import PostModel from "../models/post";

import { Post, MyListView } from "../components";

export default function Home({ userState, setUserState }) {
  const [recentPosts, setRecentPosts] = useState();
  const [recentForumPosts, setRecentForumPosts] = useState();
  useEffect(() => {
    //get most recent posts
    PostModel.recentPosts().then((data) => {
      console.log(data);
      const codePosts = [];
      const forumPosts = [];
      for (let i = 0; codePosts.length < 5 && i < data.posts.length; i++) {
        if (data.posts[i].codegory.topic !== "Nerd Room") {
          codePosts.push(data.posts[i]);
        }
      }
      for (let i = 0; forumPosts.length < 5 && i < data.posts.length; i++) {
        if (data.posts[i].codegory.topic === "Nerd Room") {
          forumPosts.push(data.posts[i]);
        }
      }
      setRecentForumPosts(forumPosts);
      setRecentPosts(codePosts);
    });
    console.log(userState);
    console.log(recentPosts);
    console.log(recentForumPosts);
  }, []);
  const renderCodePosts = () => {
    return recentPosts.map((post) => {
      return <Post post={post} />;
    });
  };
  const renderForumPosts = () => {
    return recentForumPosts.map((post) => {
      return <Post post={post} />;
    });
  };
  const renderCalendarList = () => {};
  return (
    <div className="page-container">
      <div className="home-container">
        <div className="main-content">
          <p>In the Codegories</p>
          <div className="recent-code-posts">
            {recentPosts && renderCodePosts()}
          </div>
          <p>In the Forum</p>
          <div className="recent-nerd-posts">
            {recentForumPosts && renderForumPosts()}
          </div>
        </div>
        {/* 
        <div className="calendar-list">
          Gonna wanna render calendar list for the week. (MyListView)
        </div> */}
      </div>
    </div>
  );
}
