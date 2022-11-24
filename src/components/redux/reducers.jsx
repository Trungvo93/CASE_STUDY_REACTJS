const initialState = { users: [], loginedUser: [] };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FECTH_USER_SUCCESS":
      return {
        ...state,
        users: [...action.payload],
      };
    case "FECTH_LOGIN_SUCCESS":
      return {
        ...state,
        loginedUser: [...action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
