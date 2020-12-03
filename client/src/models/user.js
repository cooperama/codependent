// const url = "http://localhost:4000/api/v1/users";

// class UserModel {
//   static all() {
//     return fetch(url)
//       .then((res) => res.json())
//       .catch((err) => {
//         console.log("Error fetching data in UserModel.all: ", err);
//         return { users: [] };
//       });
//   }

//   static getUser(id) {
//     return fetch(`${url}/${id}`)
//       .then((res) => res.json())
//       .catch((err) => {
//         console.log("Error fetching data in UserModel.get: ", err);
//         return { user: {} };
//       });
//   }

//   static create(newUser) {
//     return fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     })
//       .then((res) => res.json())
//       .catch((err) => {
//         console.log("Error fetching data in UserModel.create: ", err);
//         return { user: {} };
//       });
//   }
//   // but will this erase all the other info? or just the info specified?
//   static update(id, updatedUser) {
//     return fetch(`${url}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedUser),
//     })
//       .then((res) => res.json())
//       .catch((err) => {
//         console.log("Error fetching data in UserModel.update", err);
//         return { user: {} };
//       });
//   }
// }

// export default UserModel;

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
    return (
      fetch(`${url}/myprofile`)
        // static getUser(id) {
        //   return fetch(`${url}/myprofile/${id}`)
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error fetching data in UserModel.get: ", err);
          return { user: {} };
        })
    );
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
