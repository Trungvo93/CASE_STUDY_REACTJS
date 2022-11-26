import React, { useState } from "react";
import { getAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./AddUser.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const avatars = useSelector((state) => state.avatars);
  console.log(avatars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    avatar:
      "https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_1.jpg",
    role: "admin",
    username: "",
    password: "",
  });
  const [rePassword, setRePassword] = useState({
    repassword: "",
    status: false,
    errorPassword: "",
  });
  const formSchema = yup.object().shape({
    name: yup.string().required(),
    role: yup.string().required(),
    username: yup.string().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Passwords must be at least 8 characters in length, must contain a minimum of 1 case letter, a minimum of 1 numeric character and a minimum of 1 special character"
      )
      .required(),
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      if (
        rePassword.repassword !== e.target.value &&
        rePassword.repassword !== ""
      ) {
        setRePassword({
          ...rePassword,
          errorPassword: "Password not correctly",
          status: false,
        });
      } else {
        setRePassword({
          ...rePassword,
          errorPassword: "",
          status: true,
        });
      }
    }
  };
  const checkRePassword = (e) => {
    setRePassword({ ...rePassword, repassword: e.target.value });

    if (form.password !== "") {
      if (form.password !== e.target.value) {
        setRePassword({
          ...rePassword,
          errorPassword: "Password not correctly",
          status: false,
        });
      } else {
        setRePassword({
          ...rePassword,
          errorPassword: "",
          status: true,
        });
      }
    }
  };
  const handleSubmit = (e) => {
    axios
      .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`)
      .then((res) => {
        const found = res.data.findIndex((e) => e.username === form.username);
        if (found === -1) {
          axios
            .post(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`, form)
            .then((res1) => {
              axios
                .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`)
                .then((res2) => {
                  dispatch(getAction("FECTH_USER_SUCCESS", res2.data));
                })
                .then((res3) => {
                  navigate("/home/users");
                })
                .catch((err3) => console.log(err3));
            })
            .catch((err1) => console.log(err1));
        } else {
          setRePassword({
            ...rePassword,
            errorPassword: "Username has already existed",
          });
        }
      });
  };
  return (
    <div className="container">
      <h1 className="mb-4">Add User</h1>

      <Formik
        initialValues={form}
        enableReinitialize={true}
        validationSchema={formSchema}
        onSubmit={handleSubmit}>
        <Form className="">
          <Field
            name="name"
            value={form.name}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="Your name"></Field>
          <ErrorMessage
            component="div"
            name="name"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />
          <Field
            className="form-control"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={(e) => handleChange(e)}></Field>
          <ErrorMessage
            component="div"
            name="username"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />

          <Field
            className="form-control"
            placeholder="Password"
            name="password"
            value={form.password}
            type="password"
            onChange={(e) => handleChange(e)}></Field>
          <ErrorMessage
            component="div"
            name="password"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />
          <Field
            className="form-control"
            placeholder="Re-password"
            name="repassword"
            type="password"
            onChange={(e) => checkRePassword(e)}></Field>
          <div className="text-capitalize fw-bold text-danger mt-3">
            {rePassword.errorPassword}
          </div>
          <br />

          {/* Choose role */}
          <div role="group" aria-labelledby="my-radio-group">
            <h5>Choose role</h5>
            <label className="d-flex gap-2 role ">
              <Field
                name="role"
                value="admin"
                type="radio"
                onChange={(e) => handleChange(e)}></Field>
              <span>Admin</span>
            </label>
            <label className="d-flex gap-2 role ">
              <Field
                name="role"
                value="library"
                type="radio"
                onChange={(e) => handleChange(e)}></Field>
              <span>Library</span>
            </label>
            <label className="d-flex gap-2 role ">
              <Field
                name="role"
                value="user"
                type="radio"
                onChange={(e) => handleChange(e)}></Field>
              <span>User</span>
            </label>
          </div>

          {/* Choose Avatar */}
          <div role="group" aria-labelledby="my-radio-group">
            <h5 className="mt-3">Choose Avatar</h5>
            {avatars.length > 0
              ? avatars.map((e, index) => (
                  <label className="pe-4" key={index}>
                    <Field
                      name="avatar"
                      value={e.avatar}
                      type="radio"
                      onChange={(e) => handleChange(e)}></Field>
                    <img
                      src={e.avatar}
                      alt=""
                      className="avatar rounded-circle ms-1"
                    />
                  </label>
                ))
              : ""}
          </div>
          <br />
          <button type="submit" className="btn btn-success px-5">
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;
