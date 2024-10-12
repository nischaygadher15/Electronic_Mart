import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../../Store/userSlice";
import { MdVerticalAlignCenter } from "react-icons/md";
import { searchByWord } from "../../Store/filters";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import style from "../Layouts/DefaultLayout.module.css";
import { MdOutlineDarkMode } from "react-icons/md";
import {
  FaDolly,
  FaPaperPlane,
  FaRegHeart,
  FaRegThumbsUp,
  FaShippingFast,
} from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationPin, FaUser } from "react-icons/fa6";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { CiMobile2 } from "react-icons/ci";
import { IoCall, IoMailOpen } from "react-icons/io5";
import pay1 from "../../assets/pay1.png";
import pay2 from "../../assets/pay2.png";
import pay3 from "../../assets/pay3.png";
import pay4 from "../../assets/pay4.png";
import pay5 from "../../assets/pay5.png";
import pay6 from "../../assets/pay6.png";
import pay7 from "../../assets/pay7.png";
import pay8 from "../../assets/pay8.png";
import pay9 from "../../assets/pay9.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiSmartphoneFill } from "react-icons/ri";
import p1 from "../../assets/si1.png";
import p2 from "../../assets/si2.png";
import p3 from "../../assets/si3.png";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

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
  let serviceIcon = {
    color: "#fdb03d",
    fontSize: "50px",
  };

  let imgArray = [p1, p2, p3, p1, p2, p3, p1, p2, p3];

  // <============================ Log In Modal Functions ============================>
  let [logInShow, setLogInShow] = useState(false);
  const handleLogInClose = () => setLogInShow(false);
  const handleLogInShow = () => setLogInShow(true);

  // <============================ Register In Modal Functions ============================>
  let [regShow, setRegShow] = useState(false);
  const handleRegClose = () => setRegShow(false);
  const handleRegShow = () => setRegShow(true);

  // <============================ Location In Modal Functions ============================>
  let [locShow, setLocShow] = useState(false);
  const handleLocClose = () => setLocShow(false);
  const handleLocShow = () => setLocShow(true);

  // <============================ Cart In Modal Functions ============================>
  let [cartShow, setCartShow] = useState(false);
  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);

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
      {/* <================================= Loader =================================> */}
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
                <label htmlFor="locationBtn" className="location">
                  <button
                    className="btn"
                    id="locationBtn"
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

                {/* <================================= Cart Modal =================================> */}
                <label htmlFor="cart">
                  <button
                    className="btn"
                    style={{ padding: "0px", height: "100%", border: "none" }}
                    onClick={handleCartShow}
                  >
                    <FaShoppingCart id="cart" className={style.navbarIcons} />
                  </button>

                  <Modal
                    show={cartShow}
                    onHide={handleCartClose}
                    centered
                    bsPrefix={style.locModal}
                  >
                    <Modal.Header bsPrefix={style.modelLocHead}>
                      <Modal.Title className="w-100">
                        <p
                          className=" w-100 d-flex justify-content-center align-items-center text-white fs-3 mb-0"
                          style={{ backgroundColor: "#292560" }}
                        >
                          CART
                          <FaShoppingCart id="cart" className="ms-2" />
                        </p>
                      </Modal.Title>
                      <button
                        className={`btn ${style.modelCartCloseBtn}`}
                        onClick={handleCartClose}
                      >
                        <IoMdClose style={{ fontSize: "20px" }} />
                      </button>
                    </Modal.Header>
                    <Modal.Body
                      bsPrefix={style.modelLocBody}
                      style={{
                        boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.2)",
                        padding: "16px",
                        paddingTop: "0px",
                        margin: "20px",
                        marginBottom: "0",
                      }}
                    >
                      <table className={style.cartList}>
                        <tr>
                          <th style={{ width: "57%" }}>Product Name</th>
                          <th style={{ width: "20%" }}>Quantity</th>
                          <th style={{ width: "15%" }}>Price</th>
                          <th style={{ width: "8%" }}>Delete</th>
                        </tr>
                        {imgArray.map((i) => {
                          return (
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={i}
                                    alt="Product Image in Cart"
                                    className={`img-fluid ${style.cartPdImg}`}
                                  />
                                  <p className="mb-0">Redmi 9 Prime</p>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button
                                    className={`btn btn-danger ${style.decCart}`}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    className={style.cartQty}
                                  />
                                  <button
                                    className={`btn btn-primary ${style.incCart}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td>&#8377;{`1500`}</td>
                              <td>
                                <button
                                  className={`btn btn-danger ${style.cartDelete}`}
                                >
                                  <FaRegTrashCan />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                    </Modal.Body>
                    <div className={style.checkOutWrapper}>
                      <p className="mb-0 fs-5 fw-bold">
                        Subtotal: &#8377;2270.00
                      </p>
                      <button
                        className={`btn ${style.checkOutBtn}`}
                        onClick={() => {
                          handleCartClose();
                          nvg("/checkout");
                        }}
                      >
                        Check Out With
                      </button>
                    </div>
                  </Modal>
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* <================================= Lower Navbar =================================> */}
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
            id={style.navLinks}
          >
            <li>
              {/* Home */}
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "activeNavLink" : "")}
              >
                HOME
              </NavLink>
            </li>
            <li>
              {/* Electronics */}
              <div className={style.ddOnHover}>
                <span className={style.ddOnHoverTitle}>
                  ELECTRONICS <IoMdArrowDropdown className="ms-1" />
                </span>
                <div className={style.ddOnHoverOuterBody}>
                  <div className={style.ddOnHoverBody}>
                    <div className="row" style={{ margin: "24px" }}>
                      <div className="col-6 p-0">
                        <ul className={style.ddOnHoverList}>
                          <li className={style.ddOnHoverBodyTitle}>
                            <h4 className="mb-4">Mobiles, Computers</h4>
                          </li>
                          <li>
                            <a href="#">All Mobile Phones</a>
                          </li>
                          <li>
                            <a href="#">All Mobile Accessories</a>
                          </li>
                          <li>
                            <a href="#">Cases & Covers</a>
                          </li>
                          <li>
                            <a href="#">Screen Protectors</a>
                          </li>
                          <li>
                            <a href="#">Power Banks</a>
                          </li>
                          <li>
                            <a href="#">All Certified Refurbished</a>
                          </li>
                          <li>
                            <a href="#">Tablets</a>
                          </li>
                          <li>
                            <a href="#">Wearable Devices</a>
                          </li>
                          <li>
                            <a href="#">Smart Home</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 p-0">
                        <ul className={style.ddOnHoverList}>
                          <li className={style.ddOnHoverBodyTitle}>
                            <h4 className="mb-4 opacity-0">
                              Mobiles, Computers
                            </h4>
                          </li>
                          <li>
                            <a href="#">Musical Instruments</a>
                          </li>
                          <li>
                            <a href="#">Gaming Consoles</a>
                          </li>
                          <li>
                            <a href="#">All Electronics</a>
                          </li>
                          <li>
                            <a href="#">Air Conditioners</a>
                          </li>
                          <li>
                            <a href="#">Refrigerators</a>
                          </li>
                          <li>
                            <a href="#">Washing Machines</a>
                          </li>
                          <li>
                            <a href="#">Kitchen & Home Appliances</a>
                          </li>
                          <li>
                            <a href="#">Heating & Cooling Appliances</a>
                          </li>
                          <li>
                            <a href="#">All Appliances</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* APPLIANCES */}
              <div className={style.ddOnHover}>
                <span className={style.ddOnHoverTitle}>
                  APPLIANCES <IoMdArrowDropdown className="ms-1" />
                </span>
                <div className={style.ddOnHoverOuterBody}>
                  <div className={style.ddOnHoverBody}>
                    <div className="row" style={{ margin: "24px" }}>
                      <div className="col-6 p-0">
                        <ul className={style.ddOnHoverList}>
                          <li className={style.ddOnHoverBodyTitle}>
                            <h4 className="mb-4">
                              TV, Appliances, Electronics
                            </h4>
                          </li>
                          <li>
                            <a href="#">Televisions</a>
                          </li>
                          <li>
                            <a href="#">All Mobile Accessories</a>
                          </li>
                          <li>
                            <a href="#">Home Entertainment Systems</a>
                          </li>
                          <li>
                            <a href="#">Headphones</a>
                          </li>
                          <li>
                            <a href="#">Speakers</a>
                          </li>
                          <li>
                            <a href="#">MP3, Media Players & Accessories</a>
                          </li>
                          <li>
                            <a href="#">Audio & Video Accessories</a>
                          </li>
                          <li>
                            <a href="#">Cameras</a>
                          </li>
                          <li>
                            <a href="#">Camera Accessories</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 p-0">
                        <ul className={style.ddOnHoverList}>
                          <li className={style.ddOnHoverBodyTitle}>
                            <h4 className="mb-4 opacity-0">
                              Mobiles, Computers
                            </h4>
                          </li>
                          <li>
                            <a href="#">Musical Instruments</a>
                          </li>
                          <li>
                            <a href="#">Gaming Consoles</a>
                          </li>
                          <li>
                            <a href="#">All Electronics</a>
                          </li>
                          <li>
                            <a href="#">Air Conditioners</a>
                          </li>
                          <li>
                            <a href="#">Refrigerators</a>
                          </li>
                          <li>
                            <a href="#">Washing Machines</a>
                          </li>
                          <li>
                            <a href="#">Kitchen & Home Appliances</a>
                          </li>
                          <li>
                            <a href="#">Heating & Cooling Appliances</a>
                          </li>
                          <li>
                            <a href="#">All Appliances</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/aboutus">ABOUT US</NavLink>
            </li>
            <li>
              <NavLink to="/newArrivals">NEW ARRIVALS</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">CONTACT US</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/* <================================= Log In Modal =================================> */}
      <div className="logInModal">
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
                  <button
                    className="btn btn-primary"
                    onClick={() => nvg("/admin/dash")}
                  >
                    Admin Panel
                  </button>
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
      </div>
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

      {/* <================================= Children =================================>   */}
      <div style={{ zIndex: "0" }}>{children}</div>

      {/* <================================= Footer Services =================================>   */}
      <div className={style.container} style={{ padding: "60px" }}>
        <p className="fw-bold fs-3">Electronics:</p>
        <p style={{ fontSize: "18px", marginBottom: "50px" }}>
          If you're considering a new laptop, looking for a powerful new car
          stereo or shopping for a new HDTV, we make it easy to find exactly
          what you need at a price you can afford. We offer Every Day Low Prices
          on TVs, laptops, cell phones, tablets and iPads, video games, desktop
          computers, cameras and camcorders, audio, video and more
        </p>
        <div className="servicesWrapper row">
          <div className="service col-4 d-flex align-items-center">
            <FaDolly style={serviceIcon} />
            <div className="serviceText ms-3">
              <p className="fs-3 fw-semibold mb-1">Free Shipping</p>
              <p className="mb-0">on orders over $100</p>
            </div>
          </div>
          <div className="service col-4 d-flex align-items-center">
            <FaShippingFast style={serviceIcon} />
            <div className="serviceText ms-3">
              <p className="fs-3 fw-semibold mb-1">Free Shipping</p>
              <p className="mb-0">on orders over $100</p>
            </div>
          </div>
          <div className="service col-4 d-flex align-items-center">
            <FaRegThumbsUp style={serviceIcon} />
            <div className="serviceText ms-3">
              <p className="fs-3 fw-semibold mb-1">Free Shipping</p>
              <p className="mb-0">on orders over $100</p>
            </div>
          </div>
        </div>
      </div>

      {/* <================================= Footer Links 1 =================================>   */}
      <div
        className={style.container}
        style={{ backgroundColor: "#060E1F", color: "white" }}
      >
        <div className="row footerLinks1" style={{ padding: "50px 0px" }}>
          <div className="col-3">
            <ul className={style.ftList}>
              <li>
                <h4 className="mb-4">Categories</h4>
              </li>
              <li>
                <a href="#">Mobiles</a>
              </li>
              <li>
                <a href="#">Computers</a>
              </li>
              <li>
                <a href="#">TV, Audio</a>
              </li>
              <li>
                <a href="#">Smartphones</a>
              </li>
              <li>
                <a href="#">Washing Machines </a>
              </li>
              <li>
                <a href="#">Refrigerators</a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={style.ftList}>
              <li>
                <h4 className="mb-4">Quick Links</h4>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Faqs</a>
              </li>
              <li>
                <a href="#">Terms of use </a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={style.ftList}>
              <li>
                <h4 className="mb-4">Get in Touch</h4>
              </li>
              <li>
                <a href="#">
                  <FaLocationPin className={style.getTouchIcons} />
                  Mkc, 123 Sebastian, USA.
                </a>
              </li>
              <li>
                <a href="#">
                  <RiSmartphoneFill className={style.getTouchIcons} />
                  12 2345 6790
                </a>
              </li>
              <li>
                <a href="#">
                  <IoCall className={style.getTouchIcons} />
                  +11 3672 1890
                </a>
              </li>
              <li>
                <a href="#">
                  <IoMailOpen className={style.getTouchIcons} />
                  mail 1@example.com
                </a>
              </li>
              <li>
                <a href="#">
                  <IoMailOpen className={style.getTouchIcons} />
                  mail 2@example.com
                </a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={style.ftList}>
              <li>
                <h4 className="mb-4">Newsletter</h4>
              </li>
              <li>Free Delivery on your first order!</li>

              <li>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Email"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text
                    id="basic-addon2"
                    style={{
                      backgroundColor: "#FDB03D",
                      color: "white",
                      padding: "12px",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                    onClick={(e) =>
                      alert(
                        `Email sent from: ${e.currentTarget.previousElementSibling.value}`
                      )
                    }
                  >
                    <FaPaperPlane
                      style={{
                        fontSize: "22px",
                      }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </li>
              <li>
                <span className="fs-4 fw-semibold">Follow Us on</span>
              </li>
              <li>
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
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <================================= Footer Links 2 =================================>   */}
      <div className={style.container} style={{ padding: "60px" }}>
        <div className={style.footerLinks2}>
          <ul>
            <li className="mb-4">
              <h4 className="mb-3">Mobile & Tablets :</h4>
              <ul className={style.ftLinks2}>
                <li>
                  <a href="#">Android Phones</a>
                </li>
                <li>
                  <a href="#">Smartphones</a>
                </li>
                <li>
                  <a href="#">Feature Phones</a>
                </li>
                <li>
                  <a href="#">Unboxed Phones</a>
                </li>
                <li>
                  <a href="#">Refurbished Phones</a>
                </li>
                <li>
                  <a href="#">Tablets</a>
                </li>
                <li>
                  <a href="#">CDMA Phones</a>
                </li>
                <li>
                  <a href="#">Value Added Services</a>
                </li>
                <li>
                  <a href="#">Sell Old</a>
                </li>
                <li>
                  <a href="#">Used Mobiles</a>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h4 className="mb-3">Computers :</h4>
              <ul className={style.ftLinks2}>
                <li>
                  <a href="#">Laptops </a>
                </li>
                <li>
                  <a href="#">Printers</a>
                </li>
                <li>
                  <a href="#">Routers</a>
                </li>
                <li>
                  <a href="#">Ink & Toner Cartridges</a>
                </li>
                <li>
                  <a href="#">Video Games</a>
                </li>
                <li>
                  <a href="#">Unboxed & Refurbished Laptops</a>
                </li>
                <li>
                  <a href="#">Assembled Desktops</a>
                </li>
                <li>
                  <a href="#">Data Cards</a>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h4 className="mb-3">TV, Audio & Large Appliances :</h4>
              <ul className={style.ftLinks2}>
                <li>
                  <a href="#">TVs & DTH </a>
                </li>
                <li>
                  <a href="#">Home Theatre Systems</a>
                </li>
                <li>
                  <a href="#">Hidden Cameras & CCTVs</a>
                </li>
                <li>
                  <a href="#">Refrigerators</a>
                </li>
                <li>
                  <a href="#">Washing Machines</a>
                </li>
                <li>
                  <a href="#">Air Conditioners</a>
                </li>
                <li>
                  <a href="#">Cameras</a>
                </li>
                <li>
                  <a href="#">Speakers</a>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h4 className="mb-3">Mobile & Laptop Accessories :</h4>
              <ul className={style.ftLinks2}>
                <li>
                  <a href="#">Headphones</a>
                </li>
                <li>
                  <a href="#">Power Banks</a>
                </li>
                <li>
                  <a href="#">Backpacks</a>
                </li>
                <li>
                  <a href="#">Mobile Cases & Covers</a>
                </li>
                <li>
                  <a href="#">Pen Drives</a>
                </li>
                <li>
                  <a href="#">External Hard Disks</a>
                </li>
                <li>
                  <a href="#">Mouse</a>
                </li>
                <li>
                  <a href="#">Smart Watches & Fitness Bands</a>
                </li>
                <li>
                  <a href="#">MicroSD Cards</a>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h4 className="mb-3">Appliances :</h4>
              <ul className={style.ftLinks2}>
                <li>
                  <a href="#">Trimmers</a>
                </li>
                <li>
                  <a href="#">Hair Dryers</a>
                </li>
                <li>
                  <a href="#">Emergency Lights</a>
                </li>
                <li>
                  <a href="#">Water Purifiers</a>
                </li>
                <li>
                  <a href="#">Electric Kettles</a>
                </li>
                <li>
                  <a href="#">Hair Straighteners</a>
                </li>
                <li>
                  <a href="#">Induction Cooktops</a>
                </li>
                <li>
                  <a href="#">Sewing Machines</a>
                </li>
                <li>
                  <a href="#">Geysers</a>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h4 className="mb-3">Popular on Electronics Mart</h4>
              <ul className={style.ftLinks2}>
                <li>
                  <a href="#">Offers & Coupons</a>
                </li>
                <li>
                  <a href="#">Couple Watches</a>
                </li>
                <li>
                  <a href="#">Gas Stoves</a>
                </li>
                <li>
                  <a href="#">Air Coolers</a>
                </li>
                <li>
                  <a href="#">Air Purifiers</a>
                </li>
                <li>
                  <a href="#">Headphones</a>
                </li>
                <li>
                  <a href="#">Headsets</a>
                </li>
                <li>
                  <a href="#">Pressure Cookers</a>
                </li>
                <li>
                  <a href="#">Sandwich Makers</a>
                </li>
                <li>
                  <a href="#">Air Friers</a>
                </li>
                <li>
                  <a href="#">Irons</a>
                </li>
                <li>
                  <a href="#">LED TV</a>
                </li>
                <li>
                  <a href="#">Sandwich Makers</a>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h4 className="mb-3">Payment Method</h4>
              <ul className={style.ftLinksPay}>
                <li>
                  <img src={pay1} alt="Visa" />
                </li>
                <li>
                  <img src={pay2} alt="Master" />
                </li>
                <li>
                  <img src={pay3} alt="Maestro" />
                </li>
                <li>
                  <img src={pay4} alt="American Express" />
                </li>
                <li>
                  <img src={pay5} alt="Discover" />
                </li>
                <li>
                  <img src={pay6} alt="Rupay" />
                </li>
                <li>
                  <img src={pay7} alt="Net Banking" />
                </li>
                <li>
                  <img src={pay8} alt="Cash on Delivery" />
                </li>
                <li>
                  <img src={pay9} alt="East EMI" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* <================================= Footer =================================>   */}
      <div className={style.footerText}>
        <p
          className=" text-center m-0"
          style={{ fontSize: "18px", color: "#868383" }}
        >
          &copy; 2021 Electronics Mart. All rights reserved | Design by&nbsp;
          <a href="https://w3layouts.com/">W3layouts.</a>
        </p>
      </div>
    </div>
  );
};

export default DefaultLayout;
