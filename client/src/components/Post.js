import React from "react";

export default function Post() {
  return (
    <div className="each-post">
      <div className="post-content post-truncate">
        <h3>Post Title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          vero voluptate soluta vitae quas laboriosam nisi fuga rem autem saepe
          odit a nam, quia, ab quod deserunt eos inventore asperiores ad dolore.
          Reiciendis eos nisi excepturi quas, iure eaque commodi!
        </p>
      </div>
      <div className="post-stats">
        <p>comments: XX</p>
        <p>likes: XX</p>
      </div>
    </div>
  );
}
