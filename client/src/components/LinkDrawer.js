import React, { Component, useEffect, useState, useContext } from "react";
import { Grid, Toolbar, Drawer } from '@mui/material';
import Button from '@mui/material/Button';

import Logo from './images/Fork it Over-logos.jpeg'
import loginButtonIcon from './images/login.png'
import recipeSearchIcon from './images/recipeSearch.png'
import logoutIcon from './images/logout.png'
import myWeekIcon from './images/myweek.png'
import favouritesIcon from './images/favourites.png'
import groceryListIcon from './images/grocery.png'
import pantryIcon from './images/pantry.png'

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
        alignItems="center"
        // paddingRight={4}
        marginTop={7}
      >
        {!cookie && <Button id="linkDrawerButton" className="loginButton" component={Link} to={"/login"}>
          <img className="buttonIcon" src={loginButtonIcon} />
          Login
        </Button>}
        {cookie && <Button id="linkDrawerButton" className="button-my-week" component={Link} to={"/WeekPlan/"}>
          <img className="buttonIcon" src={myWeekIcon} />
          My Week
        </Button>}
        {cookie && <Button id="linkDrawerButton" className="favouritesButton" component={Link} to={"/favourites"}>
          <img className="buttonIcon" src={favouritesIcon} />
          Favourites
        </Button>}
        <Button id="linkDrawerButton" className="recipeSearchButton" component={Link} to={"/Recipe_search"}>
          <img className="buttonIcon" src={recipeSearchIcon} />
          Recipes
        </Button>
        {cookie && <Button id="linkDrawerButton" className={"pantryListButton"} component={Link} to={"/PantryList"} >
          <img className="buttonIcon" src={pantryIcon} />
          Pantry
        </Button>}
        {cookie && <Button id="linkDrawerButton" component={Link} to={"/GroceryList"}>
          <img className="buttonIcon" src={groceryListIcon} />
          Grocery List
        </Button>}
        {cookie && <Button id="linkDrawerButton" className="logoutButton" onClick={() => { logout(); setCookie(false); }} component={Link} to={"/login"}><img className="buttonIcon" src={logoutIcon} />
          Logout
        </Button>}
      </Grid>
    </Drawer >
  );
}

export default LinkDrawer;