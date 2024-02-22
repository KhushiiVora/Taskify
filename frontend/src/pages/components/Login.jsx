import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";

import TextField from "@mui/material/TextField";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
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
    const isUsernameEmail = validator.isEmail(formData.username);
    console.log("isUsernameEmail", isUsernameEmail);
    if (isUsernameEmail) {
      const username = formData.username;
      setFormData({
        password: formData.password,
        email: username,
      });
    }
    console.log("formData", formData);
    await axios
      .post("/auth/login", formData, { withCredentials: true })
      .then((response) => {
        console.log("response.data", response.data);
        navigate(`/dashboard/${response.data.username}`);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
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
    <div>
      Login page
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          id="outlined-basic"
          label="Username or Email"
          variant="outlined"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
        <Button type="submit" text="Login" />
        <ToastContainer />
      </form>
    </div>
  );
}
