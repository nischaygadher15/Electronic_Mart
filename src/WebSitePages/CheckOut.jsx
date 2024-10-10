import React from "react";
import style from "./CheckOut.module.css";
import p1 from "../assets/si1.png";
import { FaRegTrashCan } from "react-icons/fa6";
import products from "../JSON_Data/ProductsList.js";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaRegHandPointRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  let nvg = useNavigate();
  return (
    <div className={style.checkOutWrapper}>
      {/* <================================= Title of Page =================================>   */}
      <div className={style.productTitle}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          <span className="fs-1">Checkout</span> Page
        </h2>
        <p className="mb-0 fw-semibold">HOME&nbsp; {">"} &nbsp;CHECKOUT</p>
      </div>

      {/* <================================= Cart Table =================================>   */}
      <div className={style.cartTableWrapper}>
        <h2 className="mb-4">Your shopping cart contains: 3 Products</h2>
        <table className={style.checkOutTable}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sr No.</th>
              <th style={{ width: "40%" }}>Product Name</th>
              <th style={{ width: "20%" }}>Quantity</th>
              <th style={{ width: "20%" }}>Price</th>
              <th style={{ width: "10%" }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, inx) => {
              if (inx < 3) {
                return (
                  <tr>
                    <td>{inx + 1}</td>
                    <td>
                      <div className="d-flex align-items-center prdDetail">
                        <img
                          src={p.image[0]}
                          alt="Product Image"
                          className={`img-fluid me-3 ${style.prdImage}`}
                        />
                        <p className="mb-0">{p.title.substring(0, 30)}</p>
                      </div>
                    </td>
                    <td>
                      <div className={style.prdQtyBox}>
                        <button className={`btn ${style.decQtyBtn}`}>
                          <FaMinus />
                        </button>
                        <input type="number" className={style.prdQty} />
                        <button className={`btn ${style.incQtyBtn}`}>
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>&#8377;1500</td>
                    <td>
                      <button
                        className={`btn btn-danger ${style.prdDeleteBtn}`}
                      >
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return;
              }
            })}
          </tbody>
        </table>

        <div className="row gx-5">
          <div className="col-8">
            {/* Shipping Details */}
            <form className={style.orderForm}>
              <div className="mb-4">
                <h3>SHIPPING ADDRESS</h3>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 1"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 2 (Optional)"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 1"
                />
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="col">
                  <select className="form-select">
                    <option selected>Country</option>
                    <option value="ind">India</option>
                    <option value="usa">USA</option>
                    <option value="rus">Russia</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="col-4">
            {/* Order Summary */}
            <h3>ORDER SUMMARY</h3>
            <table className={`w-100 my-3 ${style.subTotal}`}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "left" }}>Subtotal</td>
                  <td style={{ textAlign: "right" }}>&#8377;5000.00</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>Taxes</td>
                  <td style={{ textAlign: "right" }}>&#8377;90.00</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>Shipping Charge</td>
                  <td style={{ textAlign: "right" }}>&#8377;40.00</td>
                </tr>
                <tr
                  style={{
                    borderTop: "2px solid rgba(0,0,0,0.5)",
                    fontSize: "20px",
                  }}
                >
                  <td style={{ textAlign: "left" }}>TOTAL</td>
                  <td style={{ textAlign: "right" }}>&#8377;5103.00</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className={style.makePaymentBtn}
              onClick={() => nvg("/payment")}
            >
              MAKE A PAYMENT
              <FaRegHandPointRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
