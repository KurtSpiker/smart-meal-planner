import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const RecipeCard = styled(Card)(({ theme }) => ({
  maxWidth: 250,
  minWidth: 250,
  marginTop: '25px',
  borderRadius: '25px',
  minHeight: "440px",
  maxHeight: "430px",
  border: "2px solid rgb(231, 179, 7)",
  '&:hover': {
    boxShadow: "rgba(0, 0, 0, 0.45) 5px 5px"
  },
}));