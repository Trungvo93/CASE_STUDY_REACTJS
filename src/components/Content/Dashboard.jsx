import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
const Dashboard = () => {
  const nagivate = useNavigate();
  const booksList = useSelector((state) => state.books);
  const usersList = useSelector((state) => state.users);
  const adminList = usersList.filter((e) => e.role === "admin").length;
  const libraryList = usersList.filter((e) => e.role === "library").length;
  const studentList = usersList.filter((e) => e.role === "student").length;
  const borrowandreturnList = useSelector((state) => state.borrowandreturn);
  const returnedList = borrowandreturnList.filter(
    (e) => e.dayReturned !== ""
  ).length;
  const top6RecentUsers = [];
  usersList.slice(-6).map((e) => {
    top6RecentUsers.unshift(e);
  });
  //Apexcharts
  const [optionsUsers, setOptionsUsers] = useState({
    labels: ["Admin", "Library", "Student"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: "20px",
              color: "#297A18",
              label: "Total Users",
            },
          },
        },
      },
    },
  });
  const [seriesUsers, setSeriesUsers] = useState([
    adminList,
    libraryList,
    studentList,
  ]);

  return (
    <div className="container">
      {/* <div className="d-flex justify-content-between">
        <div className="w-50">
          <Chart
            options={optionsUsers}
            series={seriesUsers}
            type="donut"
            width="100%"
          />
        </div>
      </div> */}

      <div className="row">
        <div
          className="col-3  "
          onClick={() => {
            nagivate("/home/users");
          }}>
          <div className="bg-info rounded p-0">
            <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
              <div className=" text-white">
                <h1>{usersList.length}</h1>
                <span>Users</span>
              </div>
              <div className="icon text-white">
                <i className="bi bi-people  "></i>
              </div>
            </div>
            <div className="text-center text-white  p-1 get-info">
              <span>More info</span>
              <i className="bi bi-arrow-right-circle ps-2"></i>
            </div>
          </div>
        </div>
        <div
          className="col-3  "
          onClick={() => {
            nagivate("/home/products");
          }}>
          <div className="bg-success rounded p-0">
            <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
              <div className=" text-white">
                <h1>{booksList.length}</h1>
                <span>Books</span>
              </div>
              <div className="icon text-white">
                <i className="bi bi-journals"></i>
              </div>
            </div>
            <div className="text-center text-white  p-1 get-info">
              <span>More info</span>
              <i className="bi bi-arrow-right-circle ps-2"></i>
            </div>
          </div>
        </div>
        <div
          className="col-3  "
          onClick={() => {
            nagivate("/home/borrowreturn");
          }}>
          <div className="bg-warning rounded p-0">
            <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
              <div className=" text-white">
                <h1>{borrowandreturnList.length}</h1>
                <span>Borrows</span>
              </div>
              <div className="icon text-white">
                <i className="bi bi-clipboard-minus"></i>
              </div>
            </div>
            <div className="text-center text-white  p-1 get-info">
              <span>More info</span>
              <i className="bi bi-arrow-right-circle ps-2"></i>
            </div>
          </div>
        </div>
        <div
          className="col-3  "
          onClick={() => {
            nagivate("/home/borrowreturn");
          }}>
          <div className="bg-danger rounded p-0">
            <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
              <div className=" text-white">
                <h1>{returnedList}</h1>
                <span>Returned</span>
              </div>
              <div className="icon text-white">
                <i class="bi bi-clipboard-check"></i>
              </div>
            </div>
            <div className="text-center text-white  p-1 get-info">
              <span>More info</span>
              <i className="bi bi-arrow-right-circle ps-2"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 last member */}
      <div className="row mt-5 ">
        <div className="col-6 ">
          <div className="border bg-black bg-opacity-50 shadow p-2 rounded text-white">
            <div>
              <span className="p-2 bg-danger d-inline-block rounded fw-bold">
                Lastest Members
              </span>
            </div>
            <div className="row mt-2">
              <div className="col-4 text-center my-3">
                <img
                  src={top6RecentUsers[0].avatar}
                  alt=""
                  className="rounded-circle w-50"
                />
                <p className="text-capitalize">{top6RecentUsers[0].name}</p>
              </div>
              <div className="col-4 text-center my-3">
                <img
                  src={top6RecentUsers[1].avatar}
                  alt=""
                  className="rounded-circle w-50"
                />
                <p className="text-capitalize">{top6RecentUsers[1].name}</p>
              </div>
              <div className="col-4 text-center my-3">
                <img
                  src={top6RecentUsers[2].avatar}
                  alt=""
                  className="rounded-circle w-50"
                />
                <p className="text-capitalize">{top6RecentUsers[2].name}</p>
              </div>

              <div className="col-4 text-center my-3">
                <img
                  src={top6RecentUsers[3].avatar}
                  alt=""
                  className="rounded-circle w-50"
                />
                <p className="text-capitalize">{top6RecentUsers[3].name}</p>
              </div>
              <div className="col-4 text-center my-3">
                <img
                  src={top6RecentUsers[4].avatar}
                  alt=""
                  className="rounded-circle w-50"
                />
                <p className="text-capitalize">{top6RecentUsers[4].name}</p>
              </div>
              <div className="col-4 text-center my-3">
                <img
                  src={top6RecentUsers[5].avatar}
                  alt=""
                  className="rounded-circle w-50"
                />
                <p className="text-capitalize">{top6RecentUsers[5].name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
