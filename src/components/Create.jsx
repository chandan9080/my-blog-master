import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateNewBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Technology");
  const [IsPending, setIsPending] = useState(false);
  const histroy = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const Blog = { title, body, category, likes: 5 };
    setIsPending(true);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Blog),
    }).then(() => {
      setIsPending(false);
      histroy.push("/");
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
          {!IsPending && <button className="btn">Add Blog</button>}
          {IsPending && (
            <button className="btn" disabled>
              Adding Blog
            </button>
          )}
          <button
            className="btn btn-cancel"
            onClick={() => {
              histroy.push("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewBlog;
