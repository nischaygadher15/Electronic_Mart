import React, { useContext, useEffect } from "react";
import Header from "../Components/Navbar/Header";
import style from "../WebSitePages/Cart.module.css";
import { ProductId } from "../Components/Navbar/ProductContext";
import rupay from "../assets/rupay.jpg";
import visa from "../assets/visa_logo.png";
import mastercard from "../assets/Mastercard_Logo.png";
import paypal from "../assets/PayPal-Logo.png";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  decQty,
  emptyCart,
  incQty,
  removeItem,
  saveUrl,
} from "../Store/cartSlice";
import { ACTIVE_USER, selectUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);
  let cart = useSelector((state) => state.cart.mycart);
  let cartTotal = useSelector((state) => state.cart.cartTotal);
  let nvg = useNavigate();

  let { showLoader, isLoading } = useContext(ProductId);

  let emptyThisCart = async () => {
    await showLoader(1);
    dispatch(emptyCart());
  };

  let handleCheckOut = () => {
    if (activeUser.isLoggedIn) {
      alert("redirect to CheckOut page");
    } else {
      dispatch(saveUrl(window.location.href));
      nvg("/login");
    }
  };

  return (
    <>
      <div
        className="row justify-content-evenly mb-5"
        style={{ padding: "0px 40px" }}
      >
        <h1 style={{ padding: "20px 0px", marginBottom: "0px" }}>Your Cart</h1>
        <div className="col-8 rounded" id={style.productBox}>
          <table className="table" id={style.productTable}>
            <thead>
              <tr>
                <th scope="col" style={{ width: "50%" }}>
                  PRODUCT
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  QUANTITY
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  PRICE
                </th>
                <th
                  scope="col"
                  style={{ width: "15%" }}
                  className="text-center"
                >
                  <button
                    className="bg-danger rounded text-white"
                    style={{
                      // width: "30px",
                      height: "30px",
                      border: "none",
                    }}
                    onClick={() => emptyThisCart()}
                  >
                    Remove All
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.length == 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-danger fw-bold">
                    <h1 style={{ marginBottom: "0px" }}>NO PRODUCT IN CART</h1>
                  </td>
                </tr>
              )}
              {cart.map((p, inx) => {
                return (
                  <tr key={inx}>
                    <td>
                      <div className={`${style.productImgBox} py-2`}>
                        <img
                          src={Object.values(p.productPic[0])[0]}
                          alt={`${p.id} image`}
                          style={{ width: "70px", height: "70px" }}
                        />
                        <p className={`${style.productText} m-0`}>
                          {p.productName}
                        </p>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <button
                        className="rounded bg-primary fw-bolder"
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "none",
                        }}
                        onClick={() => dispatch(incQty(p))}
                      >
                        +
                      </button>
                      <input
                        type="text"
                        value={p.qty}
                        className="text-center"
                        style={{
                          width: "30px",
                          height: "30px",
                          margin: "0px 5px",
                        }}
                      />
                      <button
                        className="rounded bg-primary fw-bolder"
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "none",
                        }}
                        onClick={() => dispatch(decQty(p))}
                      >
                        -
                      </button>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {`$${p.productPrice}`}{" "}
                    </td>
                    <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      <button
                        className="bg-danger rounded text-white"
                        style={{
                          // width: "30px",
                          height: "30px",
                          border: "none",
                        }}
                        onClick={() => dispatch(removeItem(p))}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-3 rounded" id={style.checkOutSummary}>
          <h3 className="">Checkout Summary</h3>
          <h4>
            {`Total Price: $${
              parseFloat(cartTotal).toFixed(2) < 0
                ? parseFloat(cartTotal).toFixed(2) * -0
                : parseFloat(cartTotal).toFixed(2)
            }`}
          </h4>
          <button className="btn btn-warning" onClick={handleCheckOut}>
            Proceed to Checkout
          </button>
          <hr />
          <div className="payPlform">
            <img
              src={rupay}
              alt="rupay logo"
              style={{ width: "40px", height: "30px" }}
              className="rounded mx-1`"
            />
            <img
              src={visa}
              alt="visa logo"
              style={{ width: "40px", height: "30px" }}
              className="rounded mx-1"
            />
            <img
              src={mastercard}
              alt="mastercard logo"
              style={{ width: "40px", height: "30px" }}
              className="rounded mx-1"
            />
            <img
              src={paypal}
              alt="paypal log"
              style={{ width: "40px", height: "30px" }}
              className="rounded mx-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
