import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
const Borrow = () => {
  const books = useSelector((state) => state.books);
  const users = useSelector((state) => state.users);
  const students = users.filter((e) => e.role === "student");
  const [stateID, setStateID] = useState({
    bookID: "",
    studentID: "",
  });
  const [bookInfo, setBookInfo] = useState({
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
    name: "",
    studentCode: "",
  });
  const [borrowInfo, setBorrowInfo] = useState({
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
  const handleSubmit = () => {
    if (bookInfo.ISBN !== "" && userInfo.studentCode !== "") {
      axios
        .post(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn`)
        .then((res) => {})
        .catch((err) => console.log("Error post item: ", err));
      const newAmount = bookInfo.amount - borrowInfo.amount;
      setBookInfo({ ...bookInfo, amount: newAmount });
      axios
        .put(
          `https://637edb84cfdbfd9a63b87c1c.mockapi.io/books/${stateID.bookID}`,
          bookInfo
        )
        .then((res) => {})
        .catch((err) => console.log("Error put item book: ", err));
    }
  };

  return (
    <div className="container mb-5">
      <h3 className="my-4 py-2 text-center  text-white fw-bold bg-primary rounded">
        Borrow and Return
      </h3>
      <div className="row mt-5 gap-4 justify-content-center">
        <div className="col-5">
          <h4 className="fw-bold mb-4 text-primary">Book Info</h4>
          <Autocomplete
            sx={{ width: "100%" }}
            onChange={(event, value) => {
              const substrings = value.split("ISBN:");
              const index = books.findIndex((e) => e.ISBN === substrings[1]);
              if (index >= 0) {
                setStateID({ ...stateID, bookID: books[index].id });

                setBookInfo({ ...books[index] });
                setBorrowInfo({ ...borrowInfo, ISBN: books[index].ISBN });
              }
            }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={books.map(
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
          <h4 className="fw-bold mb-4 text-primary">User Info</h4>
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
                  studentCode: books[index].studentCode,
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
              <th>Title</th>
              <th>Day borrow</th>
              <th>Day return</th>
              <th>Day returned</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Borrow;
