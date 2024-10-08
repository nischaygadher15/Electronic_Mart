import React, { useState } from "react";
import style from "../Admin/Orders.module.css";
import users from "../../JSON_Data/usersList.js";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import AdminFooter from "../Admin/AdminFooter";
import { FaCcMastercard } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import products from "../../JSON_Data/ProductsList.js";
import { IoMdDownload } from "react-icons/io";

const Orders = () => {
  const [viewDetail, setVDShow] = useState(false);

  const handleClose = () => setVDShow(false);
  const handleShow = () => setVDShow(true);
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
                          className={`btn btn-primary text-center ${style.viewDetailBtn}`}
                          onClick={handleShow}
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

            {/* <===================== View Detail Modal =====================>  */}
            <Modal
              show={viewDetail}
              onHide={handleClose}
              centered
              bsPrefix={style.vdModal}
            >
              <Modal.Header closeButton>
                <Modal.Title className="fs-5">Order Details</Modal.Title>
              </Modal.Header>
              <Modal.Body
                bsPrefix={style.vdModalBody}
                style={{ maxHeight: "450px", overflowY: "auto" }}
              >
                <p>
                  Order Id: <span className="text-primary">#SK2540</span>
                </p>
                <p>
                  Billing Name:
                  <span className="text-primary">Martin Gurley</span>
                </p>
                <table className="productList w-100 mb-4">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Product Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 2).map((p) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <img
                                src={p.image[0]}
                                style={{ width: "50px", height: "60px" }}
                              />
                            </td>
                            <td>
                              <p>{p.title.substring(0, 30)}</p>
                              <p>&#8377; {p.price} X 1</p>
                            </td>
                            <td>&#8377; {p.price}</td>
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <td>Sub Total:</td>
                      <td></td>
                      <td>$400</td>
                    </tr>
                    <tr>
                      <td>Shipping:</td>
                      <td></td>
                      <td>Free</td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td></td>
                      <td>$400</td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <button className="btn btn-primary">
                  Invoice <IoMdDownload />
                </button>
                <button className="btn btn-danger" onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <AdminFooter />
      </>
    </>
  );
};

export default Orders;
