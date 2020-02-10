export const error = (hasError, errorMsg) => {
  //console.log("Error action", hasError);
  return {
    type: "error",
    hasError: hasError,
    errorMsg: errorMsg
  };
};
