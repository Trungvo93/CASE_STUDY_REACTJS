import React from "react";
import { useSelector } from "react-redux";
const TopInfo = () => {
  const loginedUser = useSelector((state) => state.loginedUser);

  return (
    <>
      <div className="bg-secondary avatarLogin p-3 mx-3 mt-5 rounded-3  logo">
        <div className="d-flex gap-3 align-items-center">
          {/* <img
            src={`${process.env.PUBLIC_URL}/images/ava-1.jpg`}
            alt=""
            className="logoAva1 rounded-circle"
          /> */}
          <img
            src={loginedUser.length > 0 ? loginedUser[0].avatar : ""}
            alt=""
            className="logoAva1 rounded-circle"
          />
          <p className="m-0 fw-bold">
            {loginedUser.length > 0 ? loginedUser[0].name : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default TopInfo;
