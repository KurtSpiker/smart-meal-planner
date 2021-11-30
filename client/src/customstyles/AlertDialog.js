import * as React from 'react';
import { TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { AddIngredientButton } from './AddIngredientButton';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handlePay = () => {
    props.paying();
    setOpen(false);
  };

  return (
    <>
      <AddIngredientButton variant="outlined" onClick={handleClickOpen}>
        PURCHASE ITEMS ( ${props.total} )
      </AddIngredientButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="creditCardInfo">
          <div className="creditCardNumber"><label className="cardField">Card Number</label> <TextField placeholder="1234 4567 4567"></TextField></div>
          <div className="expiryAndSecurityCode">
            <div className="expiry">
              <label className="cardField">Expiry</label>
              <TextField placeholder="MM/YY"></TextField>
            </div>
            <div className="security">
              <label className="cardField">Security Code</label>
              <TextField placeholder="123"></TextField>
            </div>
          </div>
        </div>
        <DialogActions>
          <AddIngredientButton variant="outlined" onClick={handleCancel}>Cancel</AddIngredientButton>
          <AddIngredientButton variant="outlined" onClick={handlePay} autoFocus>
            Pay
          </AddIngredientButton>
        </DialogActions>
      </Dialog>
    </>

  );
}