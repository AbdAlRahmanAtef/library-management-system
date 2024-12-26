import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const altCover =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUCIleEWfO4WAJV6zc1GjPi--ODEl78PUxWg&s";
const Books = () => {
  const [books, setBooks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currenId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/books/${currenId}`);
      window.location.reload();
      console.log("deleted successfully");
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-center">
      {showPopup && (
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-50 bottom-0 transition-[.3s]">
          <div className="p-5 flex flex-col justify-between bg-white h-[170px] shadow-md rounded-md min-w-[350px]">
            <p className="text-xl font-bold">Are You Sure? </p>
            <div className="flex justify-between mt-5 gap-6">
              <button
                className="flex-1 bg-[#243b75] text-lg py-3 rounded-lg text-white"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#186609] text-lg py-3 rounded-lg text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="display-grid ">
        {books.map((book) => (
          <div key={book.id} className="shadow-md rounded-md overflow-hidden">
            <img
              className="h-[250px] w-full"
              src={book.cover || altCover}
              alt=""
            />
            <div className="flex flex-col p-4 gap-4 text-left text-[#666777]">
              <h2 className="text-lg font-bold">
                Title:{" "}
                {book.title.length > 15
                  ? `${book.title.slice(0, 15)}...`
                  : book.title}
              </h2>
              <p className="text-sm font-semibold">Author: {book.author}</p>
              <p className="text-sm font-semibold">Genre: {book.genre}</p>
              <p className="text-sm font-semibold">ISBN: {book.isbn}</p>
              <p className="text-sm font-semibold">
                Total Copies: {book.total_copies}
              </p>
              <p className="text-sm font-semibold">
                Available Copies: {book.copies_available}
              </p>
              <div className="flex justify-between mt-5 gap-4">
                <button
                  className="flex-1 bg-[#186609] text-lg py-3 rounded-lg text-white"
                  onClick={() => {
                    setShowPopup(true);
                    setCurrentId(book.book_id);
                  }}
                >
                  Delete
                </button>
                <button className="flex-1 bg-[#243b75] text-lg py-3 rounded-lg text-white">
                  <Link
                    to={`/update/${book.book_id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="primary-btn mt-[60px]">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
