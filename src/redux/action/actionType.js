export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";
export const VIEW_EMPLOYEE_SUCCESS = "VIEW_EMPLOYEE_SUCCESS";

export const VIEW_EMPLOYEE_FAILURE = "VIEW_EMPLOYEE_FAILURE";
export const EDIT_EMPLOYEE_SUCCESS = "EDIT_EMPLOYEE_SUCCESS";
export const EDIT_EMPLOYEE_FAILURE = "EDIT_EMPLOYEE_FAILURE";
export const GET_EMPLOYEE_BY_ID_SUCCESS = "GET_EMPLOYEE_BY_ID_SUCCESS";
export const GET_EMPLOYEE_BY_ID_FAILURE = "GET_EMPLOYEE_BY_ID_FAILURE";

export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const DELETE_EMPLOYEE_FAILURE = "DELETE_EMPLOYEE_FAILURE";

export const SignupSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};
export const SignupFailure = (data) => {
  return {
    type: SIGNUP_FAILURE,
    payload: data,
  };
};
export const LoginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const LoginFailure = (data) => {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
};

export const AddEmployeeSuccess = (data) => {
  return {
    type: ADD_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const AddEmployeeFailure = (data) => {
  return {
    type: ADD_EMPLOYEE_FAILURE,
    payload: data,
  };
};
export const ViewEmployeeSuccess = (data) => {
  return {
    type: VIEW_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const ViewEmployeeFailure = (data) => {
  return {
    type: VIEW_EMPLOYEE_FAILURE,
    payload: data,
  };
};

export const editEmployeeSuccess = (data) => {
  return {
    type: EDIT_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const editEmployeeFailure = (data) => {
  return {
    type: EDIT_EMPLOYEE_FAILURE,
    payload: data,
  };
};

export const getEmployeeByIdSuccess = (data) => {
  return {
    type: GET_EMPLOYEE_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getEmployeeByIdFailure = (data) => {
  return {
    type: GET_EMPLOYEE_BY_ID_FAILURE,
    payload: data,
  };
};

export const deleteEmployeeSuccess = (data) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const deleteEmployeeFailure = (data) => {
  return {
    type: DELETE_EMPLOYEE_FAILURE,
    payload: data,
  };
};
