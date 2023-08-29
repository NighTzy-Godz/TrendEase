import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";
import Products from "./pages/Product/Products";
import ProductCreate from "./pages/Product/ProductCreate";

function App() {
  const token1 = useSelector((state: any) => state.entities.auth.token);
  const token2 = localStorage.getItem("token");
  const token = token1 || token2;

  useEffect(() => {
    if (!token) return;

    localStorage.setItem("token", token);
  }, [token]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout token={token} />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<ProductCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
