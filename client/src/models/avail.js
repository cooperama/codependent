const url = "http://localhost:4000/api/v1/avail";

class AvailModel {
  static all() {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in AvailModel.all: ", err);
        return { avail: [] };
      });
  }

  static getAvail(id) {
    return fetch(`${url}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in AvailModel.get: ", err);
        return { avail: {} };
      });
  }

  static create(newAvail) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAvail),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in AvailModel.create: ", err);
        return { avail: {} };
      });
  }
  // but will this erase all the other info? or just the info specified?
  static update(id, updatedAvail) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAvail),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in AvailModel.update", err);
        return { avail: {} };
      });
  }
  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in AvailModel.delete", err);
        return { avail: {} };
      });
  }
}

export default AvailModel;
