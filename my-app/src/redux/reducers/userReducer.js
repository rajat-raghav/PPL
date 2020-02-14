const initialState = {
  userID: '',
  emailStyle:{},
  passwordStyle:{},
  loginStatus:''
};

const userReducer = (state = initialState, action) => {
  //console.log("user reduser")
  switch (action.type) {
    case 'loginUser':
      return {
        ...state,
        userID: action.userID,
        emailStyle: action.emailStyle,
        passwordStyle:action.passwordStyle,
        loginStatus:action.loginStatus

      };
    case 'logoutUser':
      return {
        ...state,
        userID: ''
      };
    default:
      return state;
  }
};

export default userReducer;
