import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import Home from "../pages/dashboard/Home";
import AddEmployee from "../pages/dashboard/AddEmployee";
import EditEmployee from "../pages/dashboard/EditEmployee";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/employee/add" element={<AddEmployee />}></Route>
        <Route path="/employee/edit/:id" element={<EditEmployee />}></Route>
      </Routes>
    </div>
  );
};

export default Router;
