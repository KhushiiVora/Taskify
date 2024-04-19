import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";

import { saved as userSaved } from "../../state/userSlice";

import { FormControl } from "@mui/material";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import signup from "/img/signup.svg";
import { StyledSection, StyledTextField } from "../../styles/auth.styles";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(event) {
    const value = event?.target?.value;

    setFormData({
      ...formData,
      [event?.target?.name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("/auth/signup", formData, { withCredentials: true })
      .then((response) => response.data)
      .then((user) => {
        delete user.workspaces;
        delete user.password;
        dispatch(userSaved(user));
        navigate(`/profile`, { state: { isSignedUp: true } });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
  }

  return (
    <StyledSection>
      <div className="auth_container">
        <div className="auth_container--img">
          <img src={signup} alt="Sign Up" />
        </div>
        <form onSubmit={handleSubmit} className="form_container">
          <h1>Sign Up</h1>
          <StyledTextField
            name="username"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <StyledTextField
            name="email"
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" text="Sign Up" className="filled_button" />
          <div className="form_container__redirect">
            <h4>Already have an account?</h4>
            <Button
              type="button"
              text="Login"
              onClick={() => navigate("/login")}
              className="link_button"
            />
          </div>
          <ToastContainer />
        </form>
      </div>
    </StyledSection>
  );
}
