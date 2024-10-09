import React from "react";
import style from "./CheckOut.module.css";
import p1 from "../assets/si1.png";
import { FaRegTrashCan } from "react-icons/fa6";
import products from "../JSON_Data/ProductsList.js";

const CheckOut = () => {
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
                        <button className={`btn ${style.decQtyBtn}`}>-</button>
                        <input type="text" className={style.prdQty} />
                        <button className={`btn ${style.incQtyBtn}`}>+</button>
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

        {/* Order Details */}
        <form className="orderDetail">
          <div className="mb-3">
            <input type="text" className="form-control" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
