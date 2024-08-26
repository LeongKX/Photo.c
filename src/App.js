import { Routes, Route } from "react-router-dom";
import TopNav from "./components/Navbar";
import Register from "./pages/Register";
import { useState } from "react";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Order from "./pages/Order";
import ProductDetails from "./pages/ProductDetails";
import AllOrder from "./pages/AllOrder";

function App() {
  const [token, setToken] = useState(Cookies.get("authToken") || "");

  return (
    <>
      <TopNav data={{ token, setToken }} />
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allorder" element={<AllOrder />} />
      </Routes>
    </>
  );
}

export default App;
