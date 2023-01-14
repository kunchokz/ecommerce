import { notify } from "./notify";

export const errorHandler = (error) => {
  debugger;
  let errMsg = 'Something Went Wrong';
  let err = error.response || {};
  let errData = err.data;
  if (errData) {
    errMsg = errData.msg
  }
  notify.showError(errMsg)
  // catch error
  // parse it
  // extract error message
  // prepare error message
  // show them in ui
}