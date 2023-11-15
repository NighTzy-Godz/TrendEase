import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProtectedRoutes from "./components/containers/ProtectedRoutes";
import "react-toastify/ReactToastify.css";

import { setDecodedUser } from "./store/slices/auth";
import { State } from "./store/store";

import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import ChangePassword from "./pages/auth/ChangePassword";

import Products from "./pages/Product/Products";
import ProductCreate from "./pages/Product/ProductCreate";
import SingleProduct from "./pages/Product/SingleProduct";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Profile from "./pages/Profile/Profile";
import MyProducts from "./pages/Profile/MyProducts";
import MyOrders from "./pages/Profile/MyOrders";
import CustomerOrders from "./pages/Profile/CustomerOrders";
import MyReviews from "./pages/Profile/MyReviews";
import AddAddress from "./pages/AddAddress";
import EditProfile from "./pages/Profile/EditProfile";
import EditProduct from "./pages/Product/EditProduct";
import NoPage from "./components/common/NoPage";

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
          <Route
            path="/change-pass"
            element={
              <ProtectedRoutes token={token}>
                <ChangePassword />
              </ProtectedRoutes>
            }
          />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route
            path="/create-product"
            element={
              <ProtectedRoutes token={token}>
                <ProductCreate />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/edit-product/:productId"
            element={
              <ProtectedRoutes token={token}>
                <EditProduct />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoutes token={token}>
                <Cart />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoutes token={token}>
                <Checkout />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoutes token={token}>
                <Profile />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/add-address"
            element={
              <ProtectedRoutes token={token}>
                <AddAddress />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoutes token={token}>
                <EditProfile />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/my-products"
            element={
              <ProtectedRoutes token={token}>
                <MyProducts />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoutes token={token}>
                <MyOrders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-customer-orders"
            element={
              <ProtectedRoutes token={token}>
                <CustomerOrders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-reviews"
            element={
              <ProtectedRoutes token={token}>
                <MyReviews />
              </ProtectedRoutes>
            }
          />

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
