import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserModel from "../models/user";

export default function Profile() {
  const [user, setUser] = useState();
  const params = useParams();
  useEffect(() => {
    console.log(params);
    console.log(params.id);
    UserModel.getUser(params.id).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="page-container">
      <p>Profile</p>
    </div>
  );
}
