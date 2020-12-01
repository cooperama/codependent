import React from "react";

export default function Codegories() {
  // query db for CodegoryModel.all, store in state, map over to render
  const renderCodegoryTopics = () => {
    return (
      <div className="codegory-topic">
        <p>Each Topic</p>
      </div>
    );
  };
  return (
    <div className="page-container">
      <p>Codegories</p>
      <p>Show each Codegory topic + posts number maybe</p>
      <p>renderCodegoryTopics</p>
    </div>
  );
}
