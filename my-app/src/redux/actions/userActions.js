export const loginUser = (userID, emailStyle={}, passwordStyle={},loginStatus) => {
console.log('login action--', emailStyle);
  return {
    type: 'loginUser',
    userID: userID,
    emailStyle:emailStyle,
    passwordStyle:passwordStyle,
    loginStatus:loginStatus
  };
};

export const logoutUser = () => {
  //console.log("logout action--", userID);
  return {
    type: 'logoutUser'
  };
};
