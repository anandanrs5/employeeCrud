import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/action/action";
import "../../assets/style/custom.css";

const addEmployeeSchema = Yup.object().shape({
  emp_name: Yup.string()
    .required("This field required")
    .min(2, "Fullname must be between 2 and 25 characters"),
  salary: Yup.string().required("This field required"),
  designation: Yup.string()
    .required("This field required")
    .min(2, "Designation must be between 2 and 25 characters"),
  city: Yup.string()
    .required("This field required")
    .min(3, "Enter full name of city"),
});
const AddEmployee = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addEmployeeSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const user = {
      fullname: data.emp_name,
      salary: data.salary,
      designation: data.designation,
      city: data.city,
    };
    const authToken = localStorage.getItem("token");
    const userToken = JSON.parse(authToken);
    const apiResponse = await dispatch(addEmployee(user, userToken));
    if (apiResponse) {
      navigate("/home");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <Box>
      <Box className="main_head">
        <Box className="input_form">
          <Typography className="form_name">Add Employee</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="">
              <Typography>Full Name * </Typography>
              <TextField
                type="text"
                variant="outlined"
                {...register("emp_name")}
                className="inputField"
              />
              {errors.emp_name && (
                <Typography className="custom_error" color="error">
                  {errors.emp_name.message}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>Salary * </Typography>
              <TextField
                type="number"
                variant="outlined"
                {...register("salary")}
                className="inputField"
              />
              {errors.salary && (
                <Typography className="custom_error" color="error">
                  {errors.salary.message}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>Designation * </Typography>
              <TextField
                type="text"
                variant="outlined"
                {...register("designation")}
                className="inputField "
              />
              {errors.designation && (
                <Typography className="custom_error" mt={1.5} color="error">
                  {errors.designation.message}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>City *</Typography>
              <TextField
                variant="outlined"
                type="text"
                {...register("city")}
                className="inputField"
                autoComplete="city"
              />
              {errors.city && (
                <Typography className="custom_error" color="error">
                  {errors.city.message}
                </Typography>
              )}
            </Box>
            <Button
              sx={{ margin: "20px 0px" }}
              fullWidth
              type="submit"
              variant="contained"
              className="smt"
            >
              Submit
            </Button>
            <Box className="back">
              <Link className="" to="/home">
                Back
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployee;
