import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
export default function CartScreen(props) {
  //reads product id
  const productId = props.match.params.id;
  //reads product qty
  //returns qty={qty}
  //split('=')[1] = get the second value
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //if product id exists, call add to cart action to add to the cart
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // redirect to shipping go to sign in page...aftre signin redirect to shipping screen
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="cart-error">
            <MessageBox>
              Cart is empty.
              <Link to="/"> Go Shopping</Link>
            </MessageBox>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <div key={item.product}>
                <div className="cart-card">
                  <img src={item.image} alt={item.name} className="small"></img>
                  <div className="cartview-1">
                    <div className="cartview-3">
                      <Link to={`/product/${item.product}`}>
                        <strong>{item.name}</strong>
                      </Link>
                      <button
                        className="button-delete"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="cartview-3">${item.price}</div>
                    <div className="cartview-3">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>

        <div className="cart-price">
        <ul>
          <li>
            <div className="cart-total">
              {/*calculates the number of items and total price*/}
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </div>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="button-checkout"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
