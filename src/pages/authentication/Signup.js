import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseEyeIcon from "../../assets/svg/CloseEyeIcon";
import OpenEyeIcon from "../../assets/svg/OpenEyeIcon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignupUser } from "../../redux/action/action";
import "../../assets/style/custom.css";

const emailRegex = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const phoneNumberRegex = /^\(?([2-9][0-8][0-9])\)?(\d{3})(\d{4})$/;

const signUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Fullname is required")
    .min(2, "Fullname must be between 2 and 25 characters"),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .matches(phoneNumberRegex, "Invalid phone number")
    .min(10, "Phone number should be at least 10 digits"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords don't match"),
});
const SignUp = () => {
  const [backEndErrorEmail, setBackEndErrorEmail] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const user = {
      fullname: data.fullname,
      email: data.email,
      phone: Number(data.phone),
      password: data.password,
    };
    const apiResponse = await dispatch(SignupUser(user));
    if (apiResponse.message === "signup success") {
      localStorage.setItem("token", JSON.stringify(apiResponse.token));
      setBackEndErrorEmail("");
      localStorage.setItem("signupDetailsStored", JSON.stringify(apiResponse));
      localStorage.removeItem("loginDetailsStored");
      navigate(`/home}`, {
        state: { apiResponse },
      });
    } else {
      const errors = apiResponse.response.data.errors;
      console.log(errors);
      switch (true) {
        case errors.some((error) => error.msg === "Invalid value"):
          setBackEndErrorEmail("Invalid value");
          break;
        case errors.some(
          (error) =>
            error.msg === "Full name must be between 2 and 25 characters"
        ):
          setBackEndErrorEmail("Fullname must be between 2 and 25 characters");
          break;
        case errors.some((error) => error.msg === "Email is already in use"):
          setBackEndErrorEmail("This account is already exists!");
          break;
        default:
          setBackEndErrorEmail("error found.");
      }
    }
  };

  let Ifield = {
    border: "1px solid black",
    border: "none",
    borderRadius: "3px",
    height: "50px",
    fontSize: "18px",
    fontWeight: 500,
    letterSpacing: "2px",
    fontSize: "18px",
  };
  return (
    <Box>
      <Box className="main_head">
        <Box className="input_form">
          <Typography className="form_name" textAlign={"center"}>
            Signup
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="">
              <Typography>Full Name * </Typography>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                {...register("fullname")}
                className="inputField"
              />
              {errors.fullname && (
                <Typography className="custom_error" color="error">
                  {errors.fullname.message}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>Email * </Typography>
              <TextField
                type="email"
                fullWidth
                height={"40px"}
                variant="outlined"
                {...register("email")}
                className="inputField"
              />
              {errors.email && (
                <Typography className="custom_error" color="error">
                  {errors.email.message}
                </Typography>
              )}
              {backEndErrorEmail && (
                <Typography className="custom_error" mt={1.5}>
                  {" "}
                  {backEndErrorEmail}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>Phone * </Typography>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                {...register("phone")}
                className="inputField "
              />
              {errors.phone && (
                <Typography className="custom_error" mt={1.5} color="error">
                  {errors.phone.message}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>Password *</Typography>
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="inputField"
                sx={Ifield}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </IconButton>
                  ),
                  style: {
                    ...Ifield,
                    width: "",
                  },
                }}
                autoComplete="password"
              />
              {errors.password && (
                <Typography className="custom_error" color="error">
                  {errors.password.message}
                </Typography>
              )}
            </Box>
            <Box className="">
              <Typography>Confirm Password *</Typography>
              <TextField
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showConfirmPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </IconButton>
                  ),
                  style: {
                    ...Ifield,
                  },
                }}
                className="inputField"
                autoComplete="confirm-password"
              />
              {errors.confirmPassword && (
                <Typography className="custom_error" color="error">
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ margin: "20px 0px" }}
              color="success"
            >
              SIGNUP
            </Button>

            <Box className="back">
              <Link className="" to="/">
                Cancel
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
