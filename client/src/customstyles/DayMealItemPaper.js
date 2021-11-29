import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const DayMealItemPaper = styled(Paper)(({ theme }) => ({
  p: 2,
  margin: 'auto',
  maxWidth: 500,
  flexGrow: 1,
  borderRadius: '20px',
  '&:hover': {
    boxShadow: "rgba(0, 0, 0, 0.45) 5px 5px",
    backgroundColor: "#f1e683"
  },
  height: "150px",
  border: "7px double rgb(231, 179, 7)"
}));