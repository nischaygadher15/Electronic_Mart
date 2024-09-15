import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import header from "../Navbar/Header.module.css";
// import { ProductId } from "./ProductContext";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../../Store/userSlice";
import { MdVerticalAlignCenter } from "react-icons/md";
import { searchByWord } from "../../Store/filters";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import style from "../Layouts/DefaultLayout.module.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";

// -----------------------------------------From Header-----------------------------------------------

const DefaultLayout = ({ children }) => {
  let mainWrapper = useRef(null);
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);
  // let { products, showLoader, isLoading } = useContext(ProductId);
  let locBox = useRef(null);
  let cart = useSelector((state) => state.cart.mycart);
  let nvg = useNavigate();
  let myStyle = ({ isActive }) => {
    return {
      color: isActive ? "white" : "black",
      backgroundColor: isActive ? "blue" : "transparent",
      verticalAlign: "middle",
    };
  };

  // <============================ Log In Modal Functions ============================>
  let [logInShow, setLogInShow] = useState(false);
  const handleLogInClose = () => setLogInShow(false);
  const handleLogInShow = () => setLogInShow(true);

  // <============================ Log In Modal Functions ============================>
  let [regShow, setRegShow] = useState(false);
  const handleRegClose = () => setRegShow(false);
  const handleRegShow = () => setRegShow(true);

  // <============================ Log In Modal Functions ============================>
  let [locShow, setLocShow] = useState(false);
  const handleLocClose = () => setLocShow(false);
  const handleLocShow = () => setLocShow(true);

  let logOut = () => {
    showLoader(1);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(ACTIVE_USER({ usrName: "Guest", isLoggedIn: false }));
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    nvg("/");
  };

  let inputStyle = {
    backgroundColor: "#f4f4f4",
    padding: "12px",
    fontSize: "18px",
  };

  return (
    <div className="container-fluid p-0" ref={mainWrapper}>
      {/* {isLoading && <Loader />} */}
      {/* <================================= Upper Navbar =================================> */}
      <nav id={style.navBar}>
        <div className="row w-100 g-0">
          <div className="col-3">
            <div className="websiteLogo">
              <span
                style={{
                  fontSize: "30px",
                  letterSpacing: "1px",
                  position: "relative",
                  top: "-5px",
                }}
              >
                <span style={{ verticalAlign: "middle" }}>
                  <span className={style.bigYellow}>E</span>lectronics
                </span>
                &nbsp;
                <span style={{ verticalAlign: "middle" }}>
                  <span className={style.bigYellow}>M</span>art
                </span>
              </span>
            </div>
          </div>
          <div className="col-9 p-0">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="input-group" style={{ width: "65%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products, brands, and more"
                  style={{ padding: "16px 10px" }}
                />
                <button
                  className="btn btn-warning"
                  style={{ padding: "10px 40px" }}
                >
                  <i class="fa-solid fa-magnifying-glass" />
                </button>
              </div>
              <div className="rightNavIcons d-flex">
                {/* <================================= Location Modal =================================> */}
                <label htmlFor="" className="location">
                  <button
                    className="btn"
                    style={{ padding: "0px", height: "100%", border: "none" }}
                    onClick={() => {
                      // locBox.current.style.display = "flex";
                      handleLocShow();
                    }}
                  >
                    <FaLocationDot className={style.navbarIcons} />
                  </button>
                  <Modal
                    show={locShow}
                    onHide={handleLocClose}
                    centered
                    bsPrefix={style.locModal}
                  >
                    <Modal.Header closeButton bsPrefix={style.modelLocHead}>
                      <Modal.Title>
                        <p className="text-center w-100 pt-3">
                          <i className="fa-solid fa-location-pin me-2" />
                          Please Select Your Location
                        </p>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix={style.modelLocBody}>
                      <select
                        id="selLoc"
                        className="form-select"
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: "15px",
                        }}
                      >
                        <option value="empty">Select City</option>
                        <option value="adi">Ahmedabad</option>
                        <option value="raj">Rajkot</option>
                        <option value="dhr">Dhrol</option>
                        <option value="jam">Jamnagar</option>
                        <option value="dwk">Dwarka</option>
                        <option value="empty">Select City</option>
                        <option value="adi">Ahmedabad</option>
                        <option value="raj">Rajkot</option>
                        <option value="dhr">Dhrol</option>
                        <option value="jam">Jamnagar</option>
                        <option value="dwk">Dwarka</option>
                        <option value="empty">Select City</option>
                        <option value="adi">Ahmedabad</option>
                        <option value="raj">Rajkot</option>
                        <option value="dhr">Dhrol</option>
                        <option value="jam">Jamnagar</option>
                        <option value="dwk">Dwarka</option>
                      </select>
                    </Modal.Body>
                  </Modal>
                </label>

                {/* <================================= Dark/Day Mode =================================> */}
                <label htmlFor="moon" className="darkMode">
                  <button
                    className="btn"
                    style={{ padding: "0px", height: "100%", border: "none" }}
                  >
                    <MdOutlineDarkMode
                      id="moon"
                      className={style.navbarIcons}
                      style={{ fontSize: "35px" }}
                    />
                  </button>
                </label>

                {/* <================================= Wish List =================================> */}
                <label htmlFor="heart">
                  <button
                    className="btn"
                    style={{ padding: "0px", height: "100%", border: "none" }}
                  >
                    <FaRegHeart id="heart" className={style.navbarIcons} />
                  </button>
                </label>
                {/* <================================= User Log In/ Register =================================> */}
                <label htmlFor="user">
                  <Dropdown style={{ height: "100%" }}>
                    <Dropdown.Toggle
                      variant="transparent"
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "10px 15px",
                        height: "100%",
                      }}
                      className={style.userDropSym}
                    >
                      <FaUser
                        id="user"
                        className={style.navbarIcons}
                        style={{ margin: "0px" }}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu id={style.userDropDown}>
                      <Dropdown.Item href="#" style={{ padding: "5px 10px" }}>
                        <button
                          className="btn btn-warning w-100"
                          onClick={handleLogInShow}
                        >
                          Log In
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item href="#" className="text-center fw-bold">
                        OR
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-3"
                        style={{ padding: "5px 10px" }}
                      >
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleRegShow}
                        >
                          Register
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </label>

                {/* <================================= Cart =================================> */}
                <label htmlFor="cart">
                  <button
                    className="btn"
                    style={{ padding: "0px", height: "100%", border: "none" }}
                  >
                    <FaShoppingCart id="cart" className={style.navbarIcons} />
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav id={style.lowerNavBar}>
        <div
          className="row justify-content-between"
          style={{
            backgroundColor: "#292560",
            padding: "20px 50px",
            color: "white",
          }}
        >
          <div className="col-2">
            <div id="selCategory">
              <Dropdown id={style.selCatDrop}>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="text-white w-100 d-flex justify-content-between align-items-center"
                  style={{
                    border: "1px solid rgba(255,255,255,0.4)",
                    borderRadius: "0px",
                    padding: "10px",
                  }}
                >
                  Choose Category
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100" id={style.dropDownMenu}>
                  <Dropdown.Item href="">Television</Dropdown.Item>
                  <Dropdown.Item href="">Mobile</Dropdown.Item>
                  <Dropdown.Item href="">Headphones</Dropdown.Item>
                  <Dropdown.Item href="">Computes</Dropdown.Item>
                  <Dropdown.Item href="">Cameras</Dropdown.Item>
                  <Dropdown.Item href="">iPad & Tablets</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <ul
            className="col-8 d-flex justify-content-evenly align-items-center mb-0"
            style={{ listStyle: "none" }}
            id={style.navLinks}
          >
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/electronics">ELECTRONICS</NavLink>
            </li>
            <li>
              <NavLink to="/Appliance">APPLIANCES</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">ABOUT US</NavLink>
            </li>
            <li>
              <NavLink to="/newArrivals">NEW ARRIVALS</NavLink>
            </li>
            <li>
              <NavLink to="/contactUs">CONTACT US</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* <================================= Log In Modal =================================> */}
      <div className="LogInModal">
        <Modal
          show={logInShow}
          onHide={handleLogInClose}
          centered
          bsPrefix={style.logInModal}
        >
          <Modal.Header closeButton bsPrefix={style.modelHead}>
            Log In
          </Modal.Header>
          <Modal.Body bsPrefix={style.modelBody}>
            <form id={style.logInForm}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  style={inputStyle}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  value="Log in"
                  className={style.LogInBtn}
                />
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="remMe">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id={style.remMeCheck}
                  />
                  <span>Remember me?</span>
                </div>
                <div className="adminWrapper">
                  <button className="btn btn-primary">Admin Panel</button>
                </div>
              </div>
              <div
                className="mb-3 d-flex align-items-center justify-content-center"
                style={{ fontSize: "18px" }}
              >
                <span>Don't have an account?&nbsp;</span>
                <button
                  className="btn p-0 text-warning"
                  style={{ fontSize: "18px" }}
                  onClick={() => {
                    handleLogInClose();
                    handleRegShow();
                  }}
                >
                  Register Now
                </button>
              </div>
              <div className={style.socialIcons}>
                <a
                  href="https://p.w3layouts.com/demos_new/template_demo/11-06-2021/electronics-mart-liberty-demo_Free/1081434887/web/index.html?_gl=1*2ofybf*_ga*Mjg0NTk3MzcxLjE3MjQ4NTY1ODE.*_ga_9HSZ46TKMQ*MTcyNDg1NjU4MC4xLjEuMTcyNDg1NzE5My41OC4wLjA.*_ga_EGV5GTJEP5*MTcyNDg1NjU4MS4xLjEuMTcyNDg1NzE5MS4wLjAuMA..*_ga_FFZF56TTWE*MTcyNDg1NjU4NC4xLjEuMTcyNDg1NzE5MS4wLjAuMA..&_ga=2.4833392.254561684.1724856584-284597371.1724856581#facebook"
                  className={style.socFrame}
                  style={{ backgroundColor: "#849fd7" }}
                >
                  <RiFacebookBoxFill />
                </a>
                <a
                  href="https://p.w3layouts.com/demos_new/template_demo/11-06-2021/electronics-mart-liberty-demo_Free/1081434887/web/index.html?_gl=1*2ofybf*_ga*Mjg0NTk3MzcxLjE3MjQ4NTY1ODE.*_ga_9HSZ46TKMQ*MTcyNDg1NjU4MC4xLjEuMTcyNDg1NzE5My41OC4wLjA.*_ga_EGV5GTJEP5*MTcyNDg1NjU4MS4xLjEuMTcyNDg1NzE5MS4wLjAuMA..*_ga_FFZF56TTWE*MTcyNDg1NjU4NC4xLjEuMTcyNDg1NzE5MS4wLjAuMA..&_ga=2.4833392.254561684.1724856584-284597371.1724856581#twitter"
                  className={style.socFrame}
                  style={{ backgroundColor: "#33BDF1" }}
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://p.w3layouts.com/demos_new/template_demo/11-06-2021/electronics-mart-liberty-demo_Free/1081434887/web/index.html?_gl=1*2ofybf*_ga*Mjg0NTk3MzcxLjE3MjQ4NTY1ODE.*_ga_9HSZ46TKMQ*MTcyNDg1NjU4MC4xLjEuMTcyNDg1NzE5My41OC4wLjA.*_ga_EGV5GTJEP5*MTcyNDg1NjU4MS4xLjEuMTcyNDg1NzE5MS4wLjAuMA..*_ga_FFZF56TTWE*MTcyNDg1NjU4NC4xLjEuMTcyNDg1NzE5MS4wLjAuMA..&_ga=2.4833392.254561684.1724856584-284597371.1724856581#google-plus"
                  className={style.socFrame}
                  style={{ backgroundColor: "#e46f61" }}
                >
                  <FaGooglePlusG />
                </a>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        {/* <=================================== Registration Modal ===================================> */}
        <div className="regModal">
          <Modal
            show={regShow}
            onHide={handleRegClose}
            centered
            bsPrefix={style.logInModal}
          >
            <Modal.Header closeButton bsPrefix={style.modelHead}>
              Register
            </Modal.Header>
            <Modal.Body bsPrefix={style.modelBody}>
              <form id={style.logInForm}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    style={inputStyle}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    style={inputStyle}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    style={inputStyle}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    style={inputStyle}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="submit"
                    value="Register"
                    className={style.LogInBtn}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id={style.remMeCheck}
                  />
                  <span>I Accept to the Terms & Conditions</span>
                </div>
                <div
                  className="mb-3 d-flex align-items-center justify-content-center"
                  style={{ fontSize: "18px" }}
                >
                  <span>Have an account already?&nbsp;</span>
                  <button
                    className="btn p-0 text-warning"
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      handleRegClose();
                      handleLogInShow();
                    }}
                  >
                    Login
                  </button>
                </div>
                <div className={style.socialIcons}>
                  <a
                    href="https://p.w3layouts.com/demos_new/template_demo/11-06-2021/electronics-mart-liberty-demo_Free/1081434887/web/index.html?_gl=1*2ofybf*_ga*Mjg0NTk3MzcxLjE3MjQ4NTY1ODE.*_ga_9HSZ46TKMQ*MTcyNDg1NjU4MC4xLjEuMTcyNDg1NzE5My41OC4wLjA.*_ga_EGV5GTJEP5*MTcyNDg1NjU4MS4xLjEuMTcyNDg1NzE5MS4wLjAuMA..*_ga_FFZF56TTWE*MTcyNDg1NjU4NC4xLjEuMTcyNDg1NzE5MS4wLjAuMA..&_ga=2.4833392.254561684.1724856584-284597371.1724856581#facebook"
                    className={style.socFrame}
                    style={{ backgroundColor: "#849fd7" }}
                  >
                    <RiFacebookBoxFill />
                  </a>
                  <a
                    href="https://p.w3layouts.com/demos_new/template_demo/11-06-2021/electronics-mart-liberty-demo_Free/1081434887/web/index.html?_gl=1*2ofybf*_ga*Mjg0NTk3MzcxLjE3MjQ4NTY1ODE.*_ga_9HSZ46TKMQ*MTcyNDg1NjU4MC4xLjEuMTcyNDg1NzE5My41OC4wLjA.*_ga_EGV5GTJEP5*MTcyNDg1NjU4MS4xLjEuMTcyNDg1NzE5MS4wLjAuMA..*_ga_FFZF56TTWE*MTcyNDg1NjU4NC4xLjEuMTcyNDg1NzE5MS4wLjAuMA..&_ga=2.4833392.254561684.1724856584-284597371.1724856581#twitter"
                    className={style.socFrame}
                    style={{ backgroundColor: "#33BDF1" }}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://p.w3layouts.com/demos_new/template_demo/11-06-2021/electronics-mart-liberty-demo_Free/1081434887/web/index.html?_gl=1*2ofybf*_ga*Mjg0NTk3MzcxLjE3MjQ4NTY1ODE.*_ga_9HSZ46TKMQ*MTcyNDg1NjU4MC4xLjEuMTcyNDg1NzE5My41OC4wLjA.*_ga_EGV5GTJEP5*MTcyNDg1NjU4MS4xLjEuMTcyNDg1NzE5MS4wLjAuMA..*_ga_FFZF56TTWE*MTcyNDg1NjU4NC4xLjEuMTcyNDg1NzE5MS4wLjAuMA..&_ga=2.4833392.254561684.1724856584-284597371.1724856581#google-plus"
                    className={style.socFrame}
                    style={{ backgroundColor: "#e46f61" }}
                  >
                    <FaGooglePlusG />
                  </a>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div style={{ zIndex: "0" }}>
        {/* ------------------------------------------------------------------------------------------- */}
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
