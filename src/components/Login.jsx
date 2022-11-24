import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAction, fecthLoginedUser } from "./redux/actions";
const theme = createTheme();
const Login = () => {
  const users = useSelector((state) => state.users);
  const [checkLoginedUser, setCheckLoginedUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://637edb84cfdbfd9a63b87c1c.mockapi.io/users")
      .then((res) => {
        dispatch(getAction("FECTH_USER_SUCCESS", res.data));
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/loginedUser`)
      .then((res) => {
        dispatch(getAction("FECTH_LOGIN_SUCCESS", res.data));
        setCheckLoginedUser([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    const checkLoginUser = users.filter(
      (e) =>
        e.username === data.get("username") &&
        e.password === data.get("password") &&
        (e.role === "admin" || e.role === "librarian")
    );

    if (checkLoginUser.length > 0) {
      dispatch(fecthLoginedUser(checkLoginUser));
      navigate("/home/dashboard");
    } else {
      document.getElementById("showErrorLogin").innerHTML =
        "Username or password is incorrect!";
    }
  };
  if (checkLoginedUser.length <= 0) {
    return (
      <div className="container-fluid row login">
        <div className="col-3 leftShadow ">
          <div className="loginLeft">
            <h1>Hi, Welcome Back</h1>
            <img
              src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png"
              alt=""
              className="w-100"
            />
          </div>
        </div>
        <div className="col-9">
          <div className="loginRight">
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Avatar sx={{ m: 1, bgcolor: "#ffa733" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      type="text"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                    <p
                      id="showErrorLogin"
                      className="text-danger fw-bold m-0"></p>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: "#ffa733" }}>
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/home/dashboard");
    return <div></div>;
  }
};

export default Login;
