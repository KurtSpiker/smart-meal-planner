import { React, useEffect, useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from './images/Fork it Over-logos_transparent.png'
import axios from "axios";
import { mealContext } from '../providers/MealProvider'

const Login = function (props) {

  const { setCookie } = useContext(mealContext);

  const login = function () {
    axios.get(`/api/users/login/1`)
      .then(() => {
        setCookie(1)
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
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          label="Username"
          type="text"
        />
        <TextField sx={{ backgroundColor: "white" }}
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true
          }}
          label="Password"
          type="password"
        />

        <Button onClick={() => { login() }} type="button" color="primary" className="form__custom-button" component={Link} to={"/WeekPlan/"}>
          Login
        </Button>
      </form>
    </div>
  );

}
export default Login

