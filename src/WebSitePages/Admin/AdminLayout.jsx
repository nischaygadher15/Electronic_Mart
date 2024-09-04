import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, useParams } from "react-router-dom";
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

const AdminLayout = ({ children }) => {
  // <==== Variable Declaration ====>
  let [dash, setDash] = useState(false);
  let [add, setAdd] = useState(false);
  let [view, setView] = useState(false);
  let [edit, setEdit] = useState(false);
  // let dashRef = useRef();
  // let addRef = useRef();
  // let viewRef = useRef();
  // let editRef = useRef();
  let { id } = useParams();
  let nvg = useNavigate();
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);
  let [dashClicked, setDashClicked] = useState(false);
  let [usersClicked, setUsersClicked] = useState(false);
  let [productsClicked, setProductsClicked] = useState(false);

  let myStyle = ({ isActive }) => {
    return {
      color: isActive ? "white" : "black",
      backgroundColor: isActive ? "blue" : "transparent",
    };
  };

  // <==== Accordians ====>
  let accList0 = useRef(null);
  let accList1 = useRef(null);
  let accList2 = useRef(null);
  let accMouseOver0 = React.useCallback(() => {
    accList0.current.style.color = "white";
    accList0.current.style.fontWeight = "bold";
  }, []);
  let accMouseOut0 = React.useCallback(() => {
    accList0.current.style.color = "#8590a5  ";
    accList0.current.style.fontWeight = "normal";
  }, []);
  let accMouseOver1 = React.useCallback(() => {
    accList1.current.style.color = "white";
    accList1.current.style.fontWeight = "bold";
  }, []);
  let accMouseOut1 = React.useCallback(() => {
    accList1.current.style.color = "#8590a5  ";
    accList1.current.style.fontWeight = "normal";
  }, []);
  let accMouseOver2 = React.useCallback(() => {
    accList2.current.style.color = "white";
    accList2.current.style.fontWeight = "bold";
  }, []);
  let accMouseOut2 = React.useCallback(() => {
    accList2.current.style.color = "#8590a5  ";
    accList2.current.style.fontWeight = "normal";
  }, []);

  useEffect(() => {
    if (dashClicked) {
      accList0.current.removeEventListener("mouseover", accMouseOver0);
      accList0.current.removeEventListener("mouseout", accMouseOut0);
      accList0.current.style.color = "white";
      accList0.current.style.fontWeight = "bold";
      nvg("/admin/dash");
    } else {
      accList0.current.addEventListener("mouseover", accMouseOver0);
      accList0.current.addEventListener("mouseout", accMouseOut0);
    }
    return;
  }, [dashClicked]);

  useEffect(() => {
    if (usersClicked) {
      accList1.current.removeEventListener("mouseover", accMouseOver1);
      accList1.current.removeEventListener("mouseout", accMouseOut1);
      accList1.current.style.color = "white";
      accList1.current.style.fontWeight = "bold";
    } else {
      accList1.current.addEventListener("mouseover", accMouseOver1);
      accList1.current.addEventListener("mouseout", accMouseOut1);
    }
    return;
  }, [usersClicked]);

  useEffect(() => {
    if (productsClicked) {
      accList2.current.removeEventListener("mouseover", accMouseOver2);
      accList2.current.removeEventListener("mouseout", accMouseOut2);
      accList2.current.style.color = "white";
      accList2.current.style.fontWeight = "bold";
    } else {
      accList2.current.addEventListener("mouseover", accMouseOver2);
      accList2.current.addEventListener("mouseout", accMouseOut2);
    }
    return;
  }, [productsClicked]);

  // <======== Fetching data ========>
  let getData = async () => {
    setisLoading(true);
    let data = await useFetchProducts();
    dispatch(SET_PRODUCTS(data));
    setisLoading(false);
  };
  useEffect(() => {
    getData();
    setDashClicked(true);
    return;
  }, []);

  // <==== Getting ID FROM URl ====>
  useEffect(() => {
    if (id) {
      activeLinks(false, false, false, true);
      nvg(`/admin/edit/${id}`);
    }
    if (window.location.href.includes("/admin/view"))
      activeLinks(false, false, true, false);
  }, [id]);

  // <==== Switching Tabs IN DASHBOARD ====>
  let activeLinks = (link1, link2, link3, link4) => {
    if (link1) {
      setDash(true);
      dashRef.current.style.backgroundColor = "blue";
      dashRef.current.style.color = "white";
    } else {
      setDash(false);
      dashRef.current.style.backgroundColor = "transparent";
      dashRef.current.style.color = "black";
    }
    if (link2) {
      setAdd(true);
      addRef.current.style.backgroundColor = "blue";
      addRef.current.style.color = "white";
    } else {
      setAdd(false);
      addRef.current.style.backgroundColor = "transparent";
      addRef.current.style.color = "black";
    }
    if (link3) {
      setView(true);
      viewRef.current.style.backgroundColor = "blue";
      viewRef.current.style.color = "white";
    } else {
      setView(false);
      viewRef.current.style.backgroundColor = "transparent";
      viewRef.current.style.color = "black";
    }
    if (link4) {
      setEdit(true);
      editRef.current.style.backgroundColor = "blue";
      editRef.current.style.color = "white";
    } else {
      setEdit(false);
      editRef.current.style.backgroundColor = "transparent";
      editRef.current.style.color = "black";
    }
  };

  let showDash = (e) => {
    activeLinks(true, false, false, false);
  };
  let addDash = (e) => {
    activeLinks(false, true, false, false);
    nvg("/admin/add");
  };
  let viewDash = (e) => {
    activeLinks(false, false, true, false);
    nvg("/admin/view");
  };

  // <==== Admin Logout Function ====>
  let logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(ACTIVE_USER({ usrName: "Guest", isLoggedIn: false }));
        sessionStorage.removeItem("activeUser");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    nvg("/login");
  };

  return (
    <div
      style={{
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* <======== Loader ========> */}
      {isLoading && <Loader />}

      {/* <======== Admin NavBar ========> */}
      <AdminNavBar />

      {/* <======== Admin Sidebar ========> */}
      <div id={style.adminWrapper}>
        <div id={style.adminSidebar}>
          <ul id={style.sidebarLinks}>
            {/* Dashboard */}
            <li>
              <div
                className="d-flex align-items-center w-100 my-2"
                ref={accList0}
                style={{
                  color: dashClicked ? "white" : "#8590a5",
                  fontWeight: dashClicked ? "bold" : "normal",
                }}
                onClick={() => setDashClicked(!dashClicked)}
              >
                <MdOutlineDashboard
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                <span>Dashboard</span>
              </div>
            </li>

            {/* User Accordian */}
            <li className="flex-column">
              <div
                className="d-flex justify-content-between align-items-center w-100 mb-2"
                onClick={() => {
                  setUsersClicked(!usersClicked);
                }}
                ref={accList1}
                style={{
                  color: usersClicked ? "white" : "#8590a5",
                  fontWeight: usersClicked ? "bold" : "normal",
                }}
              >
                <span className="d-flex align-items-center">
                  <FaUsers style={{ fontSize: "20px", marginRight: "10px" }} />
                  Users
                </span>
                <span>
                  <IoIosArrowUp
                    style={{
                      transform: usersClicked
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                  />
                </span>
              </div>
              <div
                className="w-100"
                style={{
                  height: usersClicked ? "auto" : "0px",
                  overflow: "hidden",
                }}
              >
                <ul
                  style={{ listStyle: "none", paddingLeft: "30px" }}
                  id={style.userList}
                >
                  <li className="py-2" onClick={nvg("/admin/add")}>
                    Add Users
                  </li>
                  <li className="py-2">View Users</li>
                  <li className="py-2">Edit Users</li>
                </ul>
              </div>
            </li>

            {/* Product Accordian */}
            <li className="flex-column">
              <div
                className="d-flex justify-content-between align-items-center w-100 mb-2"
                style={{
                  color: productsClicked ? "white" : "#8590a5",
                  fontWeight: productsClicked ? "bold" : "normal",
                  cursor: "pointer",
                }}
                ref={accList2}
                onClick={() => setProductsClicked(!productsClicked)}
              >
                <span className="d-flex align-items-center">
                  <FaProductHunt
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  />
                  Products
                </span>
                <span>
                  <IoIosArrowUp
                    style={{
                      transform: productsClicked
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                  />
                </span>
              </div>
              <div
                className="w-100"
                style={{
                  height: productsClicked ? "auto" : "0px",
                  overflow: "hidden",
                }}
              >
                <ul
                  style={{ listStyle: "none", paddingLeft: "30px" }}
                  id={style.userList}
                >
                  <li className="py-2">Add Products</li>
                  <li className="py-2">View Products</li>
                  <li className="py-2">Edit Products</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div id={style.adminMainArea}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
