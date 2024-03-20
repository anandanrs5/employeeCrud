import axios from "axios";
import {
  SignupSuccess,
  SignupFailure,
  LoginSuccess,
  LoginFailure,
  AddEmployeeSuccess,
  AddEmployeeFailure,
  editEmployeeFailure,
  editEmployeeSuccess,
  ViewEmployeeFailure,
  ViewEmployeeSuccess,
  getEmployeeByIdSuccess,
  getEmployeeByIdFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
} from "./actionType";
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const SignupUser = (userData) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .post(apiUrl + "/api/signup", userData, config)
      .then((response) => {
        dispatch(SignupSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(SignupFailure(error.data));
        return error;
      });
  };
};
export const LoginUser = (userData) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .post(apiUrl + "/api/login", userData, config)
      .then((response) => {
        dispatch(LoginSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(LoginFailure(error.data));
        return error;
      });
  };
};

export const addEmployee = (userData, userToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    return axios
      .post(apiUrl + "/api/employee/add", userData, config)
      .then((response) => {
        dispatch(AddEmployeeSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(AddEmployeeFailure(error.data));
        return error;
      });
  };
};

export const viewEmployee = (userToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    return axios
      .get(apiUrl + "/api/employee/view", config)
      .then((response) => {
        dispatch(ViewEmployeeSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(ViewEmployeeFailure(error.data));
        return error;
      });
  };
};

export const editEmployee = (userToken, id, userData) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    return axios
      .put(apiUrl + `/api/employee/edit/${id}`, userData, config)
      .then((response) => {
        dispatch(editEmployeeSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(editEmployeeFailure(error.response.data));
        throw error;
      });
  };
};

export const getEmployeeById = (userToken, id) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    return axios
      .get(apiUrl + `/api/employee/view/${id}`, config)
      .then((response) => {
        dispatch(getEmployeeByIdSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getEmployeeByIdFailure(error.data));
        return error;
      });
  };
};

export const deleteEmployee = (id, userToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    return axios
      .delete(apiUrl + `/api/employee/delete/${id}`, config)
      .then((response) => {
        dispatch(deleteEmployeeSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteEmployeeFailure(error.data));
        return error;
      });
  };
};
