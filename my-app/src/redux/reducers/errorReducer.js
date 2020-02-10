const initialstate = {
  hasError: false,
  errorMsg: ""
};

const errorReduser = (state = initialstate, action) => {
  switch (action.type) {
    case "error":
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
