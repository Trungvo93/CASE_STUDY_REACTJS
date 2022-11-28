import React, { useState } from "react";
import { getAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./AddUser.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

const AddUser = () => {
  const [show, setShow] = useState(false);
  const avatars = useSelector((state) => state.avatars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    avatar:
      "https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_1.jpg",
    role: "admin",
    username: "",
    password: "",
    studentCode: "",
    schoolCode: "",
  });
  const [checkCode, setCheckCode] = useState("");
  const [rePassword, setRePassword] = useState({
    repassword: "",
    status: false,
    errorPassword: "",
  });
  const formSchema = yup.object().shape({
    name: yup.string().required(),
    role: yup.string().required(),
    username: yup
      .string()
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
        "Username can only contain allowed characters including: uppercase, lowercase, digits, underscore, dash and period. Username must start or end with a letter or number and must contain at least one letter. At least 6 characters"
      )
      .required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Passwords must be at least 8 characters in length, must contain a minimum of 1 case letter, a minimum of 1 numeric character and a minimum of 1 special character"
      )
      .required(),
    studentCode: yup
      .string()
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
        "At least 6 characters, no spaces"
      ),
    schoolCode: yup
      .string()
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{2,29}$/,
        "At least 3 characters, no spaces"
      ),
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCheckCode("");
    if (e.target.name === "password") {
      if (
        rePassword.repassword !== e.target.value &&
        rePassword.repassword === ""
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
    rePassword.repassword = e.target.value;
    setRePassword({ ...rePassword });
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
    const confirmation = window.confirm("Are you sure you want to save");
    if (confirmation) {
      if (rePassword.repassword === form.password) {
        if (
          form.role !== "student" ||
          (form.role === "student" &&
            form.studentCode !== "" &&
            form.schoolCode !== "")
        ) {
          axios
            .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`)
            .then((res) => {
              const found = res.data.findIndex(
                (e) => e.username === form.username
              );
              if (found === -1) {
                setShow(true);
                setTimeout(() => {
                  axios
                    .post(
                      `https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`,
                      form
                    )
                    .then((res1) => {
                      axios
                        .get(
                          `https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`
                        )
                        .then((res2) => {
                          dispatch(getAction("FECTH_USER_SUCCESS", res2.data));
                        })
                        .then((res3) => {
                          navigate("/home/users");
                        })
                        .catch((err3) => console.log(err3));
                    })
                    .catch((err1) => console.log(err1));
                }, 1000);
              } else {
                setRePassword({
                  ...rePassword,
                  errorPassword: "Username has already existed",
                });
              }
            });
        } else {
          setCheckCode("You must enterCode");
        }
      } else {
        setRePassword({
          ...rePassword,
          errorPassword: "Password not correctly",
          status: false,
        });
      }
    }
  };
  return (
    <div className="container">
      {/* Show popup add success */}
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        className="toast-popup bg-success text-white">
        <Toast.Header className="bg-success text-white">
          <i className="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Success</strong>
        </Toast.Header>
        <Toast.Body>User has been create success!</Toast.Body>
      </Toast>
      <h3 className="mb-4">Add User</h3>

      {/* Create user */}
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
                value="student"
                type="radio"
                onChange={(e) => handleChange(e)}></Field>
              <span>Student</span>
            </label>
          </div>

          {form.role === "student" ? (
            <>
              <Field
                className="form-control mt-3"
                placeholder="Student Code"
                name="studentCode"
                onChange={(e) => handleChange(e)}></Field>
              <ErrorMessage
                component="div"
                name="studentCode"
                className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
              <div className="text-capitalize fw-bold text-danger my-3">
                {checkCode}
              </div>
              <Field
                className="form-control "
                placeholder="School Code"
                name="schoolCode"
                onChange={(e) => handleChange(e)}></Field>
              <ErrorMessage
                component="div"
                name="schoolCode"
                className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
              <div className="text-capitalize fw-bold text-danger mt-3">
                {checkCode}
              </div>
            </>
          ) : (
            ""
          )}
          {/* Choose Avatar */}
          <div role="group" aria-labelledby="my-radio-group">
            <h5 className="mt-3">Choose Avatar</h5>
            {avatars.length > 0
              ? avatars.map((e, index) => (
                  <label className="pe-4 role" key={index}>
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
          <button type="submit" className="btn btn-success px-5 me-5">
            Create
          </button>

          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => {
              navigate("/home/users");
            }}>
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;
