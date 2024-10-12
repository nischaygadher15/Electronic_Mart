import React, { useEffect } from "react";
import style from "./Payment.module.css";
import payPal from "../assets/paypal.png";

const Payment = () => {
  let popularBanks = [
    "Syndicate Bank",
    "Bank of Baroda",
    "Canara Bank",
    "ICICI Bank",
    "State Bank Of India",
  ];

  let otherBanks = [
    "Abhyudaya Co-operative Bank",
    "Ahmedabad District Cooperative Bank",
    "Andhra Pragathi Grameena Bank",
    "APNA Sahakari Bank ltd",
    "Andhra Pradesh Grameena Vikas Bank - IMPS",
    "AIRTEL PAYMENTS BANK LIMITED",
    "Arvind Sahakari Bank Ltd",
    "Aryavart Bank",
    "AU SMALL FINANCE BANK",
    "Axis Bank",
    "Bandhan Bank limited",
    "Baroda Gujarat Gramin Bank",
    "Bangiya Gramin Vikash Bank",
    "THE BHARAT CO OPERATIVE BANK MUMBAI LTD",
    "The Banaskantha District Central Co-Op. Bank Ltd.",
    "Baroda Rajasthan Kshetriya Gramin Bank",
    "Bhagini Nivedita Sahakari Bank Ltd,Pune",
    "Bank of Baroda",
    "Bank Of India",
    "Bank of Maharashtra",
    "Baroda U.P. Bank (Erstwhile Baroda Uttar Pradesh Gramin Bank)",
    "Central Bank of India",
    "CHAITANYA GODAVARI GRAMEENA BANK",
    "CHHATTISGARH RAJYA GRAMIN BANK",
    "Canara Bank",
    "The Cosmos Co-Operative Bank Ltd",
    "City Union Bank",
    "DBS Bank India Limited",
    "DCB Bank Ltd",
    "Dhanalakshmi Bank",
    "Dombivli Nagarik Sahakari Bank",
    "ESAF SMALL FINANCE BANK LTD",
    "EQUITAS SMALL FINANCE BANK",
    "Federal Bank",
    "Fino Payments Bank Limited FIP",
    "AU Small Finance Bank (Erstwhile Fincare)",
    "G P Parsik Sahakari Bank Ltd",
    "The Gujarat State Co-op Bank Ltd",
    "The Gayatri Co-operative Urban Bank Ltd.",
    "HDFC Bank",
    "HIMACHAL PRADESH GRAMIN BANK",
    "The Himachal Pradesh State Cooperative Bank Ltd.",
    "HSBC Bank",
    "The Hasti Co-op. Bank Ltd.",
    "Indusind Bank M2P",
    "ICICI Bank",
    "IDBI Bank",
    "IDFC First Bank Ltd",
    "Indusind Bank",
    "Indian Bank",
    "Indian Overseas Bank",
    "INDIA POST PAYMENTS BANK LIMITED",
    "The Jampeta Co operative Urban Bank Ltd",
    "Jogindra Central Cooperative Bank Ltd",
    "JALGAON JANATA SAHAKARI BANK LTD JALGAON",
    "The Jammu & Kashmir Bank Limited",
    "JAMMU AND KASHMIR GRAMEEN BANK",
    "Janaseva Sahakari Bank ltd",
    "Janata Sahakari Bank",
    "JANA SMALL FINANCE BANK LTD",
    "The Kaira District Central Co-Op. Bank Ltd.",
    "Kolhapur Dist. Central Co-Op. Bank Ltd.",
    "Kalyan Janata Sahakari Bank",
    "The Kalupur Commercial Co-Op Bank Ltd",
    "KERALA GRAMIN BANK",
    "Kotak Mahindra Bank",
    "THE KANGRA CENTRAL CO-OPERATIVE BANK LTD",
    "The Karnavati Co operative Bank Ltd",
    "The Kerala State Co-operative Bank Ltd",
    "Karnataka Bank",
    "Karur Vysya Bank",
    "Karnataka Vikas Grameena Bank",
    "Maharashtra Gramin Bank",
    "MEGHALAYA RURAL BANK",
    "Mehsana Urban Co-operative Bank",
    "MIZORAM RURAL BANK",
    "THE NAWANAGAR CO OPERATIVE BANK LTD",
    "The Nasik Merchants Cooperative Bank Ltd",
    "NSDL Payments Bank Limited",
    "The Nainital Bank Ltd",
    "PASCHIM BANGA GRAMIN BANK",
    "The Panchmahal District Co Operative Bank Ltd",
    "Karnataka Gramin Bank (Erstwhile Pragathi Krishna Gramin Bank)",
  ];

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
    toggleTab("tab3", "c3");
  }, []);

  return (
    <div className="paymentPage">
      {/* <================================= Payment Header =================================>   */}
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
            {/* COD CONTENT */}
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

            {/* CREDIT/ DEBIT CARD CONTENT */}
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

            {/* NET BANKING CONTENT */}
            <div className={`${style.tabContent} col-12`} id="c2">
              <h4 className="mb-4 fw-bold">Select From Popular Banks</h4>
              <ul className="list-unstyled ms-3">
                {popularBanks.map((b, inx) => {
                  return (
                    <li key={inx} className="mb-3">
                      <label htmlFor={`selectedBank${inx}`}>
                        <input
                          type="radio"
                          name="selectedBank"
                          id={`selectedBank${inx}`}
                          className="form-check-input me-2"
                        />
                        <span style={{ fontSize: "18px" }}>{b}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <h4 className="mt-5 fw-bold">Or Select Other Bank</h4>
              <select name="otherBank" className="form-select my-4">
                {otherBanks.map((ob, inx) => {
                  return (
                    <option value={ob} key={`ob${inx}`}>
                      {ob}
                    </option>
                  );
                })}
              </select>
              <input
                type="submit"
                value="MAKE A PAYMENT"
                className={style.paymentBtn}
              />
            </div>

            {/* PAYPAL CONTENT */}
            <div className={`${style.tabContent} col-12`} id="c3">
              <div className="row">
                <div className="col">
                  <img
                    src={payPal}
                    alt="Paypal Image"
                    style={{ width: "60%" }}
                  />
                  <p className="text-center my-4" style={{ fontSize: "18px" }}>
                    Important: You will be redirected to PayPal's website <br />{" "}
                    to securely complete your payment.
                  </p>
                  <input
                    type="submit"
                    value="CHECKOUT VIA PAYPAL"
                    className={style.paymentBtn}
                  />
                </div>
                <div className="col">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
