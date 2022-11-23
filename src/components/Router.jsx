import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import Dashboard from "./Content/Dashboard";
import Products from "./Content/Products";
import Users from "./Content/Users";
import Layout from "./Layout";
import Login from "./Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="main" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="products" element={<Products />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
