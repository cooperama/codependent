const url = "http://localhost:4000/api/v1/codegories";

class CodegoryModel {
  static all() {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CodegoryModel.all: ", err);
        return { codegories: [] };
      });
  }

  static getCodegory(id) {
    return fetch(`${url}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CodegoryModel.getCodegory: ", err);
        return { codegory: {} };
      });
  }

  static create(newCodegory) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCodegory),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CodegoryModel.create: ", err);
        return { codegory: {} };
      });
  }
  // but will this erase all the other info? or just the info specified?
  static update(id, updatedCodegory) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCodegory),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CodegoryModel.update", err);
        return { codegory: {} };
      });
  }
  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in CodegoryModel.delete", err);
        return { codegory: {} };
      });
  }
}

export default CodegoryModel;
