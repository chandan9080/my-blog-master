import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import UpdateBlog from "./UpdatePop";

const Blogdetails = () => {
  const parms = useParams();
  const history = useHistory();
  const [likes, setLikes] = useState(false);
  const [updatepopup, setupdatepopup] = useState(false);
  const [blog, setBlog] = useState(null);
  const [IsPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsPending(true);
    fetch(`http://localhost:8000/blogs/${parms.id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setBlog(data);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err);
      });
  }, [likes]);

  //handle detelt

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, { method: "DELETE" }).then(
      () => {
        history.push("/");
      }
    );
  };
  const handleUpdate = () => {
    setupdatepopup(!updatepopup);
  };
  const handleLikes = () => {
    if (!likes) {
      fetch(`http://localhost:8000/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: blog.likes + 1,
          title: blog.title,
          body: blog.body,
          category: blog.category,
        }),
      }).then(() => {
        setLikes(!likes);
      });
    } else {
      fetch(`http://localhost:8000/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: blog.likes - 1,
          title: blog.title,
          body: blog.body,
          category: blog.category,
        }),
      }).then(() => {
        setLikes(!likes);
      });
    }
  };
  return (
    <div className="blog-details">
      {IsPending && <div>Loading...</div>}
      {error && <div>Error</div>}
      {blog && updatepopup ? (
        <UpdateBlog
          title={blog?.title}
          category={blog?.category}
          body={blog?.body}
          updatepopup={updatepopup}
          setupdatepopup={setupdatepopup}
        ></UpdateBlog>
      ) : (
        <article>
          <div className="btns">
            <button className="btn" onClick={handleDelete}>
              delete
            </button>
            <button
              className="btn"
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </button>
            <span className="btn" onClick={handleLikes}>
              {likes ? "Liked" : "Like"}:{blog?.likes}
            </span>
          </div>
          <h2>{blog?.title}</h2>
          <p> {blog?.category}</p>
          <div>{blog?.body}</div>
        </article>
      )}
    </div>
  );
};

export default Blogdetails;
