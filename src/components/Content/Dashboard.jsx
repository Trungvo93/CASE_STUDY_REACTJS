import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";
const Dashboard = () => {
  const users = useSelector((state) => state.users);
  const [idActive, setIdActive] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / 10); i++) {
    pageNumbers.push(i);
  }
  const firstPage = users.slice(0, 10);
  const [usersPerPage, setUsersPerPage] = useState([]);
  const handleJumpPage = (index) => {
    const firstIndex = index * 10 - 10;
    const lastIndex = index * 10;
    const newList = users.slice(firstIndex, lastIndex);
    setUsersPerPage(newList);
    setIdActive(index);
  };

  return (
    <div>
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
                  <td>{e.name}</td>
                  <td className="text-capitalize">{e.role}</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            : usersPerPage.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e.name}</td>
                  <td className="text-capitalize">{e.role}</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}

          <tr>
            <td colSpan={4} className="py-3">
              <div className="pagination d-flex justify-content-end">
                {pageNumbers.map((i) => (
                  <div
                    key={i}
                    className={`pagination-item border ${
                      idActive === i ? "active" : ""
                    }`}
                    onClick={() => {
                      handleJumpPage(i);
                    }}>
                    {i}
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
