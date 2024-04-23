import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { trackOrderById } from '../../services/orderService';
import NotFound from '../Menu/components/NotFound/NotFound';
import classes from './orderTrackPage.module.css';
import DateTime from '../../components/DateTime/DateTime';
import OrderItemsList from '../../components/orderItemsList/orderItemsList';
import Title from '../Menu/components/Title/Title';

export default function OrderTrackPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        orderId &&
        trackOrderById(orderId).then(order => {
            setOrder(order);
        });
    }, []);

    if (!order)
        return <NotFound message="Order Not Found!" linkText="Go To Home Page" />;

    return (
    order && <div className={classes.container}>
        <div className={classes.content}>
            <h1>Order #{order.id}</h1>
            <div className={classes.header}>
                <div>
                    <strong>Date</strong>
                    <DateTime date={order.createdAt} />
                </div>
                <div>
                    <strong>Name</strong>
                    {order.name}
                </div>
                <div>
                    <strong>Status</strong>
                    {order.status}
                </div>
                {order.paymentId && (
                    <div>
                        <strong>Payment ID</strong>
                        {order.paymentId}
                    </div>
                )}
            </div>

            <OrderItemsList order={order} />
        </div>
        {
            order.status === 'NEW' && <div className={classes.payment}>
                <Link to="/payment">Go To Payment</Link>
            </div>

        }
    </div>
  );
}
