import { combineReducers } from "redux";
import {
  SignupReducer,
  LoginReducer,
  AddEmployeeReducer,
  viewEmployeeReducer,
  editEmployeeReducer,
  getEmployeeByIdReducer,
  deleteEmployeeReducer,
} from "./reducers";

const rootReducer = combineReducers({
  signup: SignupReducer,
  login: LoginReducer,
  add_employee: AddEmployeeReducer,
  view_employee: viewEmployeeReducer,
  edit_employee: editEmployeeReducer,
  get_employee_by_id: getEmployeeByIdReducer,
  delete_employee: deleteEmployeeReducer,
});

export default rootReducer;
