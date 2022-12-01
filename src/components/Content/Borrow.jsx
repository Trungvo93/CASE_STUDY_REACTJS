import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getAction } from "../redux/actions";
import axios from "axios";
import * as yup from "yup";
import Toast from "react-bootstrap/Toast";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const Borrow = () => {
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const borrowandreturnList = useSelector((state) => state.borrowandreturn);
  const loginedUser = useSelector((state) => state.loginedUser);
  const books = useSelector((state) => state.books);
  const [listBooks, setListBooks] = useState([...books]);
  const users = useSelector((state) => state.users);
  const [borrowList, setBorrowList] = useState([...borrowandreturnList]);
  const dispatch = useDispatch();
  const students = users.filter((e) => e.role === "student");

  const [bookInfo, setBookInfo] = useState({
    bookID: "",
    ISBN: "",
    amount: "",
    author: "",
    category: "",
    publisher: "",
    title: "",
    update_on: "",
    note: "",
  });
  const [userInfo, setUserInfo] = useState({
    studentID: "",
    name: "",
    studentCode: "",
  });
  const [borrowInfo, setBorrowInfo] = useState({
    bookID: "",
    studentID: "",
    ISBN: "",
    studentCode: "",
    amount: "",
    dayBorrow: "",
    dayReturn: "",
    dayReturned: "",
    note: "",
  });
  const formSchema = yup.object().shape({
    amount: yup
      .number("Amount must be numberic ")
      .min(1, "Amount must be more than zero")
      .max(bookInfo.amount, `Amount must be lower ${bookInfo.amount}`)
      .required(),
    dayReturn: yup.date().required(),
  });
  const date = new Date();
  const minDate =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    date.getDate();

  const handleChange = (e) => {
    setBorrowInfo({ ...borrowInfo, [e.target.name]: e.target.value });
  };

  const [borrowItem, setBorrowItem] = useState({
    bookID: "",
    studentID: "",
    ISBN: "",
    studentCode: "",
    amount: "",
    dayBorrow: "",
    dayReturn: "",
    dayReturned: "",
    note: "",
  });
  //Now use now
  const handleOpenReturn = (e) => {
    setConfirmReturn(true);
    setBorrowItem({ ...e });
  };
  const handleReturn = (e) => {
    setConfirmReturn(false);
    const dayreturned =
      date.getFullYear() +
      "-" +
      Number(date.getMonth() + 1) +
      "-" +
      date.getDate();

    if (e.target.value === "agree") {
      //Update list of borrows when return
      axios
        .put(
          `https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn/${borrowItem.id}`,
          {
            ...borrowItem,
            dayReturned: dayreturned,
            amount: 0,
          }
        )
        .then((res) => {
          axios
            .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn`)
            .then((res2) => {
              dispatch(getAction("FECTH_BORROWANDRETURN_SUCCESS", res2.data));
              setBorrowList([...res2.data]);
            })
            .catch((err2) => console.log(err2));
        })
        .catch((err) => console.log("Error post item: ", err));
      //Update amount to list book
      axios
        .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books/`)
        .then((res) => {
          const index = res.data.findIndex(
            (item) => item.id === borrowItem.bookID
          );
          const newAmount =
            parseInt(borrowItem.amount) + parseInt(res.data[index].amount);

          const newBook = { ...res.data[index], amount: newAmount };
          axios
            .put(
              `https://637edb84cfdbfd9a63b87c1c.mockapi.io/books/${borrowItem.bookID}`,
              newBook
            )
            .then((res2) => {
              axios
                .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
                .then((res3) => {
                  dispatch(getAction("FECTH_BOOKS_SUCCESS", res3.data));
                  setListBooks([...res3.data]);
                  setBookInfo({
                    bookID: "",
                    ISBN: "",
                    amount: "",
                    author: "",
                    category: "",
                    publisher: "",
                    title: "",
                    update_on: "",
                    note: "",
                  });
                  setBorrowInfo({ ...borrowInfo, amount: "", dayReturn: "" });
                  setShowReturn(true);
                })
                .catch((err3) => console.log(err3));
            })
            .catch((err2) => console.log(err2));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClose = (e) => {
    setConfirm(false);
    if (e.target.value === "agree") {
      if (bookInfo.ISBN !== "" && userInfo.studentCode !== "") {
        setShowSubmit(true);
        const dayborrow =
          date.getFullYear() +
          "-" +
          Number(date.getMonth() + 1) +
          "-" +
          date.getDate();
        //Post item to List borrow and update state store
        axios
          .post(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn`, {
            ...borrowInfo,
            dayBorrow: dayborrow,
          })
          .then((res) => {
            axios
              .get(
                `https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn`
              )
              .then((res2) => {
                dispatch(getAction("FECTH_BORROWANDRETURN_SUCCESS", res2.data));
                setBorrowList([...res2.data]);
              })
              .catch((err2) => console.log(err2));
          })
          .catch((err) => console.log("Error post item: ", err));

        //Update amount to list book
        const newAmount = Number(bookInfo.amount - borrowInfo.amount);
        setBookInfo({ ...bookInfo, amount: newAmount });
        axios
          .put(
            `https://637edb84cfdbfd9a63b87c1c.mockapi.io/books/${borrowInfo.bookID}`,
            { ...bookInfo, amount: newAmount }
          )
          .then((res) => {
            axios
              .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
              .then((res2) => {
                dispatch(getAction("FECTH_BOOKS_SUCCESS", res2.data));
                setListBooks([...res2.data]);
                setBookInfo({ ...bookInfo, amount: newAmount });
              })
              .catch((err2) => console.log(err2));
          })
          .catch((err) => console.log("Error put item book: ", err));
      }
    }
  };
  const handleSubmit = () => {
    setConfirm(true);
  };

  return (
    <div className="container mb-5">
      {/* Show popup return success */}
      <Toast
        onClose={() => setShowReturn(false)}
        show={showReturn}
        delay={3000}
        autohide
        className="toast-popup bg-warning text-white">
        <Toast.Header className="bg-warning text-white">
          <i className="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Success</strong>
        </Toast.Header>
        <Toast.Body>User has been return success!</Toast.Body>
      </Toast>
      {/* Show popup add success */}
      <Toast
        onClose={() => setShowSubmit(false)}
        show={showSubmit}
        delay={3000}
        autohide
        className="toast-popup bg-success text-white">
        <Toast.Header className="bg-success text-white">
          <i className="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Success</strong>
        </Toast.Header>
        <Toast.Body>User has been create success!</Toast.Body>
      </Toast>
      <h3 className="my-4 py-2 text-center  text-white fw-bold bg-primary rounded">
        Borrow and Return
      </h3>

      <div className="row mt-5 gap-4 justify-content-center">
        <div className="col-5">
          {/* Choose book */}
          <h4 className="fw-bold mb-4 text-primary">Book Info</h4>
          <Autocomplete
            sx={{ width: "100%" }}
            onChange={(event, value) => {
              const substrings = value.split("ISBN:");
              const index = listBooks.findIndex(
                (e) => e.ISBN === substrings[1]
              );
              if (index >= 0) {
                setBookInfo({ ...books[index] });
                setBorrowInfo({
                  ...borrowInfo,
                  ISBN: listBooks[index].ISBN,
                  bookID: listBooks[index].id,
                });
              }
            }}
            freeSolo
            id="test"
            disableClearable
            options={listBooks.map(
              (option) => option.title + " - ISBN:" + option.ISBN
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search ISBN or Title..."
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <div className="mt-3">
            <p>
              <span className="fw-bold text-primary">ISBN:</span>{" "}
              {bookInfo.ISBN}
            </p>
            <p>
              <span className="fw-bold text-primary">Title:</span>{" "}
              {bookInfo.title}
            </p>
            <p>
              <span className="fw-bold text-primary">Amount:</span>{" "}
              {bookInfo.amount}
            </p>
            <p>
              <span className="fw-bold text-primary">Author:</span>{" "}
              {bookInfo.author}
            </p>
            <p>
              <span className="fw-bold text-primary">Publisher:</span>{" "}
              {bookInfo.publisher}
            </p>
            <p>
              <span className="fw-bold text-primary">Category:</span>{" "}
              {bookInfo.category}
            </p>
          </div>
        </div>
        <div className="col-5">
          {/* Choose student */}
          <h4 className="fw-bold mb-4 text-primary">Student Info</h4>
          <Autocomplete
            sx={{ width: "100%" }}
            onChange={(event, value) => {
              const substrings = value.split("StudentCode:");
              const index = users.findIndex(
                (e) => e.studentCode === substrings[1]
              );
              if (index >= 0) {
                setUserInfo({ ...users[index] });
                setBorrowInfo({
                  ...borrowInfo,
                  studentCode: users[index].studentCode,
                  studentID: users[index].id,
                });
              }
            }}
            freeSolo
            id="userInfo"
            disableClearable
            options={students.map((option) => {
              return option.name + " - StudentCode:" + option.studentCode;
            })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Fullname or Student Code..."
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <div className="mt-3 row gap-3">
            <div className="d-flex align-items-cente gap-2">
              <span className="fw-bold text-primary">StudentCode:</span>
              {userInfo.studentCode}
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-primary">Name:</span>
              {userInfo.name}
            </div>

            <Formik
              initialValues={borrowInfo}
              enableReinitialize={true}
              validationSchema={formSchema}
              onSubmit={handleSubmit}>
              <Form>
                <div className="form-floating mb-3 w-50">
                  <Field
                    min={minDate}
                    type="date"
                    id="dayReturn"
                    className="form-control"
                    placeholder="Day Return"
                    name="dayReturn"
                    value={borrowInfo.dayReturn}
                    onChange={(e) => handleChange(e)}></Field>
                  <label htmlFor="dayReturn" className="text-success">
                    Day return
                  </label>
                </div>
                <ErrorMessage
                  component="div"
                  name="dayReturn"
                  className="text-capitalize fw-bold text-danger my-3"></ErrorMessage>
                <div className="form-floating mb-3 w-25">
                  <Field
                    id="amount"
                    className="form-control "
                    placeholder="Amount"
                    name="amount"
                    value={borrowInfo.amount}
                    onChange={(e) => handleChange(e)}></Field>
                  <label htmlFor="amount" className="text-success">
                    Amount
                  </label>
                </div>
                <ErrorMessage
                  component="div"
                  name="amount"
                  className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
                <br />

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="fw-bold text-center text-primary mt-5">
          List Borrow and Return
        </h3>
        <table className="table table-hover">
          <thead className="bg-secondary text-light">
            <tr>
              <th>Student Code</th>
              <th>ISBN</th>
              <th>Day borrow</th>
              <th>Day return</th>
              <th>Day returned</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowList.map((e) => (
              <tr key={e.id} className="align-middle">
                <td>{e.studentCode}</td>
                <td>{e.ISBN}</td>
                <td>{e.dayBorrow}</td>
                <td>{e.dayReturn}</td>
                <td>{e.dayReturned}</td>
                <td>{e.amount}</td>
                <td>
                  {loginedUser[0].role === ("admin" || "library") &&
                  e.dayReturned === "" ? (
                    <button
                      className="btn btn-warning me-3"
                      onClick={() => handleOpenReturn(e)}>
                      Return
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show dialog confirm when click button Submit */}
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to add?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} value="cancel">
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus value="agree">
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmReturn}
        onClose={handleReturn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to add?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleReturn} value="cancel">
            Disagree
          </Button>
          <Button onClick={handleReturn} autoFocus value="agree">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Borrow;
