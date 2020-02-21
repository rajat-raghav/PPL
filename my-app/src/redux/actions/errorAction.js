export const error = (hasError, errorMsg) => {
  //console.log("Error Action", hasError);
  return {
    type: 'error',
    hasError: hasError,
    errorMsg: errorMsg
  };
};
