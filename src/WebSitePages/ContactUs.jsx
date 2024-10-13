import React from "react";
import style from "./ContactUs.module.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { RiMailOpenFill } from "react-icons/ri";
import { FaHeadphonesAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contactUsWrapper">
      {/* <================================= Contact Us Header =================================>   */}
      <div className={style.title}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          Contact with&nbsp;
          <span className="fs-1">Us</span>
        </h2>
        <p className="mb-0 fw-semibold">HOME&nbsp; {">"} &nbsp;CONTACT US</p>
      </div>
      {/* <================================= Contact Us Form =================================>   */}
      <div className={`row justify-content-evenly ${style.contactUsContent}`}>
        <div className="col-5">
          <h2>Connect Us</h2>
          <ul className="list-unstyled">
            <li className="d-flex gap-3 mb-4 ">
              <FaGlobeAmericas
                className="mt-2 fs-5"
                style={{ color: "#FDB03D" }}
              />
              <div className="contText">
                <p className="fw-semibold fs-5 mb-1">Company Address</p>
                <a href="#" className={style.contactNum}>
                  10001, 5th Avenue, 12202 street, USA.
                </a>
              </div>
            </li>
            <li className="d-flex gap-3 mb-4 ">
              <IoIosCall className="mt-2 fs-5" style={{ color: "#FDB03D" }} />
              <div className="contText">
                <p className="fw-semibold fs-5 mb-1">Call Us</p>
                <a href="tel:+1(21) 112 7368" className={style.contactNum}>
                  +1(21) 112 7368
                </a>
              </div>
            </li>
            <li className="d-flex gap-3 mb-4 ">
              <RiMailOpenFill
                className="mt-2 fs-5"
                style={{ color: "#FDB03D" }}
              />
              <div className="contText">
                <p className="fw-semibold fs-5 mb-1">Email Us</p>
                <a href="mailto:+1(21) 112 7368" className={style.contactNum}>
                  example@mail.com
                </a>
              </div>
            </li>
            <li className="d-flex gap-3 mb-4 ">
              <FaHeadphonesAlt
                className="mt-2 fs-5"
                style={{ color: "#FDB03D" }}
              />
              <div className="contText">
                <p className="fw-semibold fs-5 mb-1">Customer Support</p>
                <a href="mailto:+1(21) 112 7368" className={style.contactNum}>
                  info@support.com
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <form className={style.contactUsForm}>
            <div className="mb-3">
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your Name*"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Your Email*"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="subject"
                className="form-control"
                placeholder="Subject*"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="website"
                className="form-control"
                placeholder="Website URL*"
              />
            </div>

            <div className="mb-4">
              <textarea
                id="message"
                className="form-control"
                rows="5"
                placeholder="Type your message here*"
              ></textarea>
            </div>

            <input
              type="submit"
              value="SEND MESSAGE"
              className={style.sentMsg}
            />
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.60648832726!2d-0.4312474072555601!3d51.528607007953084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1728771066027!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: "0", width: "100%" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
