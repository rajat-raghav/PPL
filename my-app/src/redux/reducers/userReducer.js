const initialState = {
  userID: '',
  name: '',
  emailStyle: {},
  passwordStyle: {},
  loginStatus: ''
};

const userReducer = (state = initialState, action) => {
  //console.log("user reduser")
  switch (action.type) {
    case 'loginUser':
      return {
        ...state,
        userID: action.userID,
        name: action.name,
        emailStyle: action.emailStyle,
        passwordStyle: action.passwordStyle,
        loginStatus: action.loginStatus

      };
    case 'logoutUser':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
