import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state: any) => state.entities.auth.token);

  useEffect(() => {
    console.log("App State", token);
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
