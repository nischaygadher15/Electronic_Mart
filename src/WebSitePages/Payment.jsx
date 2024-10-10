import React from "react";
import style from "./Payment.module.css";

const Payment = () => {
  let toggleTab = (inx) => {
    switch (inx) {
      case 0:
      case 1:
      case 2:
      case 3:
    }
  };
  return (
    <div className="paymentPage">
      <div className={style.productTitle}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          <span className="fs-1">Checkout</span> Page
        </h2>
        <p className="mb-0 fw-semibold">HOME&nbsp; {">"} &nbsp;CHECKOUT</p>
      </div>

      <div className={style.paymentMethods}>
        {/* <================================= Payment Methods Tabs =================================>   */}
        <h1 className="text-center">Payment</h1>
        <div className="methodsBox">
          <div className="row">
            <div className="col" onClick={() => toggleTab(0)} name="tab0">
              Cash on delivery (COD)
            </div>
            <div className="col" onClick={() => toggleTab(1)} name="tab1">
              Credit/Debit
            </div>
            <div className="col" onClick={() => toggleTab(2)} name="tab2">
              Net Banking
            </div>
            <div className="col" onClick={() => toggleTab(3)} name="tab3">
              Paypal Account
            </div>
          </div>
          <div className="row">
            <div className="codContent">Cod</div>
            <div className="cdCardContent">Credit Debit Card</div>
            <div className="netBankingContent">Net Banking</div>
            <div className="paypalContent">Paypal Account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
