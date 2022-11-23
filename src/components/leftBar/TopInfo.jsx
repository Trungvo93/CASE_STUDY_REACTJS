import React from "react";

const TopInfo = () => {
  return (
    <>
      <div className="my-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_Libary.png`}
          alt=""
          className="logo"
        />
      </div>
      <div className="bg-secondary avatarLogin p-3 mx-3 rounded-3 d-flex gap-3 align-items-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/ava-1.jpg`}
          alt=""
          className="logo rounded-circle"
        />
        <p className="m-0 fw-bold">Administator</p>
      </div>
    </>
  );
};

export default TopInfo;
