import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const customerImage =
  "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-a-shirt-on-gray-background-png-image_4853799.png";
const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currenId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/members");
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/members/${currenId}`);
      window.location.reload();
      console.log("deleted successfully");
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(customers);
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

      <div className="display-grid">
        {customers.map((customer) => (
          <div
            key={customer.member_id}
            className="shadow-md rounded-md overflow-hidden"
          >
            <img className="h-[250px] w-full" src={customerImage} alt="" />
            <div className="flex flex-col p-4 gap-4 text-left text-[#666777]">
              <h2 className="text-lg font-bold">
                Name:{` ${customer.firstname} ${customer.lastname}`}
              </h2>
              <p className="text-lg font-bold">Phone: {customer.phone}</p>
              <p className="text-lg font-bold">E-mail: {customer.email}</p>
              <p className="text-lg font-bold">
                Joined: {customer.date_of_registration.slice(0, 10)}
              </p>
              <p className="text-lg font-bold">
                Borrowings: {customer.number_of_borrowings}
              </p>
              <p className="text-lg font-bold">
                Fines: {customer.total_fines}$
              </p>
              <div className="flex justify-between mt-5 gap-4">
                <button
                  className="flex-1 bg-[#186609] text-lg py-3 rounded-lg text-white"
                  onClick={() => {
                    setShowPopup(true);
                    setCurrentId(customer.member_id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="primary-btn mt-[60px]">
        <Link
          to="/add-customer"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new customer
        </Link>
      </button>
    </div>
  );
};

export default Customer;
