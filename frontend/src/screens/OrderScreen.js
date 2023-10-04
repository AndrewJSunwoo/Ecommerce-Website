import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="orderid">
        <h1>Order {order._id}</h1>
      </div>
      <div className="row top">
        <div className="col-order">
          <ul>
            <li>
              <div className="card card-order">
                <div className="order-details">
                  <div className="order-title">Shipping</div>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                    <br />
                  </p>
                  <p>
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="card card-order">
                <div className="order-details">
                  <div className="order-title">Payment</div>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="card card-order">
                <div className="orders">
                  <div className="order-title">Order Items</div>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <Link to={`/product/${item.product}`}>
                        <div className="row-orders">
                          <div className="detail">{item.name}</div>
                          <div className="detail-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                            <div className="detail-3">
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-summary">
          <div className="order-title summary">Order Summary</div>
          <div className="card card-order-2">
            <div className="order-summary-1">
              <li>
                <div>
                  <div className="order-detail">Subtotal</div>
                  <div className="order-detail">Shipping</div>
                  <div className="order-detail">Tax</div>
                  <div className="order-detail">
                    <span class="boldText">Order Total</span>
                  </div>
                </div>
              </li>
              <div className="paypalpayment">
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}

                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                    <button
                      type="button"
                      className="primary block"
                      onClick={deliverHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )}
              </div>
            </div>
            <div className="order-summary-3">
              <li>
                <div className="order-detail">
                  ${order.itemsPrice.toFixed(2)}
                </div>
                <div className="order-detail">
                  ${order.shippingPrice.toFixed(2)}
                </div>
                <div className="order-detail">${order.taxPrice.toFixed(2)}</div>
                <div className="order-detail">
                  <span class="boldText">${order.totalPrice.toFixed(2)}</span>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
