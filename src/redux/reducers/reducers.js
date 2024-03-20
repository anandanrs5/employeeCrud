import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  VIEW_EMPLOYEE_SUCCESS,
  VIEW_EMPLOYEE_FAILURE,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_BY_ID_SUCCESS,
  GET_EMPLOYEE_BY_ID_FAILURE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from "../action/actionType";

const initialState = {
  inputData: null,
};

export const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        inputData: action.payload,
      };
    case SIGNUP_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};
export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, inputData: action.payload };
    case LOGIN_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};

export const AddEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_SUCCESS:
      return { ...state, inputData: action.payload };
    case ADD_EMPLOYEE_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};
export const viewEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_EMPLOYEE_SUCCESS:
      return { ...state, inputData: action.payload };
    case VIEW_EMPLOYEE_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};

export const editEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_EMPLOYEE_SUCCESS:
      return { ...state, inputData: action.payload };
    case EDIT_EMPLOYEE_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};

export const getEmployeeByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_BY_ID_SUCCESS:
      return { ...state, inputData: action.payload };
    case GET_EMPLOYEE_BY_ID_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};
export const deleteEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_SUCCESS:
      return { ...state, inputData: action.payload };
    case DELETE_EMPLOYEE_FAILURE:
      return { ...state, inputData: action.payload };
    default:
      return state;
  }
};
