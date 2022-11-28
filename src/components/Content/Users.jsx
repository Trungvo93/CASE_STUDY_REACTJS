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
  const [showSameID, setShowSameID] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loginedUser = useSelector((state) => state.loginedUser);
  const [listUsers, setListUsers] = useState([...users]);
  const [findUsers, setFindUsers] = useState("");
  const [idActive, setIdActive] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listUsers.length / 10); i++) {
    pageNumbers.push(i);
  }
  // const firstPage = [...listUsers.slice(0, 10)];
  const [firstPage, setFirstPage] = useState([...listUsers.slice(0, 10)]);
  const [usersPerPage, setUsersPerPage] = useState([]);

  //Jump pageNumbers
  const handleJumpPage = (index) => {
    const firstIndex = index * 10 - 10;
    const lastIndex = index * 10;
    const newList = listUsers.slice(firstIndex, lastIndex);
    setUsersPerPage(newList);
    setIdActive(index);
  };

  //Filter user
  const handleFilter = (e) => {
    setFindUsers(e.target.value);
    const convertValue = e.target.value.trim().toLowerCase();
    const listFilter = users.filter((user) =>
      user.name.trim().toLowerCase().includes(convertValue)
    );
    setListUsers([...listFilter]);
    setFirstPage([...listFilter.slice(0, 10)]);
    const firstIndex = idActive * 10 - 10;
    const lastIndex = idActive * 10;
    const listPerPage = listFilter.slice(firstIndex, lastIndex);
    if (listPerPage.length > 0) {
      setUsersPerPage(listPerPage);
    } else {
      const newIdActive = idActive - 1;
      setIdActive(newIdActive);
      const newFirstIndex = newIdActive * 10 - 10;
      const newLastIndex = newIdActive * 10;
      const newListPerPage = listFilter.slice(newFirstIndex, newLastIndex);
      setUsersPerPage(newListPerPage);
    }
  };

  //Add user
  const handleAddUser = () => {
    navigate("/home/adduser");
  };

  //Edit user
  const handleEditUser = (e) => {
    navigate("/home/userdetail", { state: e });
  };
  //Delete user and update state
  const handleDelete = (user) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user"
    );
    if (user.id === loginedUser[0].id) {
      setShowSameID(true);
    } else if (confirmation) {
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
          setFindUsers("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Trigger Toast popup

  return (
    <div>
      {/* Show popup same ID */}
      <Toast
        onClose={() => setShowSameID(false)}
        show={showSameID}
        delay={3000}
        autohide
        className="toast-popup bg-danger text-white">
        <Toast.Header className="bg-danger text-white">
          <i className="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Error!</strong>
        </Toast.Header>
        <Toast.Body>You cant delete your account loging</Toast.Body>
      </Toast>
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
        <h3>User</h3>

        {/* Filter users */}
        <input
          type="text"
          value={findUsers}
          placeholder="Search..."
          className="form-control w-50"
          onChange={handleFilter}
        />
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

      {/* Show users */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Role</th>
            <th>School</th>
            <th>Student ID</th>
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
                      <>
                        <button
                          className="btn btn-warning me-3"
                          onClick={() => handleEditUser(e)}>
                          Edit
                        </button>
                        <button
                          id="liveToastBtn"
                          className="btn btn-danger "
                          onClick={() => {
                            handleDelete(e);
                          }}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning me-3"
                          onClick={() => handleEditUser(e)}
                          disabled>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger "
                          onClick={() => {
                            handleDelete(e);
                          }}
                          disabled>
                          Delete
                        </button>
                      </>
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
                      <>
                        <button
                          className="btn btn-warning me-3"
                          onClick={() => handleEditUser(e)}>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger "
                          onClick={() => {
                            handleDelete(e);
                          }}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning me-3"
                          onClick={() => handleEditUser(e)}
                          disabled>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger "
                          onClick={() => {
                            handleDelete(e);
                          }}
                          disabled>
                          Delete
                        </button>
                      </>
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
