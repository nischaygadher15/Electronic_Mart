import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { ProductId } from "../../Components/Navbar/ProductContext";
import { ACTIVE_USER, selectUser } from "../../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import style from "../Admin/AdminLayout.module.css";
import useFetchProducts from "../../Store/useFetchProducts";
import { SET_PRODUCTS } from "../../Store/productSlice";
import AdminNavBar from "./AdminNavBar";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { Accordion } from "react-bootstrap";
import AdminFooter from "./AdminFooter";
import { FaClipboardList } from "react-icons/fa";
import { AdminMini, AdminMiniProvider } from "./AdminNavMini";

const AdminLayout = ({ children }) => {
  // <==== Variable Declaration ====>
  let adminMainArea = useRef(null);
  let { id } = useParams();
  let nvg = useNavigate();
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);

  //State Variables
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);

  // <======== Fetching data ========>
  let getData = async () => {
    setisLoading(true);
    let data = await useFetchProducts();
    dispatch(SET_PRODUCTS(data));
    setisLoading(false);
  };
  useEffect(() => {
    getData();
    return;
  }, []);

  // Navbar Mini Functionality
  let { navBarMini, setNavbarMini } = useContext(ProductId);

  useEffect(() => {
    if (navBarMini) {
      Array.from(document.querySelectorAll(`.${style.MyAccordian}`)).map(
        (acc) => {
          acc.classList.add(`${style.noAccArrow}`);
        }
      );
      Array.from(document.querySelectorAll(`.accIcon`)).map((icon) => {
        icon.style.position = "absolute";
        icon.style.top = "calc(50% - 10px)";
        icon.style.left = "calc(50% - 10px)";
      });

      Array.from(document.querySelectorAll(`.${style.myBody}`)).map((acc) => {
        acc.parentElement.classList.remove("show");
      });
      document.querySelector(`#${style.adminSidebar}`).style.width = "5%";
      document.querySelector(`#${style.adminMainArea}`).style.width = "95%";
      Array.from(document.querySelectorAll(`.${style.myNavLink}`)).map(
        (navLk) => {
          navLk.classList.add(`${style.navLinkMini}`);
        }
      );
    } else {
      Array.from(document.querySelectorAll(`.${style.MyAccordian}`)).map(
        (acc) => {
          acc.classList.remove(`${style.noAccArrow}`);
        }
      );
      Array.from(document.querySelectorAll(`.accIcon`)).map((icon) => {
        icon.style.position = "relative";
        icon.style.top = "0";
        icon.style.left = "0";
      });
      Array.from(document.querySelectorAll(`.${style.myBody}`)).map((acc) => {
        acc.parentElement.classList.add("show");
      });
      document.querySelector(`#${style.adminSidebar}`).style.width = "18%";
      document.querySelector(`#${style.adminMainArea}`).style.width = "82%";

      Array.from(document.querySelectorAll(`.${style.myNavLink}`)).map(
        (navLk) => {
          navLk.classList.remove(`${style.navLinkMini}`);
        }
      );
    }
    console.log("navBarMin:", navBarMini);
  }, [navBarMini]);

  return (
    <div
      style={{
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* <======== Loader ========> */}
      {/* {isLoading && <Loader />} */}

      {/* <======== Admin NavBar ========> */}
      <AdminNavBar />

      {/* <======== Admin Sidebar ========> */}
      <div id={style.adminWrapper}>
        <div id={style.adminSidebar}>
          <Navbar expand="lg" id={style.myNavbar}>
            <Container id={style.myNavContainer}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex flex-column" id={style.myNav}>
                  {/* Dashboard */}
                  <NavLink to="/admin/dash" className={style.myNavLink}>
                    <MdOutlineDashboard style={{ fontSize: "20px" }} />
                    {navBarMini ? (
                      ""
                    ) : (
                      <span style={{ marginLeft: "10px" }}>Dashboard</span>
                    )}
                  </NavLink>

                  {/* Users Accordian */}
                  <Accordion className={style.MyAccordian} defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className={style.accHeader}>
                        <span className="d-flex align-items-center">
                          <FaUsers
                            style={{ fontSize: "20px" }}
                            className="accIcon"
                          />

                          {navBarMini ? (
                            ""
                          ) : (
                            <span style={{ marginLeft: "10px" }}>Users</span>
                          )}
                        </span>
                      </Accordion.Header>
                      <Accordion.Body className={style.myBody}>
                        <NavLink
                          to="/admin/usergrid"
                          className={style.myNavLink}
                          style={{
                            padding: "10px 60px",
                          }}
                        >
                          User Grid
                        </NavLink>
                        <NavLink
                          to="/admin/userlist"
                          className={style.myNavLink}
                          style={{
                            padding: "10px 60px",
                          }}
                        >
                          User List
                        </NavLink>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* Product Accordian */}
                  <Accordion className={style.MyAccordian} defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className={style.accHeader}>
                        <span className="d-flex align-items-center">
                          <FaProductHunt
                            style={{ fontSize: "20px" }}
                            className="accIcon"
                          />

                          {navBarMini ? (
                            ""
                          ) : (
                            <span style={{ marginLeft: "10px" }}>Products</span>
                          )}
                        </span>
                      </Accordion.Header>
                      <Accordion.Body className={style.myBody}>
                        <NavLink
                          to="/admin/add"
                          className={style.myNavLink}
                          style={{
                            padding: "10px 60px",
                          }}
                        >
                          Add Products
                        </NavLink>
                        <NavLink
                          to="/admin/view"
                          className={style.myNavLink}
                          style={{
                            padding: "10px 60px",
                          }}
                        >
                          View Products
                        </NavLink>
                        <NavLink
                          to="/admin/edit"
                          className={style.myNavLink}
                          style={{
                            padding: "10px 60px",
                          }}
                        >
                          Edit Products
                        </NavLink>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* Order */}
                  <NavLink to="/admin/orders" className={style.myNavLink}>
                    <FaClipboardList style={{ fontSize: "20px" }} />

                    {navBarMini ? (
                      ""
                    ) : (
                      <span style={{ marginLeft: "10px" }}>Orders</span>
                    )}
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div id={style.adminMainArea} ref={adminMainArea}>
          {/* {children} */}
          <Outlet context={adminMainArea} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
