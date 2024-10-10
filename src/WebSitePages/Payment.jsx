import React from "react";
import style from "./Payment.module.css";

const Payment = () => {
  return (
    <div className="paymentPage">
      <div className={style.productTitle}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          <span className="fs-1">Checkout</span> Page
        </h2>
        <p className="mb-0 fw-semibold">HOME&nbsp; {">"} &nbsp;CHECKOUT</p>
      </div>

      <div className={style.payment}>
        {/* <================================= Payment Methods Tabs =================================>   */}

        <ul class="nav nav-tabs" id="myTab" role="tablist">
          {/* Cash on Delivery */}
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="cod"
              data-bs-toggle="tab"
              data-bs-target="#cod-tab-pane"
              type="button"
              role="tab"
              aria-controls="cod-tab-pane"
              aria-selected="true"
            >
              Cash on delivery
            </button>
          </li>

          {/* Credit & Debit Card */}
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="cod"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Credit/Debit Card
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="cod"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="cod"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Home
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="cod-tab-pane"
            role="tabpanel"
            aria-labelledby="cod"
            tabindex="0"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="cdCard-tab-pane"
            role="tabpanel"
            aria-labelledby="cdCard"
            tabindex="0"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="netBanking"
            tabindex="0"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="disabled-tab-pane"
            role="tabpanel"
            aria-labelledby="paypalAcc"
            tabindex="0"
          >
            ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
