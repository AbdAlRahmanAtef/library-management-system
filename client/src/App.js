import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/AddBook";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Customer from "./pages/Customer";
import Header from "./components/Header";
import AddCustomer from "./pages/AddCustomer";

function App() {
  return (
    <div className="flex justify-center px-[60px]">
      <div className="container pb-10 pt-8">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/add-customer" element={<AddCustomer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
