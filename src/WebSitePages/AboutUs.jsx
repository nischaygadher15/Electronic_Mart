import React from "react";
import style from "./AboutUs.module.css";
import { ImCheckboxChecked } from "react-icons/im";
import years from "../assets/about2.png";
import { RiDoubleQuotesL } from "react-icons/ri";
import c1 from "../assets/testi1.jpg";
import c2 from "../assets/testi2.jpg";
import c3 from "../assets/testi3.jpg";

const AboutUs = () => {
  let cusImages = [c1, c2, c3];
  return (
    <>
      {/* About Us Header */}
      <div className={style.productTitle}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          <span className="me-2">Few words about</span>
          <span className="fs-1">Us</span>
        </h2>
        <p className="mb-0 fw-semibold">HOME&nbsp; {">"} &nbsp;CONTACT US</p>
      </div>

      {/* Best Success Part */}
      <div className={`row ${style.bestSuccess}`}>
        <div className="col">
          <div className={style.leftPart}>
            <h2 style={{ fontSize: "35px" }}>
              <span className="fw-bold" style={{ fontSize: "40px" }}>
                We Work
              </span>{" "}
              for your best Success
            </h2>
            <p className="my-4">
              Consectetur adipiscing elit. Aliquam sit amet efficitur
              tortor.Uspendisse efficitur orci urna. In et augue ornare, tempor
              massa in, luctus sapien.
            </p>
            <ul className="list-unstyled">
              <li>
                <ImCheckboxChecked
                  className="me-2"
                  style={{ color: "#FDB03D" }}
                />
                Ut enim ad minim veniam
              </li>
              <li>
                <ImCheckboxChecked
                  className="me-2"
                  style={{ color: "#FDB03D" }}
                />
                Quis nostrud exercitation ullamco laboris
              </li>
              <li>
                <ImCheckboxChecked
                  className="me-2"
                  style={{ color: "#FDB03D" }}
                />
                Nisi ut aliquip ex ea commodo consequat
              </li>
            </ul>
            <button type="button" className={style.productBtn}>
              VIEW OUR PRODUCTS
            </button>
          </div>
        </div>
        <div className="col">
          <div className={style.rightPart}>
            <img src={years} alt="28 Years" className="img-fluid w-100" />
          </div>
        </div>
      </div>

      {/* Customers Opinion */}
      <div className={style.cusOpinionBox}>
        <h2 style={{ fontSize: "35px" }}>
          Our
          <span className="fw-bold" style={{ fontSize: "40px" }}>
            &nbsp;Customer&nbsp;
          </span>
          says
        </h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque, <br />
          eaque ipsa quae ab illo inventore.
        </p>
        <div className="cusOpinions mt-5 row">
          {cusImages.map((c, inx) => {
            return (
              <div className="col" key={`csOpinions${inx}`}>
                <div className={style.cusCard}>
                  <RiDoubleQuotesL
                    style={{ color: "#fdb03d", fontSize: "30px" }}
                  />
                  <p style={{ marginLeft: "30px" }}>
                    Nam libero tempore, cum soluta nobis est eligendi optio
                    cumque nihil impedit."
                  </p>
                  <div className="d-flex gap-3">
                    <img
                      src={c}
                      alt="Customet Image"
                      className={style.cusCardImg}
                    />
                    <div className="cusNameBox">
                      <p className="fs-5 fw-bold mb-1">Petey Cruis</p>
                      <small>Caption Here</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
