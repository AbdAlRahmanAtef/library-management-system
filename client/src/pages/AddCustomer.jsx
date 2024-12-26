import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [member, setMember] = useState({
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMember((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/members", member);
      navigate("/customers");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[36px] font-bold mb-10 text-[#233973]">
        Add New Customer
      </h1>
      <div className="flex flex-col gap-4 max-w-xl sm:w-full">
        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input name="email" placeholder="E-mail" onChange={handleChange} />
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <button onClick={handleClick} className="primary-btn mt-8">
          Add
        </button>
        {error && "Something went wrong!"}
        <Link to="/customers" className="primary-btn">
          See all customers
        </Link>
      </div>
    </div>
  );
};

export default AddCustomer;
