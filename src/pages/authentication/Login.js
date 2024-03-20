import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import "../../assets/style/custom.css";
import CloseEyeIcon from "../../assets/svg/CloseEyeIcon";
import OpenEyeIcon from "../../assets/svg/OpenEyeIcon";
import { LoginUser } from "../../redux/action/action";
import { useDispatch } from "react-redux";
import "../../assets/style/custom.css";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [backEndErrorEmail, setBackEndErrorEmail] = useState("");
  const [backEndErrorPassword, setBackEndErrorPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      const apiResponse = await dispatch(LoginUser(user));
      if (apiResponse.message === "login success") {
        localStorage.setItem("token", JSON.stringify(apiResponse.token));
        navigate(`/home`, { state: { apiResponse } });
      } else if (apiResponse.response.data.error) {
        apiResponse.response.data.error === "Entered account doesn't exists"
          ? setBackEndErrorEmail(apiResponse.response.data.error)
          : setBackEndErrorEmail("");
        apiResponse.response.data.error === "Invalid password"
          ? setBackEndErrorPassword(apiResponse.response.data.error)
          : setBackEndErrorPassword("");
      } else {
        apiResponse.response.statusText === "Not Found"
          ? setServerError("Request Failed due to Server Issue")
          : setServerError("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setServerError("Server Error");
    }
  };
  let Ifield = {
    borderBottom: "1px solid black",
    border: "none",
    borderRadius: "3px",
    width: "100%",
    fontWeight: 500,
    fontSize: "18px",
    letterSpacing: "2px",
  };

  return (
    <Box>
      <Box className="main_head">
        <Box className="input_form">
          <Typography className="form_name" textAlign={"center"}>
            Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="">
              <Typography mt={1} mb={2}>
                Email *{" "}
              </Typography>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                {...register("email")}
                className=""
                autoComplete="username"
              />
              {errors.email && (
                <Typography className="customError" color="error" mt={1}>
                  {errors.email.message}
                </Typography>
              )}
              {backEndErrorEmail && (
                <Typography className="custom_error" mt={1}>
                  {" "}
                  {backEndErrorEmail}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography mt={1} mb={2}>
                Password *
              </Typography>
              <TextField
                variant="outlined"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className=""
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </IconButton>
                  ),
                  style: { ...Ifield },
                }}
                autoComplete="current-password"
              />
              {errors.password && (
                <Typography className="customError" color="error" mt={1}>
                  {errors.password.message}
                </Typography>
              )}
              {backEndErrorPassword && (
                <Typography className="custom_error" mt={1}>
                  {" "}
                  {backEndErrorPassword}
                </Typography>
              )}
            </Box>
            <Button
              sx={{
                margin: "40px 0px",
                backgroundColor: "green",
                color: "white",
              }}
              fullWidth
              type="submit"
              variant="outlined"
            >
              LOGIN
            </Button>
            <Typography>
              If don't have an account. please
              <Link to="/signup"> signup</Link>
            </Typography>
          </form>
          {serverError && (
            <Typography className="customError" mt={2}>
              {" "}
              {serverError}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
