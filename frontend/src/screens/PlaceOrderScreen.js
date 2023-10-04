import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row">
        <div className="col-order">
          <ul>
            <li>
              <div className="card card-order">
                <div className="order-details">
                  <div className="order-title">Shipping</div>
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                  </p>
                  <p>
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="card card-order">
                <div className="order-details">
                  <div className="order-title">Payment</div>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="card card-order">
                <div className="orders">
                  <div className="order-title">Order Items</div>
                  {cart.cartItems.map((item) => (
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
              <button
                type="button"
                onClick={placeOrderHandler}
                className="button-placeorder"
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </button>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
            <div className="order-summary-2">
              <li>
                <div className="order-detail">
                  ${cart.itemsPrice.toFixed(2)}
                </div>
                <div className="order-detail">
                  ${cart.shippingPrice.toFixed(2)}
                </div>
                <div className="order-detail">${cart.taxPrice.toFixed(2)}</div>
                <div className="order-detail">
                  <span class="boldText">${cart.totalPrice.toFixed(2)}</span>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
