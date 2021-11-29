import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';


export const AddIngredientButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  color: "rgb(78, 0, 0)",
  backgroundColor: "rgb(247,191,80,0.65)",
  '&:hover': {
    backgroundColor: "#f7bf50",
  },
  height: "56px"
}));

export const AddIngredientButtonAlt = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  color: "rgb(78, 0, 0)",
  backgroundColor: "rgb(247,191,80,0.65)",
  '&:hover': {
    backgroundColor: "#d1a03f",
  },
  height: "56px"
}));