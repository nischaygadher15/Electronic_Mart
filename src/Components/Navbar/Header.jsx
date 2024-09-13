import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import header from "../Navbar/Header.module.css";
import { ProductId } from "./ProductContext";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../../Store/userSlice";
import { MdVerticalAlignCenter } from "react-icons/md";
import { searchByWord } from "../../Store/filters";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import style from "../Navbar/Header.module.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

const Header = () => {
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);
  let { products, showLoader, isLoading } = useContext(ProductId);
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

  return (
    <>
      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">NKG</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                style={myStyle}
                className={header.hiddenLinks}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/products"
                style={myStyle}
                className={header.hiddenLinks}
              >
                Products
              </Nav.Link>
            </Nav>
            <Nav>
              <div className={`input-group mx-2 py-2`}>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  aria-describedby="basic-addon2"
                  onChange={(e) => dispatch(searchByWord(e.target.value))}
                />
              </div>
              <Nav.Link
                className={`position-relative mx-2`}
                as={NavLink}
                to="/cart"
              >
                <span className="align-middle">
                  <BsFillCartFill size={30} />
                  <span
                    className={`badge text-bg-warning rounded-pill position-absolute top-0 start-75`}
                  >
                    {cart.length}
                  </span>
                </span>
              </Nav.Link>
              {!activeUser.isLoggedIn && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    style={myStyle}
                    className={header.hiddenLinks}
                  >
                    <span className="align-middle">Login</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/register"
                    style={myStyle}
                    className={header.hiddenLinks}
                  >
                    <span className="align-middle">Register</span>
                  </Nav.Link>
                </>
              )}
              {activeUser.isLoggedIn && (
                <>
                  <Nav.Link className={header.hiddenLinks}>
                    <span className="align-middle">{activeUser.usrName}</span>
                  </Nav.Link>
                  <Nav.Link className={header.hiddenLinks} onClick={logOut}>
                    <span className="align-middle">Logout</span>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      {/* <div className="container-fluid p-0">
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
                  <label htmlFor="" className="location">
                    <button
                      className="btn"
                      style={{ padding: "0px", height: "100%", border: "none" }}
                      onClick={() => {
                        locBox.current.style.display = "flex";
                      }}
                    >
                      <FaLocationDot className={style.navbarIcons} />
                    </button>
                    <div
                      id={style.locationWrapper}
                      className="row w-100 justify-content-center align-items-center"
                      ref={locBox}
                    >
                      <div className="col-6" id={style.selectLocationBox}>
                        <label
                          htmlFor="locCloseBtn"
                          className="form-label"
                          onClick={() => {
                            locBox.current.style.display = "none";
                          }}
                        >
                          <IoIosCloseCircle
                            className={style.locationClose}
                            id="locCloseBtn"
                          />
                        </label>
                        <p className="text-center fs-4">
                          <i className="fa-solid fa-location-pin me-2" />
                          Please Select Your Location
                        </p>
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
                      </div>
                    </div>
                  </label>
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
                  <label htmlFor="heart">
                    <button
                      className="btn"
                      style={{ padding: "0px", height: "100%", border: "none" }}
                    >
                      <FaRegHeart id="heart" className={style.navbarIcons} />
                    </button>
                  </label>
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
                      >
                        <FaUser
                          id="user"
                          className={style.navbarIcons}
                          style={{ margin: "0px" }}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="my-2">
                        <Dropdown.Item href="#">
                          <button
                            className="btn btn-warning w-100"
                            onClick={() => nvg("/login")}
                          >
                            Log In
                          </button>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="text-center">
                          OR
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => nvg("/register")}
                          >
                            Register
                          </button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </label>
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
      </div>

      {isLoading && <Loader />} */}
    </>
  );
};

export default Header;
