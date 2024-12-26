import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies_available: null,
    total_copies: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[36px] font-bold mb-10 text-[#233973]">
        Add New Book
      </h1>
      <div className="flex flex-col gap-4 max-w-xl sm:w-full">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
        />
        <input name="genre" placeholder="Genre" onChange={handleChange} />
        <input
          name="isbn"
          placeholder="ISBN"
          onChange={handleChange}
          required
        />
        <input
          name="copies_available"
          placeholder="Copies Available"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="total_copies"
          type="number"
          placeholder="Total Copies"
          onChange={handleChange}
          required
        />
        <input
          name="cover"
          type="text"
          placeholder="Book Cover"
          value={book.cover}
          onChange={handleChange}
        />
        <button onClick={handleClick} className="primary-btn mt-8">
          Add
        </button>
        {error && "Something went wrong!"}
        <Link to="/" className="primary-btn">
          See all books
        </Link>
      </div>
    </div>
  );
};

export default Add;
