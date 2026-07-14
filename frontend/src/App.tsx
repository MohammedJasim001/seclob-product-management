import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
