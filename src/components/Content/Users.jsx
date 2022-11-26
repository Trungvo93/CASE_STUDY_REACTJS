import React from "react";
import "./Users.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
const Users = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loginedUser = useSelector((state) => state.loginedUser);
  const [listUsers, setListUsers] = useState([...users]);

  const [idActive, setIdActive] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listUsers.length / 10); i++) {
    pageNumbers.push(i);
  }
  const firstPage = [...listUsers.slice(0, 10)];

  const [usersPerPage, setUsersPerPage] = useState([]);

  //Jump pageNumbers
  const handleJumpPage = (index) => {
    const firstIndex = index * 10 - 10;
    const lastIndex = index * 10;
    const newList = listUsers.slice(firstIndex, lastIndex);
    setUsersPerPage(newList);
    setIdActive(index);
  };

  //Add user
  const handleAddUser = () => {
    navigate("/home/adduser");
  };
  //Delete user and update state
  const handleDelete = (user) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user"
    );
    if (confirmation) {
      axios
        .delete(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/users/${user.id}`)
        .then((res) => {
          const newList = users.filter((e) => e.id !== res.data.id);
          dispatch(getAction("FECTH_USER_SUCCESS", newList));
          setListUsers([...newList]);
          const firstIndex = idActive * 10 - 10;
          const lastIndex = idActive * 10;
          const listPerPage = newList.slice(firstIndex, lastIndex);
          if (listPerPage.length > 0) {
            setUsersPerPage(listPerPage);
          } else {
            const newIdActive = idActive - 1;
            setIdActive(newIdActive);
            const newFirstIndex = newIdActive * 10 - 10;
            const newLastIndex = newIdActive * 10;
            const newListPerPage = newList.slice(newFirstIndex, newLastIndex);
            setUsersPerPage(newListPerPage);
          }
        })
        .then((res2) => {
          setShow(true);
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
          <i class="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Success</strong>
        </Toast.Header>
        <Toast.Body>User has been delete!</Toast.Body>
      </Toast>
      <div className="d-flex justify-content-between my-4">
        <h3>User</h3>
        {loginedUser[0].role === "admin" ? (
          <button
            className="btn btn-primary fw-bold shadow"
            onClick={handleAddUser}>
            + New User
          </button>
        ) : (
          ""
        )}
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersPerPage.length <= 0
            ? firstPage.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={e.avatar}
                        alt=""
                        className="rounded-circle avatar"
                      />
                      <p className="m-0">{e.name}</p>
                    </div>
                  </td>
                  <td className="text-capitalize">{e.role}</td>
                  <td>
                    {loginedUser[0].role === "admin" ? (
                      <button
                        id="liveToastBtn"
                        className="btn btn-danger "
                        onClick={() => {
                          handleDelete(e);
                        }}>
                        Delete
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          handleDelete(e);
                        }}
                        disabled>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            : usersPerPage.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={e.avatar}
                        alt=""
                        className="rounded-circle avatar"
                      />
                      <p className="m-0">{e.name}</p>
                    </div>
                  </td>
                  <td className="text-capitalize">{e.role}</td>
                  <td>
                    {loginedUser[0].role === "admin" ? (
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          handleDelete(e);
                        }}>
                        Delete
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          handleDelete(e);
                        }}
                        disabled>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

          {/* Pagination - phân trang */}
          <tr>
            <td colSpan={4} className="py-3">
              <div className="pagination d-flex justify-content-end">
                <ul className="pagination">
                  {pageNumbers.map((i) => (
                    // <div
                    //   key={i}
                    //   className={`pagination-item border ${
                    //     idActive === i ? "active" : ""
                    //   }`}
                    //   onClick={() => {
                    //     handleJumpPage(i);
                    //   }}>
                    //   {i}
                    // </div>
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

export default Users;
