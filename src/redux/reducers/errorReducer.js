const initialstate = {
  hasError: false,
  errorMsg: ''
};

const errorReduser = (state = initialstate, action) => {
  //console.log("error reduser")
  switch (action.type) {
    case 'error':
      return {
        ...state,
        hasError: true,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
};

export default errorReduser;
