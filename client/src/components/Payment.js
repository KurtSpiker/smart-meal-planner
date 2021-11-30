import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { mealContext } from '../providers/MealProvider'
import purchaseHeaderIcon from './images/purchase.png'
import { AddIngredientButton } from '../customstyles/AddIngredientButton';
import { Backdrop, CircularProgress, stepConnectorClasses } from '@mui/material';
import AlertDialog from '../customstyles/AlertDialog';

const Payment = function (props) {
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState([{}])
  const { weekNumber } = useContext(mealContext);
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/payment/${weekNumber}`)
      .then((res) => {
        setPayment(res.data.arrayOfItems);
        setTotal(res.data.priceTotal);
        setLoading(false)
        console.log("THIS IS PAYMENT LENGTH", payment.length)
        console.log(payment)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])


  const paying = function () {
    setLoading(true);

    setTimeout(() => {
      setPaid(true);
      setLoading(false);

    }, 2000);
  }

  return (

    <>
      {loading && (
        <Backdrop
          open={true}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && (
        <>
          <header className="mainPageHeaders">
            <img className="headerIcon" src={purchaseHeaderIcon} />
            Purchase Items
          </header>
          <body className="paymentHolder">
            {(payment.length > 0 && paid === false) &&
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="paymentColumn">Item</th>
                      <th scope="col" className="paymentColumn">Quantity</th>
                      <th scope="col" className="paymentColumn">Unit</th>
                      <th scope="col" className="paymentColumn">Price</th>
                    </tr>
                  </thead>
                  <tbody>

                    {payment &&
                      payment.map((paymentItem) => {
                        return <tr>
                          <td className="individualPaymentEntries" style={{ "text-transform": "capitalize" }}>
                            {paymentItem.name}
                          </td>
                          <td className="individualPaymentEntries">
                            {paymentItem.amount}
                          </td>
                          <td className="individualPaymentEntries">
                            {paymentItem.measure}
                          </td>
                          <td className="individualPaymentEntries">
                            $ {paymentItem.cost}
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table >
                <div className="paymentTotal">
                  <AlertDialog total={total} paying={paying}></AlertDialog>
                </div>
              </>
            }

            {payment.length < 1 &&
              <div>You have no grocery items to buy :(</div>
            }
            {(payment.length > 0 && paid === true) && <div>Thanks for your purchase! A receipt has been emailed to you!</div>}
          </body>
        </>
      )}
    </>

  );
}
export default Payment

