import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { mealContext } from '../providers/MealProvider'

const Payment = function (props) {

  const [payment, setPayment] = useState([{}])
  const { weekNumber } = useContext(mealContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`/api/payment/${weekNumber}`)
      .then((res) => {
        setPayment(res.data.arrayOfItems);
        setTotal(res.data.priceTotal);
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>

      <header className="mainPageHeaders">
        {/* <img className="headerIcon" src={pantryListIcon} /> */}
        Purchase Items
      </header>
      <body className="paymentHolder">

        {payment.length > 0 ?
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="paymentColumn">Ingredient</th>
                  <th scope="col" className="paymentColumn">Amount</th>
                  <th scope="col" className="paymentColumn">Measure</th>
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
              Total: $ {total}
            </div>
          </>
          :
          <div>You have no grocery items to buy :(</div>
        }
      </body>
    </>
  );

}
export default Payment

