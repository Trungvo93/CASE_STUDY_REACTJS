import React, { useState, useEffect } from "react";
import "./Layout.css";
import Menu from "./leftBar/Menu";
import TopInfo from "./leftBar/TopInfo";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAction } from "./redux/actions";

import axios from "axios";
const Layout = () => {
  const [loading, setLoading] = useState(false);
  const loginedUser = useSelector((state) => state.loginedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(getAction("FECTH_LOGIN_SUCCESS", []));
    navigate("/");
  };
  useEffect(() => {
    axios
      .get("https://637edb84cfdbfd9a63b87c1c.mockapi.io/users")
      .then((res) => {
        dispatch(getAction("FECTH_USER_SUCCESS", res.data));
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/avatars`)
      .then((res) => {
        dispatch(getAction("FECTH_AVATAR_SUCCESS", res.data));
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
      .then((res) => {
        dispatch(getAction("FECTH_BOOKS_SUCCESS", res.data));
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn`)
      .then((res) => {
        const newList = [...res.data];
        res.data.map((item, index) => {
          const currentDate = new Date();
          if (Date.parse(currentDate.toString()) > Date.parse(item.dayReturn)) {
            newList[index].status = "Expires";
            axios
              .put(
                `https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn/${item.id}`,
                { ...item, status: "Expires" }
              )
              .catch((err1) => {
                console.log("Error check expires: ", err1);
              });
          }
        });
        dispatch(getAction("FECTH_BORROWANDRETURN_SUCCESS", newList));
      })
      .catch((err) => console.log(err));
  }, []);
  if (loginedUser.length > 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-3 d-flex flex-column gap-3 border-dotted leftMenu">
            <TopInfo></TopInfo>
            <hr />
            <Menu></Menu>
          </div>
          <div className="col-10 p-0 bg-content">
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

            <div className="container mt-5 ">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!loading) {
    return (
      <div className="container loaderPage">
        <div className="loader"></div>
      </div>
    );
  }
};

export default Layout;
