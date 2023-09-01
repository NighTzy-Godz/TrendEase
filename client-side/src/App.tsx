import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import Products from "./pages/Product/Products";
import ProductCreate from "./pages/Product/ProductCreate";
import SingleProduct from "./pages/Product/SingleProduct";

import { getUserData } from "./store/slices/auth";

function App() {
  const token1 = useSelector((state: any) => state.entities.auth.token);
  const token2 = localStorage.getItem("token");
  const token = token1 || token2;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(getUserData());

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
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/create-product" element={<ProductCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
