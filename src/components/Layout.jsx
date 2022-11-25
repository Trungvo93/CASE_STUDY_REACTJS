import React, { useState, useEffect } from "react";
import "./Layout.css";
import Menu from "./leftBar/Menu";
import TopInfo from "./leftBar/TopInfo";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAction, logOut } from "./redux/actions";

import axios from "axios";
const Layout = () => {
  const [checkLoginedUser, setCheckLoginedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const loginedUser = useSelector((state) => state.loginedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/loginedUser`)
      .then((res) => {
        setCheckLoginedUser([...res.data]);
        dispatch(getAction("FECTH_LOGIN_SUCCESS", res.data));
        setTimeout(() => {
          setLoading(true);
        }, 1200);
      })
      .catch((err) => console.log(err));

    axios
      .get("https://637edb84cfdbfd9a63b87c1c.mockapi.io/users")
      .then((res) => {
        dispatch(getAction("FECTH_USER_SUCCESS", res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  if (checkLoginedUser.length > 0 || loginedUser.length > 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-3 d-flex flex-column gap-3 border-dotted leftMenu">
            <TopInfo></TopInfo>
            <hr />
            <Menu></Menu>
          </div>
          <div className="col-10 p-0">
            <div className="sticky-top stickyTop d-flex justify-content-between align-items-center px-5  shadow-sm">
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo_library.png`}
                  alt=""
                  className="logoLibrary"
                />
              </div>
              <div className="logo">
                <div className="logoRound">
                  <img
                    // src={`${process.env.PUBLIC_URL}/images/ava-1.jpg`}
                    src={loginedUser.length > 0 ? loginedUser[0].avatar : ""}
                    alt=""
                    className="logoAva rounded-circle"
                  />
                </div>

                <div
                  className="gap-2 fw-bold logoPopup align-items-center rounded-3 "
                  onClick={handleLogout}>
                  <i className="bi bi-box-arrow-left"></i>
                  <p className="m-0">Logout</p>
                </div>
              </div>
            </div>
            <div className="content px-5 pt-4">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (loading) {
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
  } else {
    return (
      <div className="container loaderPage">
        <div className="loader"></div>
      </div>
    );
  }
};

export default Layout;
