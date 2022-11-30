import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { width } from "@mui/system";
const BorrowReturnBooks = () => {
  const books = useSelector((state) => state.books);
  return (
    <div className="container mb-5">
      <h3 className="text-center">Borrow and Return</h3>
      <div className="row mt-5">
        <div className="col-6">
          <div className="d-flex">
            <Autocomplete
              sx={{ width: "100%" }}
              onChange={(event, newValue) => {
                console.log(newValue);
              }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={books.map(
                (option) => option.title + " (" + option.ISBN + ")"
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-6">asds</div>
      </div>
    </div>
  );
};

export default BorrowReturnBooks;
