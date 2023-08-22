import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
