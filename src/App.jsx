// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  const { adminUser } = React.useContext(AuthContext);
  return (
    <div>
      <ToastContainer autoClose={800} theme="colored" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {adminUser && <Route path="/admin" element={<Admin />} />}
        {!adminUser && <Route path="/admin" element={<Login />} />}
      </Routes>
    </div>
  );
}

export default App;
