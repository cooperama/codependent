const url = "http://localhost:4000/api/v1/comment";

class CommentModel {
  static all() {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CommentModel.all: ", err);
        return { comments: [] };
      });
  }

  static getComment(id) {
    return fetch(`${url}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CommentModel.Comment: ", err);
        return { comment: {} };
      });
  }

  static create(Comment) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Comment),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CommentModel.create: ", err);
        return { comment: {} };
      });
  }

  static update(id, Comment) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Comment),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CommentModel.update", err);
        return { comment: {} };
      });
  }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CommentModel.delete", err);
        return { comment: {} };
      });
  }
}

export default CommentModel;
