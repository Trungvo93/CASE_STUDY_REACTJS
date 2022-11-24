import axios from "axios";

export const getAction = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};

export const fecthLoginedUser = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `https://637edb84cfdbfd9a63b87c1c.mockapi.io/loginedUser`,
      data[0]
    );
    dispatch(getAction("FECTH_LOGIN_SUCCESS", data));
  };
};

export const logOut = () => {
  return async (dispatch) => {
    const res = await axios.delete(
      `https://637edb84cfdbfd9a63b87c1c.mockapi.io/loginedUser/1`
    );
    dispatch(getAction("FECTH_LOGIN_SUCCESS", []));
  };
};
