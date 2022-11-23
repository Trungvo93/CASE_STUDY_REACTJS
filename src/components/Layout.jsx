import React from "react";
import "./Layout.css";
import Menu from "./leftBar/Menu";
import TopInfo from "./leftBar/TopInfo";
import { Outlet } from "react-router-dom";
const Layout = () => {
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
};

export default Layout;
