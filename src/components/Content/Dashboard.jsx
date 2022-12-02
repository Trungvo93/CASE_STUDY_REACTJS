import React, { useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
const Dashboard = () => {
  const booksList = useSelector((state) => state.books);
  const usersList = useSelector((state) => state.users);
  const adminList = usersList.filter((e) => e.role === "admin").length;
  const libraryList = usersList.filter((e) => e.role === "library").length;
  const studentList = usersList.filter((e) => e.role === "student").length;
  const borrowandreturnList = useSelector((state) => state.borrowandreturn);
  const returnList = borrowandreturnList.filter(
    (e) => e.dayReturned !== ""
  ).length;
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

  const [optionsBorrowReturn, setOptionsBorrowReturn] = useState({
    labels: ["Borrow", "Returned"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
            },
          },
        },
      },
    },
  });
  const [seriesBorrowReturn, setSeriesBorrowReturn] = useState([
    borrowandreturnList.length,
    returnList,
  ]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="w-50">
          <Chart
            options={optionsUsers}
            series={seriesUsers}
            type="donut"
            width="100%"
          />
        </div>
        <div className="w-50">
          <Chart
            options={optionsBorrowReturn}
            series={seriesBorrowReturn}
            type="donut"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
