import React, { useContext, useEffect, useState } from "react";
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

const Header = () => {
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);
  let { products, showLoader, isLoading } = useContext(ProductId);
  // let activeUser =
  //   JSON.parse(sessionStorage.getItem("temp")) != null
  //     ? JSON.parse(sessionStorage.getItem("temp"))
  //     : inActiveUser;

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
      <Navbar expand="lg" className="bg-body-tertiary">
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
      </Navbar>
      {isLoading && <Loader />}
    </>
  );
};

export default Header;
