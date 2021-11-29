import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const RecipeCard = styled(Card)(({ theme }) => ({
  maxWidth: 250,
  minWidth: 250,
  marginTop: '25px',
  borderRadius: '25px',
  height: "360px",
  border: "5px double grey",
  '&:hover': {
    boxShadow: "rgba(0, 0, 0, 0.45) 5px 5px"
  },
}));

