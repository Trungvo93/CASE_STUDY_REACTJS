import { useSelect } from "@mui/base";
import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Menu = () => {
  const [type, setType] = React.useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };
  let activeStyle = {
    color: `rgb(33, 43, 54)`,
    backgroundColor: `rgba(145, 158, 171, 0.16)`,
    fontWeight: "bold",
  };
  let noneActiveStyle = {
    color: `rgb(99, 115, 129)`,
  };

  return (
    <>
      <div>
        <NavLink
          to="dashboard"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2"
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-bar-chart"></i>
          <p className="m-0">Dashboard</p>
        </NavLink>

        <NavLink
          to="users"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2"
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-people"></i>
          <p className="m-0">Users</p>
        </NavLink>

        <NavLink
          to="products"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2"
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-journal-text"></i>
          <p className="m-0">Products</p>
        </NavLink>
        <NavLink
          to="borrowreturn"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2"
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-basket"></i>
          <p className="m-0">Borrow/Return</p>
        </NavLink>
      </div>
    </>
  );
};

export default Menu;
