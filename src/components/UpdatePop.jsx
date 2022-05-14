import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBlog = (props) => {
  const { setupdatepopup, updatepopup } = props;
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [category, setCategory] = useState(props.category);
  const [IsPending, setIsPending] = useState(false);
  const prams = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const Blog = { title, body, category, likes: 5 };

    setIsPending(true);
    fetch(`http://localhost:8000/blogs/${prams.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Blog),
    })
      .then(() => {
        setIsPending(false);
        setupdatepopup(!updatepopup);
      })
      .catch(() => {
        setIsPending(false);
        alert("Error in updating the Blog");
        setupdatepopup(!updatepopup);
      });
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label>Blog body:</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          required
        ></textarea>
        <label> Blog category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Technology">Technology</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <div className="btns">
          {!IsPending && <button className="btn">Update Blog</button>}
          {IsPending && (
            <button className="btn" disabled>
              Updating Blog
            </button>
          )}
          <button
            onClick={() => {
              setupdatepopup(!updatepopup);
            }}
            className="btn-cancel btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
