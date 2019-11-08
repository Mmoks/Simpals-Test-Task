import React from "react";

const Tags = ({ tags, articleId }) => {
  return (
    <div className="tags">
      {tags.map(tag => (
        <button className="btn btn-xs btn-default" key={tag + articleId}>
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
