import React, { Component } from "react";
import { Grid, Toolbar, Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from './FIO_transparent.png'
import {
  Link
} from "react-router-dom";
class LinkDrawer extends Component {
  render() {
    return (
      <Drawer variant="permanent" anchor="left" sx={{ [`& .MuiDrawer-paper`]: { width: "12%", boxSizing: 'border-box', backgroundColor: '#ff9800', flexShrink: 0 } }}>
        <Toolbar />
        <Grid container paddingLeft={4}>
          <Grid item>
            <div>
              <img src={Logo} alt="logo" width="85%" />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-end"
          paddingRight={4}
          marginTop={20}
        >
          <Button className="button-my-week" component={Link} to={"/WeekPlan/"}>
            My Week
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