import React from "react";
import { Link } from "react-router-dom";

export const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      <h2>{blogs.length === 0 ? "No blog found" : "All Blogs"}</h2>

      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>{blog.category}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
