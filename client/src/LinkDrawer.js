import React, { Component } from "react";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography, Box, Drawer, ListItem, ListItemIcon, List, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Logo from './FIO_transparent.png'
import {
  Route,
  NavLink,
  BrowserRouter,
  Routes,
  Outlet,
  Link
} from "react-router-dom";
class LinkDrawer extends Component {
  render() {
    return (
      <Drawer variant="permanent" anchor="left" sx={{ width: 290, [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box', backgroundColor: '#ff9800' }}}>
          <Toolbar />
          <Grid container paddingLeft={4}>
            <Grid item>
              <div>
                <img src={Logo} width="250"/>
              </div>
            </Grid>
          </Grid>
            <Grid 
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              paddingRight={5}
              marginTop={20}
            >
              <Button component={Link} to={"/stuff"}>
                My Week
              </Button>
              <Button component={Link} to={"/"}>
                Recipes
              </Button>
              <Button size="large" component={Link} to={"/contact"} >
                Pantry
              </Button>
              <Button component={Link} to={"/contact"}>
                Grocery List
              </Button>
            </Grid>
            <Grid container marginTop={80} alignItems="flex-end">
              Currently loggin in as: Admin
            </Grid>
      </Drawer>
    );
  }
}
 
export default LinkDrawer;