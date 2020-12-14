// import { get } from "../../../server/routes/users";

const url = "http://localhost:4000/api/v1/users";

class UserModel {
  static all() {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.all: ", err);
        return { users: [] };
      });
  }

  static getUser() {
    return fetch(`${url}/myprofile`, {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.uid}` },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.get: ", err);
        return { error: err };
      });
  }

  static create(newUser) {
    return fetch(`${url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.create: ", err);
        return { user: {} };
      });
  }

  static login(user) {
    return fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.login: ", err);
        return { user: {} };
      });
  }

  static update(id, updatedUser) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.update", err);
        return { user: {} };
      });
  }

  static logout() {
    return fetch(`${url}/logout`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.logout: ", err);
        return { user: {} };
      });
  }

  static token() {
    return fetch(`${url}/token`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in UserModel.logout: ", err);
        return { user: {} };
      });
  }
}

export default UserModel;
