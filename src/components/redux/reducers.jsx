const initialState = { users: [], loginedUser: [], avatars: [], books: [] };

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
    case "FECTH_AVATAR_SUCCESS":
      return { ...state, avatars: [...action.payload] };
    case "FECTH_BOOKS_SUCCESS":
      return { ...state, books: [...action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
