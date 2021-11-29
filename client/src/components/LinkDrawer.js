import React, { useEffect, useContext } from "react";
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
import aboutUsIcon from './images/aboutus.png'

import { Link } from "react-router-dom";
import axios from "axios";
import { mealContext } from '../providers/MealProvider'

const LinkDrawer = function (props) {

  const { setCookie, cookie } = useContext(mealContext);

  useEffect(() => {
    setCookie(document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
  }, [])

  const logout = function () {
    setCookie(false);
    axios.get('/api/users/logout')
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Drawer variant="permanent" anchor="left" sx={{ [`& .MuiDrawer-paper`]: { width: "12%", minWidth: "240px", boxSizing: 'border-box', backgroundImage: `url(https://i.ibb.co/0BQtHm0/sidebarmovedleft.jpg)`, backgroundSize: "cover", borderRight: "3px solid rgb(231, 179, 7)", flexShrink: 0 } }}>
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

        {!cookie && <Button id="linkDrawerButton" className="loginButton" component={Link} to={"/Login"}>
          <img className="buttonIcon" alt="loginButton" src={loginButtonIcon} />
          Login
        </Button>}

        <Button id="linkDrawerButton" className="recipeSearchButton" component={Link} to={"/Recipe_search"}>
          <img className="buttonIcon" alt="recipeSearchButton" src={recipeSearchIcon} />
          Recipes
        </Button>

        {cookie &&
          <>
            <Button id="linkDrawerButton" className="button-my-week" component={Link} to={"/WeekPlan/"}>
              <img className="buttonIcon" alt="button-my-week" src={myWeekIcon} />
              My Week
            </Button>

            <Button id="linkDrawerButton" className="favouritesButton" component={Link} to={"/Favourites"}>
              <img className="buttonIcon" alt="favouritesButton" src={favouritesIcon} />
              Favourites
            </Button>

            <Button id="linkDrawerButton" className={"pantryListButton"} component={Link} to={"/PantryList"} >
              <img className="buttonIcon" alt="pantryListButton" src={pantryIcon} />
              Pantry
            </Button>

            <Button id="linkDrawerButton" className={"groceryListButton"} component={Link} to={"/GroceryList"}>
              <img className="buttonIcon" alt="groceryListButton" src={groceryListIcon} />
              Grocery List
            </Button>

            <Button id="linkDrawerButton" className="logoutButton" onClick={() => { logout() }} component={Link} to={"/Login"}>
              <img className="buttonIcon" alt="logoutButton" src={logoutIcon} />
              Logout
            </Button>
          </>
        }

        <Button id="linkDrawerButton" className="aboutUsButton" component={Link} to={"/AboutUs"}>
          <img className="buttonIcon" alt="aboutUsButton" src={aboutUsIcon} />
          About Us
        </Button>

      </Grid>
    </Drawer >
  );
}

export default LinkDrawer;