import React, { useEffect } from "react";
import "./Products.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Dropdown from "react-bootstrap/Dropdown";

const Products = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const loginedUser = useSelector((state) => state.loginedUser);
  const [listBooks, setListUsers] = useState([...books]);
  const [findItem, setFindItem] = useState("");
  const [typeFilter, setTypeFilter] = useState("title");
  const [idActive, setIdActive] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const getPageNumbers = (list) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(list.length / 10); i++) {
      pages.push(i);
    }
    setPageNumbers([...pages]);
  };

  useEffect(() => {
    getPageNumbers(listBooks);
  }, []);

  const [usersPerPage, setUsersPerPage] = useState([...listBooks.slice(0, 10)]);

  //Jump pageNumbers
  const handleJumpPage = (index) => {
    const firstIndex = index * 10 - 10;
    const lastIndex = index * 10;
    const newList = listBooks.slice(firstIndex, lastIndex);
    setUsersPerPage(newList);
    setIdActive(index);
  };

  //Filter user
  const handleFilter = (e) => {
    setFindItem(e.target.value);
    const convertValue = e.target.value.trim().toLowerCase();
    const listFilter = books.filter((item) =>
      item[typeFilter].toString().trim().toLowerCase().includes(convertValue)
    );
    setListUsers([...listFilter]);
    getPageNumbers(listFilter);
    setIdActive(1);
    const newList = listFilter.slice(0, 10);
    setUsersPerPage(newList);
  };

  //Add user
  const handleAddUser = () => {
    navigate("/home/addproduct");
  };

  //Edit user
  const handleEditUser = (e) => {
    navigate("/home/productdetail", { state: e });
  };
  //Delete user and update state
  const handleDelete = (item) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user"
    );
    if (confirmation) {
      axios
        .delete(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books/${item.id}`)
        .then((res) => {
          const newList = books.filter((e) => e.id !== res.data.id);
          dispatch(getAction("FECTH_BOOKS_SUCCESS", newList));
          setListUsers([...newList]);
          getPageNumbers(newList);
          setIdActive(1);
          setUsersPerPage(newList.slice(0, 10));
        })
        .then((res2) => {
          setShow(true);
          setFindItem("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Trigger Toast popup

  return (
    <div>
      {/* Show popup delete */}
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
        <Toast.Body>User has been delete!</Toast.Body>
      </Toast>

      {/* Add user */}
      <div className="d-flex justify-content-between my-4">
        <h3>Books</h3>
        {/* Filter users */}
        <div className="d-flex gap-2 w-75">
          <Dropdown
            onSelect={(e) => {
              setTypeFilter(e);
            }}>
            <Dropdown.Toggle
              variant="warning"
              id="dropdown-basic"
              className="text-capitalize">
              Filter {typeFilter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="title"
                className={typeFilter === "title" ? "active" : ""}>
                Title
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="ISBN"
                className={typeFilter === "ISBN" ? "active" : ""}>
                ISBN
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="author"
                className={typeFilter === "author" ? "active" : ""}>
                Author
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="publisher"
                className={typeFilter === "publisher" ? "active" : ""}>
                Publisher
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="category"
                className={typeFilter === "category" ? "active" : ""}>
                Category
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="text"
            value={findItem}
            placeholder="Search..."
            className="form-control "
            onChange={handleFilter}
          />
        </div>

        {loginedUser[0].role === "admin" ? (
          <button
            className="btn btn-primary fw-bold shadow"
            onClick={handleAddUser}>
            + New Book
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Show users */}
      <table className="table table-hover">
        <thead className="bg-secondary text-light ">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Update time</th>
            {loginedUser[0].role === "admin" ? <th>Action</th> : ""}
          </tr>
        </thead>
        <tbody>
          {usersPerPage.map((e, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <p className="m-0">{e.title}</p>
              </td>
              <td className="text-capitalize">{e.ISBN}</td>
              <td className="text-capitalize">{e.author}</td>
              <td className="text-capitalize">{e.publisher}</td>
              <td className="text-capitalize">{e.category}</td>
              <td className="text-capitalize">{e.amount}</td>
              <td className="text-capitalize">{e.note}</td>
              <td className="text-capitalize">{e.update_on}</td>
              <td>
                {loginedUser[0].role === "admin" ? (
                  <>
                    <button
                      className="btn btn-warning me-3"
                      onClick={() => handleEditUser(e)}>
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger "
                      onClick={() => {
                        handleDelete(e);
                      }}>
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
          {/* Pagination - phân trang */}
          <tr>
            <td colSpan={9} className="py-3">
              <div className="pagination d-flex justify-content-end">
                <ul className="pagination">
                  {pageNumbers.map((i) => (
                    <li
                      className={`page-item page-link ${
                        idActive === i ? "active" : ""
                      }`}
                      key={i}
                      onClick={() => {
                        handleJumpPage(i);
                      }}>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Products;
