const initialState = {
  userID: ""
};

const userReducer = (state = initialState, action) => {
  //console.log("user reduser")
  switch (action.type) {
    case "loginUser":
      return {
        ...state,
        userID: action.userID
      };
    case "logoutUser":
      return {
        ...state,
        userID: ""
      };
    default:
      return state;
  }
};

export default userReducer;
