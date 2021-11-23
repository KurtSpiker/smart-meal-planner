import React from 'react';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

export default function Load() {
  return (
    
    <ButtonBase component={Link} to={"/"}>
      <AddIcon />
    </ButtonBase>
    
  );
};