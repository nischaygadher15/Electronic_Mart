import React, { useEffect } from "react";
import style from "./Payment.module.css";

const Payment = () => {
  let toggleTab = (tab, con) => {
    // Reset Tabs
    let tabs = ["tab0", "tab1", "tab2", "tab3"];
    let contents = ["c0", "c1", "c2", "c3"];
    tabs.forEach((t) => {
      if (t == tab)
        document.getElementById(t).classList.add(`${style.activeTab}`);
      else document.getElementById(t).classList.remove(`${style.activeTab}`);
    });
    contents.forEach((c) => {
      if (c == con) document.getElementById(c).style.display = "block";
      else document.getElementById(c).style.display = "none";
    });
  };

  useEffect(() => {
    toggleTab("tab1", "c1");
  }, []);

  return (
    <div className="paymentPage">
      <div className={style.productTitle}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          <span className="fs-1">Payment</span> Page
        </h2>
        <p className="mb-0 fw-semibold">HOME&nbsp; {">"} &nbsp;PAYMENT</p>
      </div>

      <div className={style.paymentMethods}>
        {/* <================================= Payment Methods Tabs =================================>   */}
        <h1 className="text-center fw-bold mb-5">Payment</h1>
        <div className={style.methodsBox}>
          <div className="row gx-3">
            <div className="col">
              <div
                className={`${style.tab} ${style.activeTab}`}
                onClick={() => toggleTab("tab0", "c0")}
                id="tab0"
              >
                Cash on delivery (COD)
              </div>
            </div>
            <div className="col">
              <div
                className={style.tab}
                onClick={() => toggleTab("tab1", "c1")}
                id="tab1"
              >
                Credit/Debit
              </div>
            </div>
            <div className={`col`}>
              <div
                className={style.tab}
                onClick={() => toggleTab("tab2", "c2")}
                id="tab2"
              >
                Net Banking
              </div>
            </div>
            <div className={`col`}>
              <div
                className={style.tab}
                onClick={() => toggleTab("tab3", "c3")}
                id="tab3"
              >
                Paypal Account
              </div>
            </div>
          </div>
          <div className="row">
            <div className={`${style.tabContent} col-12`} id="c0">
              <h4 className="mb-4">COD</h4>
              <p className="d-flex align-items-center mb-4">
                <input
                  type="checkbox"
                  style={{ width: "16px", height: "16px", marginRight: "10px" }}
                />
                We also accept Credit/Debit card on delivery. Please Check with
                the agent.
              </p>
              <form>
                <input
                  type="submit"
                  value="PLACE AN ORDER"
                  className={style.paymentBtn}
                />
              </form>
            </div>
            <div className={`${style.tabContent} col-12`} id="c1">
              <form className={style.cdCardForm}>
                <div className="mb-3">
                  <label htmlFor="cardName" className="from-label">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    className="form-control"
                    placeholder="Nischay K Gadher"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardName" className="from-label">
                    Card Number
                  </label>
                  <input
                    type="number"
                    id="cardNumber"
                    className="form-control"
                    placeholder="&#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022;"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardName" className="from-label">
                    CVV
                  </label>
                  <input
                    type="number"
                    id="cvv"
                    className="form-control"
                    placeholder="&#x2022;&#x2022;&#x2022;"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="cardName" className="from-label">
                    Expiration Date
                  </label>
                  <input
                    type="month"
                    id="expiryDate"
                    className="form-control"
                    min="2000-01"
                    max="2030-01"
                    value="2000-01"
                  />
                </div>

                <input
                  type="submit"
                  value="MAKE A PAYMENT"
                  className={style.paymentBtn}
                />
              </form>
            </div>
            <div className={`${style.tabContent} col-12`} id="c2">
              Net Banking
            </div>
            <div className={`${style.tabContent} col-12`} id="c3">
              Paypal Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
