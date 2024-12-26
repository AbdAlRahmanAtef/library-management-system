import React from "react";
import logo from "../images/logo.png";
import { a } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-color py-4 px-8 rounded-lg shadow-md flex justify-between items-center mb-[60px]">
      <img src={logo} alt="" />
      <nav className="flex text-lg font-semibold">
        <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
          Home
        </a>
        <a
          href="/customers"
          className="text-white hover:bg-blue-700 px-3 py-2 rounded"
        >
          Customers
        </a>
        <a
          href="/add"
          className="text-white hover:bg-blue-700 px-3 py-2 rounded"
        >
          Add Book
        </a>
        <a
          href="/add-customer"
          className="text-white hover:bg-blue-700 px-3 py-2 rounded"
        >
          Add Customer
        </a>
      </nav>
    </div>
  );
};

export default Header;
