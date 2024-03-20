import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEmployeeById, editEmployee } from "../../redux/action/action";
import "../../assets/style/custom.css";

const editEmployeeSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("This field required")
    .min(2, "Fullname must be between 2 and 25 characters"),
  salary: Yup.number().required("This field required"),
  designation: Yup.string()
    .required("This field required")
    .min(2, "Designation must be between 2 and 25 characters"),
  city: Yup.string()
    .required("This field required")
    .min(3, "Enter full name of city"),
});

const EditEmployee = () => {
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editEmployeeSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [backEndError, setBackEndError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userToken = JSON.parse(authToken);
        const response = await dispatch(getEmployeeById(userToken, id));
        if (response) {
          reset({
            fullname: response.fullname || "",
            salary: response.salary || "",
            designation: response.designation || "",
            city: response.city || "",
          });
        } else {
          reset({
            fullname: "",
            salary: "",
            designation: "",
            city: "",
          });
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchData();
  }, [dispatch, id, reset]);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const updatedEmployee = {
      fullname: data.fullname,
      salary: data.salary,
      designation: data.designation,
      city: data.city,
    };
    const authToken = localStorage.getItem("token");
    const userToken = JSON.parse(authToken);

    const apiResponse = await dispatch(
      editEmployee(userToken, id, updatedEmployee)
    );
    if (apiResponse) {
      navigate("/home");
      notify();
    }
  };
  const notify = () => toast.success("Employee data Updated Successfully!");
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
          <Typography className="form_name">Edit Employee</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="">
              <Typography>Full Name * </Typography>
              <TextField
                type="text"
                variant="outlined"
                {...register("fullname")}
                className="inputField"
              />
              {errors.fullname && (
                <Typography className="customError" color="error">
                  {errors.fullname.message}
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
                <Typography className="customError" color="error">
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
                <Typography className="customError" mt={1.5} color="error">
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
                <Typography className="customError" color="error">
                  {errors.city.message}
                </Typography>
              )}
            </Box>

            <Button
              fullWidth
              sx={{
                margin: "20px 0px",
                color: "white",
                backgroundColor: "green",
              }}
              type="submit"
              variant="outlined"
              className="btn"
            >
              Update
            </Button>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

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

export default EditEmployee;
