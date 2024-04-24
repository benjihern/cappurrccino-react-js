import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../services/orderService';
import Title from '../Menu/components/Title/Title';
import OrderItemsList from '../../components/orderItemsList/orderItemsList';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

  if (!order) return;

  return (
    // <>
    //   <h1>THIS IS THE PAYMENT PAGE</h1>
    // </>
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Payment" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}