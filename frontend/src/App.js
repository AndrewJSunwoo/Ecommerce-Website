import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartSceen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProductListScreen from "./screens/ProductListScreen";
import AdminRoute from "./components/AdminRoute";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import {
  listProductCategories,
  listProductGenders,
} from "./actions/productActions";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
    dispatch(listProductGenders());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="nav">
            <Link className="brand" to="/">
              Downtown
            </Link>
            <Link to="/">Home</Link>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li className="dropdown-word">
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li className="dropdown-word">
                    <Link Link to="/orderhistory">
                      Order History
                    </Link>
                  </li>
                  <li className="dropdown-word">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li className="dropdown-word">
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li className="dropdown-word">
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li className="dropdown-word">
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="searchBox">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/gender/:gender"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/gender/:gender/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/gender/:gender/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        </main>
        <footer className="footer-container">
          <div>
            <div className="footer-options">
              <span class="boldText">HELP AND INFORMATION</span>
            </div>
            <div className="footer-options">Help</div>
            <div className="footer-options">Tracker order</div>
            <div className="footer-options">Delivery & returns</div>
            <div className="footer-options">Premier Delivery</div>
          </div>
          <div>
            <div className="footer-options">
              <span class="boldText">ABOUT DOWNTOWN</span>
            </div>
            <div className="footer-options">About Us</div>
            <div className="footer-options">Careers</div>
            <div className="footer-options">Corporate responsibility</div>
            <div className="footer-options">Investors' site</div>
          </div>
          <div>
            <div className="footer-options">
              <span class="boldText">MORE FROM DOWNTOWN</span>
            </div>
            <div className="footer-options">Mobile and Downtown apps</div>
            <div className="footer-options">Marketplace</div>
            <div className="footer-options">Gift Cards</div>
            <div className="footer-options">Black Friday</div>
          </div>
        </footer>
        <div className="footer-copy">
          @ 2021 Downtown
          <div className="footer-policy">
            Privacy & Cookies | Ts&Cs | Accessibility
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
