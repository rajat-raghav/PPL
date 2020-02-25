export const loginUser = (userID, name, emailStyle = {}, passwordStyle = {}, loginStatus) => {
  //console.log('login action--', emailStyle);
  return {
    type: 'loginUser',
    userID: userID,
    name: name,
    emailStyle: emailStyle,
    passwordStyle: passwordStyle,
    loginStatus: loginStatus
  };
};

export const logoutUser = () => {
  //console.log("logout action--", userID);
  return {
    type: 'logoutUser'
  };
};
