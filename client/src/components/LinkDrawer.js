import React, { Component } from "react";
import { Grid, Toolbar, Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from './Fork it Over-logos.jpeg'
import { Link } from "react-router-dom";

class LinkDrawer extends Component {
  render() {
    return (
      // backgroundColor: '#ff9800'
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
          <Button component={Link} to={"/login"}>
            Login
          </Button>
          <Button className="button-my-week" component={Link} to={"/WeekPlan/"}>
            My Week
          </Button>
          <Button component={Link} to={"/favourites"}>
            My Favourites
          </Button>
          <Button component={Link} to={"/Recipe_search"}>
            Recipes
          </Button>
          <Button component={Link} to={"/PantryList"} >
            Pantry
          </Button>
          <Button component={Link} to={"/GroceryList"}>
            Grocery List
          </Button>
        </Grid>
      </Drawer >
    );
  }
}

export default LinkDrawer;