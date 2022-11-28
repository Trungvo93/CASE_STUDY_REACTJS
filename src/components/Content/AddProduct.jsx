import React, { useState } from "react";
import { getAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./AddUser.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const AddProduct = () => {
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "",
    title: "",
    ISBN: "",
    amount: "",
    status: "new",
    note: "",
  });
  const [checkCode, setCheckCode] = useState("");

  const formSchema = yup.object().shape({
    category: yup.string().required(),
    title: yup.string().required(),
    ISBN: yup.number("ISBN code must be numeric").required(),
    amount: yup
      .number("Amount must be numberic ")
      .min(1, "Amount must be more than zero")
      .required(),
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCheckCode("");
  };

  const handleClickOpen = () => {
    setConfirm(true);
  };
  const handleClose = (e) => {
    setConfirm(false);
    if (e.target.value === "confirm") {
      axios
        .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
        .then((res) => {
          const found = res.data.findIndex(
            (e) => Number(e.ISBN) === Number(form.ISBN)
          );
          if (found === -1) {
            setShow(true);
            setTimeout(() => {
              axios
                .post(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`, form)
                .then((res1) => {
                  axios
                    .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
                    .then((res2) => {
                      dispatch(getAction("FECTH_BOOKS_SUCCESS", res2.data));
                    })
                    .then((res3) => {
                      navigate("/home/products");
                    })
                    .catch((err3) => console.log(err3));
                })
                .catch((err1) => console.log(err1));
            }, 1000);
          } else {
            setCheckCode("ISBN code has existed");
          }
        });
    }
  };
  const handleSubmit = (e) => {
    const confirmation = window.confirm("Are you sure you want to save");
    if (confirmation) {
      axios
        .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
        .then((res) => {
          const found = res.data.findIndex(
            (e) => Number(e.ISBN) === Number(form.ISBN)
          );
          if (found === -1) {
            setShow(true);
            setTimeout(() => {
              axios
                .post(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`, form)
                .then((res1) => {
                  axios
                    .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
                    .then((res2) => {
                      dispatch(getAction("FECTH_BOOKS_SUCCESS", res2.data));
                    })
                    .then((res3) => {
                      navigate("/home/products");
                    })
                    .catch((err3) => console.log(err3));
                })
                .catch((err1) => console.log(err1));
            }, 1000);
          } else {
            setCheckCode("ISBN code has existed");
          }
        });
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
        <Toast.Body>User has been add success!</Toast.Body>
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
            name="category"
            value={form.category}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="Category"></Field>
          <ErrorMessage
            component="div"
            name="category"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />
          <Field
            className="form-control"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={(e) => handleChange(e)}></Field>
          <ErrorMessage
            component="div"
            name="title"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />
          <Field
            className="form-control"
            placeholder="ISBN"
            name="ISBN"
            value={form.ISBN}
            onChange={(e) => handleChange(e)}></Field>
          <ErrorMessage
            component="div"
            name="ISBN"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <div className="text-capitalize fw-bold text-danger mt-3">
            {checkCode}
          </div>
          <Field
            className="form-control mt-4"
            placeholder="Amount"
            name="amount"
            value={form.amount}
            onChange={(e) => handleChange(e)}></Field>
          <ErrorMessage
            component="div"
            name="amount"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />
          {/* Choose role */}
          <div role="group" aria-labelledby="my-radio-group">
            <h5>Choose status</h5>
            <label className="d-flex gap-2 role ">
              <Field
                name="status"
                value="new"
                type="radio"
                onChange={(e) => handleChange(e)}></Field>
              <span>New</span>
            </label>
            <label className="d-flex gap-2 role ">
              <Field
                name="status"
                value="old"
                type="radio"
                onChange={(e) => handleChange(e)}></Field>
              <span>Old</span>
            </label>
          </div>
          <br />
          <Field
            className="form-control"
            placeholder="Note..."
            name="note"
            value={form.note}
            onChange={(e) => handleChange(e)}></Field>
          <br />
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={handleClickOpen}
            className="px-4 me-4">
            Create
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={() => {
              navigate("/home/products");
            }}
            className="px-4 me-5">
            Cancel
          </Button>

          {/* Show dialog confirm when click button Save */}
          <Dialog
            open={confirm}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to save?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose} value="cancel">
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus value="confirm">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProduct;
