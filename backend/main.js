import express, { query } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nadaswedan", // Make sure this is correct
  database: "librarymanagementsystem",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if the DB connection fails
  } else {
    console.log("Connected to the database.");
  }
});

app.use(express.json());

// Get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err)
      return res.status(500).json({ error: "Database error", details: err });

    return res.json(data);
  });
});

// get book by id
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM books WHERE book_id = ?";

  db.query(q, [id], (err, data) => {
    if (err)
      return res.status(500).json({ error: "Database error", details: err });

    return res.json(data);
  });
});

// Add a new book
app.post("/books", (req, res) => {
  const { title, author, genre, isbn, copies_available, total_copies } =
    req.body;

  if (!title || !author || !isbn || !copies_available || !total_copies) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const q =
    "INSERT INTO books (`title`, `author`, `genre`, `isbn`, `copies_available`, `total_copies`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, author, genre, isbn, copies_available, total_copies];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    return res.status(201).json({
      message: "Book has been created",
      data: { id: data.insertId, title, author },
    });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE book_id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("success");
  });
});

app.patch("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre, isbn, copies_available, total_copies, cover } =
    req.body;

  if (!title || !author || !isbn || !copies_available || !total_copies) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const q =
    "UPDATE books SET title = ?, author = ?, genre = ?, isbn = ?, copies_available = ?, total_copies = ?, cover = ? WHERE book_id = ?";
  const values = [
    title,
    author,
    genre,
    isbn,
    copies_available,
    total_copies,
    cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    return res.status(200).json({ message: "Book updated successfully", data });
  });
});

// get customers
app.get("/members", (req, res) => {
  const q = "SELECT * FROM member_info";

  db.query(q, (err, data) => {
    if (err)
      return res.status(500).json({ error: "Database error", details: err });

    return res.json(data);
  });
});

// add members
app.post("/members", (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  const q =
    "INSERT INTO members (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)";

  const values = [firstname, lastname, email, phone];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    return res.status(201).json({
      message: "Book has been created",
    });
  });
});

// delete members
app.delete("/members/:id", (req, res) => {
  const memberId = req.params.id;

  const deleteFinesQuery = "DELETE FROM fines WHERE member_id = ?";
  const deleteBorrowingRecordsQuery =
    "DELETE FROM borrowing_records WHERE member_id = ?";
  const deleteMemberQuery = "DELETE FROM members WHERE member_id = ?";

  db.query(deleteBorrowingRecordsQuery, [memberId], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error deleting borrowing records", details: err });

    db.query(deleteMemberQuery, [memberId], (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error deleting member", details: err });

      return res.status(200).json({ message: "Member deleted successfully" });
    });
  });
});

// Start the server
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
