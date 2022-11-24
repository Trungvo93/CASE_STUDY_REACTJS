import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import Dashboard from "./Content/Dashboard";
import Products from "./Content/Products";
import Users from "./Content/Users";
import Layout from "./Layout";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "./redux/store";
const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="home" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="products" element={<Products />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
