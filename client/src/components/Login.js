import { React, useState, useContext } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from './images/Fork it Over-logos_transparent.png'
import axios from "axios";
import { mealContext } from '../providers/MealProvider'
import { AddIngredientButtonAlt } from '../customstyles/AddIngredientButton';

const Login = function (props) {

  const [username, setUsername] = useState('')
  const { setCookie } = useContext(mealContext);

  const login = function () {
    axios.get(`/api/users/login/${username}`)
      .then(() => {
        setCookie(() => { return username[username.length - 1] })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="login">
      <form className="form">
        <img className="fioLogoLogin" src={Logo} />
        <TextField sx={{ marginBottom: "8px", backgroundColor: "white" }}
          labelText="Email"
          formControlProps={{
            fullWidth: true
          }}
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField sx={{ backgroundColor: "white" }}
          labelText="Password"
          formControlProps={{
            fullWidth: true
          }}
          label="Password"
          type="password"
        />

        <AddIngredientButtonAlt onClick={() => { login() }} type="button" className="form__custom-button" component={Link} to={"/WeekPlan/"}>
          Login
        </AddIngredientButtonAlt>
      </form>
    </div>
  );

}
export default Login

