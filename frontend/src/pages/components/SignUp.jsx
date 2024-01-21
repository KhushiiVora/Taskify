import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";

import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(e) {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("/auth/signup", formData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate(`/dashboard/${res.data.username}`);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>
      SignUp page
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <TextField
          name="email"
          id="outlined-basic"
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleChange}
          value={formData.email}
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
        <Button type="submit" text="Sign Up" />
      </form>
    </div>
  );
}
