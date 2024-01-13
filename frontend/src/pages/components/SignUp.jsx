import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Input from "../atoms/Input";
import { FormControlLabel } from "@mui/material";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";

export default function SignUp() {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  function showPassword() {
    setDisplayPassword(!displayPassword);
  }

  function handleChange(e) {
    const value = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("/auth/signup", formData)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    navigate("/workspace");
  }

  return (
    <div>
      SignUp page
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type={displayPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={<Checkbox onChange={showPassword} />}
          label="Show Password"
        />
        <Button type="submit" text="Sign Up" />
      </form>
    </div>
  );
}
