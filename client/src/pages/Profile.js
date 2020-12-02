import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserModel from "../models/user";

export default function Profile({ userState, setUserState }) {
  const [user, setUser] = useState();
  const params = useParams();
  useEffect(() => {
    console.log(params);
    UserModel.getUser(params.id).then((data) => {
      setUserState(data.user);
      // setUser(data.user);
    });
  }, []);
  const renderUserInfo = () => {
    console.log("renmdering info userSTate: ", userState);
    return (
      <div>
        <p>{userState.username}</p>
        <p>{userState.email}</p>
        {/* <p>{user.username}</p>
        <p>{user.email}</p> */}
      </div>
    );
  };
  return (
    <div className="page-container">
      <p>Profile</p>
      {userState && renderUserInfo()}
      {/* {user && renderUserInfo()} */}
    </div>
  );
}
