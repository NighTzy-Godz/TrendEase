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

import { setDecodedUser } from "./store/slices/auth";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile/Profile";
import jwtDecode from "jwt-decode";
import Checkout from "./pages/Checkout";
import { getUserCart } from "./store/slices/cart";
import MyProducts from "./pages/Profile/MyProducts";
import Logout from "./pages/auth/Logout";
import ChangePassword from "./pages/auth/ChangePassword";
import MyOrders from "./pages/Profile/MyOrders";
import { State } from "./store/store";
import CustomerOrders from "./pages/Profile/CustomerOrders";
import MyReviews from "./pages/Profile/MyReviews";
import AddAddress from "./pages/AddAddress";
function App() {
  const token1 = useSelector((state: State) => state.entities.auth.token);
  const token2 = localStorage.getItem("token");
  const token = token1 || token2;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    try {
      const decodedUser = jwtDecode(token);

      dispatch(setDecodedUser(decodedUser));

      localStorage.setItem("token", token);
    } catch (error) {}
  }, [token]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout token={token} />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-pass" element={<ChangePassword />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/create-product" element={<ProductCreate />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/add-address" element={<AddAddress />} />

          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-customer-orders" element={<CustomerOrders />} />
          <Route path="/my-reviews" element={<MyReviews />} />

          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
