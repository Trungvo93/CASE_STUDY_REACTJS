import React, { useEffect, useState } from "react";

const TopInfo = () => {
  return (
    <>
      <div className="bg-secondary avatarLogin p-3 mx-3 mt-5 rounded-3 d-flex gap-3 align-items-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/ava-1.jpg`}
          alt=""
          className="logo rounded-circle"
        />
        {/* <p className="m-0 fw-bold">{loginedUser[0].name}</p> */}
      </div>
    </>
  );
};

export default TopInfo;
