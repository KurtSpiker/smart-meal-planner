import React, { Component, useEffect, useState, useContext } from "react";
import { Grid, Toolbar, Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from './Fork it Over-logos.jpeg'
import { Link } from "react-router-dom";
import axios from "axios";
import { mealContext } from '../providers/MealProvider'

const LinkDrawer = function (props) {

  const { setCookie, cookie } = useContext(mealContext);

  useEffect(() => {
  }, [cookie])


  const logout = function () {
    axios.get('/api/users/logout')
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Drawer variant="permanent" anchor="left" sx={{ [`& .MuiDrawer-paper`]: { width: "12%", boxSizing: 'border-box', backgroundImage: `url(https://i.ibb.co/0BQtHm0/sidebarmovedleft.jpg)`, flexShrink: 0 } }}>
      <Toolbar />
      <Grid container paddingLeft={4}>
        <Grid item>
          <div>
            <img className="fioLogo" src={Logo} alt="logo" width="85%" />
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-end"
        // paddingRight={4}
        marginTop={7}
      >
        {!cookie && <Button component={Link} to={"/login"}>
          Login
        </Button>}
        {cookie && <Button onClick={() => { logout(); setCookie(false); }} component={Link} to={"/login"}>
          Logout
        </Button>}
        {cookie && <Button className="button-my-week" component={Link} to={"/WeekPlan/"}>
          My Week
        </Button>}
        {cookie && <Button component={Link} to={"/favourites"}>
          My Favourites
        </Button>}
        <Button component={Link} to={"/Recipe_search"}>
          Recipes
        </Button>
        {cookie && <Button component={Link} to={"/PantryList"} >
          Pantry
        </Button>}
        {cookie && <Button component={Link} to={"/GroceryList"}>
          Grocery List
        </Button>}
      </Grid>
    </Drawer >
  );
}

export default LinkDrawer;