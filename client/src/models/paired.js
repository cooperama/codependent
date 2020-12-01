const url = "http://localhost:4000/api/v1/paired";

class PairedModel {
  static sendRequest(email) {
    return fetch(`${url}/sendrequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PairedModel.sendRequest: ", err);
        return { Paired: {} };
      });
  }

  static all() {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PairedModel.all: ", err);
        return { Paired: [] };
      });
  }

  static getPaired(id) {
    return fetch(`${url}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PairedModel.get: ", err);
        return { Paired: {} };
      });
  }

  static create(newPaired) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPaired),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PairedModel.create: ", err);
        return { Paired: {} };
      });
  }
  // but will this erase all the other info? or just the info specified?
  static update(id, updatedPaired) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPaired),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PairedModel.update", err);
        return { Paired: {} };
      });
  }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error fetching data in PairedModel.delete", err);
        return { Paired: {} };
      });
  }
}

export default PairedModel;
