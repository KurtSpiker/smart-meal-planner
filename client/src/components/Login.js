import { React, useState } from "react";
import { TextField, Button } from "@mui/material";
import Logo from './Fork it Over-logos_transparent.png'

const Login = function (props) {

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

        <Button type="button" color="primary" className="form__custom-button">
          Login
        </Button>
      </form>
    </div>
  );

}
export default Login

