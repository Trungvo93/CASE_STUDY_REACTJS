import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { width } from "@mui/system";

const BorrowReturnBooks = () => {
  const books = useSelector((state) => state.books);
  const users = useSelector((state) => state.users);
  const students = users.filter((e) => e.role === "student");
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
  const date = new Date();
  const minDate =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    date.getDate();

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
                setBookInfo({ ...books[index] });
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
              }
              console.log(minDate);
            }}
            freeSolo
            id="free-solo-2-demo"
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
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-primary">Date return:</span>
              <input className="form-control w-50" type="date" min={minDate} />
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-primary">Amount:</span>
              <input className="form-control w-50" />
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-primary">Submit</button>
              <button className="btn btn-secondary">Cancel</button>
            </div>
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

export default BorrowReturnBooks;
