import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies_available: null,
    total_copies: null,
    cover: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:8800/books/${bookId}`,
        book
      );

      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchBookToUpdate = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        setBook(...res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookToUpdate();
  }, [bookId]);

  console.log(book);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[36px] font-bold mb-10 text-[#233973]">
        Add New Book
      </h1>
      <div className="flex flex-col gap-4 max-w-xl sm:w-full">
        <input
          name="title"
          value={book.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          name="genre"
          value={book.genre}
          placeholder="Genre"
          onChange={handleChange}
        />
        <input
          name="isbn"
          value={book.isbn}
          placeholder="ISBN"
          onChange={handleChange}
          required
        />
        <input
          name="copies_available"
          placeholder="Copies Available"
          value={book.copies_available}
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="total_copies"
          type="number"
          placeholder="Total Copies"
          value={book.total_copies}
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
          Update
        </button>
        {error && "Something went wrong!"}
        <Link to="/" className="primary-btn">
          See all books
        </Link>
      </div>
    </div>
  );
};

export default Update;
