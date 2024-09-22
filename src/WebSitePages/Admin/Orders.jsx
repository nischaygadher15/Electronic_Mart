import React from "react";
import style from "../Admin/Orders.module.css";
import users from "../../JSON_Data/usersList.js";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import AdminFooter from "../Admin/AdminFooter";
import { FaCcMastercard } from "react-icons/fa";

const Orders = () => {
  return (
    <>
      <>
        <div style={{ padding: "24px", marginBottom: "100px" }}>
          <div className={style.orderHeader}>
            <span className="fw-bold">ORDERS</span>
            <span>{`Ecommerce > Orders`}</span>
          </div>
          <div className={`${style.ordersWrapper} shadow`}>
            <table className={style.orderTb}>
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "3%" }}>
                    <input type="checkbox" className="form-check-input" />
                  </th>
                  <th style={{ width: "8%" }}>ORDER ID</th>
                  <th style={{ width: "15%" }}>BILLING NAME</th>
                  <th style={{ width: "10%" }}>DATE</th>
                  <th style={{ width: "6%" }}>TOTAL</th>
                  <th style={{ width: "10%" }}>PAYMENT STATUS</th>
                  <th style={{ width: "12%" }}>PAYMENT METHOD</th>
                  <th style={{ width: "11%" }}>VIEW DETAILS</th>
                  <th style={{ width: "10%", textAlign: "center" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  return (
                    <tr>
                      <td className="text-center">
                        <input type="checkbox" className="form-check-input" />
                      </td>
                      <td>SK2540</td>
                      <td>
                        <img
                          src={u.picture.thumbnail}
                          className={`${style.userPic} img-fluid`}
                        />
                        <span>
                          {`${u.name.first} ${u.name.last}`.substring(0, 12)}
                        </span>
                      </td>
                      <td>{new Date(Date.now()).toLocaleDateString()}</td>
                      <td>&#8377;999</td>
                      <td>chargeback</td>
                      <td>
                        <p className="mb-0 d-flex align-items-center">
                          <FaCcMastercard className="me-2" />
                          <span>Mastercard</span>
                        </p>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary text-center"
                          style={{
                            fontSize: "14px",
                            borderTopLeftRadius: "50px",
                            borderBottomLeftRadius: "50px",
                            borderTopRightRadius: "50px",
                            borderBottomRightRadius: "50px",
                          }}
                        >
                          View Details
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button className="btn text-primary me-1">
                          <MdEdit />
                        </button>
                        <button className="btn text-danger">
                          <FaRegTrashCan />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <AdminFooter />
      </>
    </>
  );
};

export default Orders;
