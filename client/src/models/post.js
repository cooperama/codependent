const url = "http://localhost:4000/api/v1/posts";

class PostModel {
  static all() {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PostModel.all: ", err);
        return { post: [] };
      });
  }

  static getPost(id) {
    return fetch(`${url}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PostModel.get: ", err);
        return { post: {} };
      });
  }

  static create(newPost) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PostModel.create: ", err);
        return { post: {} };
      });
  }

  static update(id, updatedPost) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PostModel.update", err);
        return { post: {} };
      });
  }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PostModel.delete", err);
        return { post: {} };
      });
  }
}

export default PostModel;
