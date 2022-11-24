import React, { useState, useEffect } from "react";
import "./Layout.css";
import Menu from "./leftBar/Menu";
import TopInfo from "./leftBar/TopInfo";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAction, fecthLoginedUser } from "./redux/actions";

import axios from "axios";
const Layout = () => {
  const [checkLoginedUser, setCheckLoginedUser] = useState([]);
  const loginedUser = useSelector((state) => state.loginedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLogin = () => {
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/loginedUser`)
      .then((res) => {
        setCheckLoginedUser([...res.data]);
        dispatch(getAction("FECTH_LOGIN_SUCCESS", res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(checkLoginedUser);
  console.log(loginedUser);
  if (checkLoginedUser.length > 0 || loginedUser.length > 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-3 d-flex flex-column gap-3 border-dotted leftMenu">
            <TopInfo></TopInfo>
            <hr />
            <Menu></Menu>
          </div>
          <div className="col-10">
            <div className="sticky-top stickyTop d-flex justify-content-between align-items-center px-5 py-4">
              <div className="d-flex align-items-center gap-3">
                <label htmlFor="search">
                  <i className="bi bi-search  search"></i>
                </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ava-1.jpg`}
                  alt=""
                  className="logo rounded-circle"
                />
              </div>
            </div>
            <div className="content">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5 text-center">
        <h3
          className="my-5 fw-bold text-primary cursorHover"
          onClick={goToLogin}>
          Please Login First!
        </h3>
        <button className="btn btn-primary" onClick={goToLogin}>
          Go to login
        </button>
      </div>
    );
  }
};

export default Layout;
