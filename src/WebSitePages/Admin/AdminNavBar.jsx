import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import style from "../Admin/AdminNavBar.module.css";
import logo from "../../assets/logo-light.png";
import logoSm from "../../assets/logo-sm-dark.png";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import userDefaultPic from "../../assets/test1.jpg";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuShoppingCart } from "react-icons/lu";
import { ProductId } from "../../Components/Navbar/ProductContext";

const AdminNavBar = () => {
  let userDrop = useRef(null);
  let [userDropClicked, setUserDropClicked] = useState(false);
  let nvg = useNavigate();
  let [myLogo, setLogo] = useState(logo);

  // <==== Admin Logout Function ====>
  let logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // dispatch(ACTIVE_USER({ usrName: "Guest", isLoggedIn: false }));
        // sessionStorage.removeItem("activeUser");
        toast.success("You Logged Out Successfully.");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    nvg("/login");
  };

  // NavMIn Functionality
  let { navBarMini, setNavbarMini } = useContext(ProductId);
  let handleNavMin = () => {
    setNavbarMini(!navBarMini);
  };

  useEffect(() => {
    if (navBarMini) {
      document.querySelector(`#${style.navLeft}`).style.width = "5%";
      document.querySelector(`#${style.navRight}`).style.width = "95%";
      document.querySelector(`#${style.navLeft}`).style.justifyContent =
        "center";
      setLogo(logoSm);
    } else {
      document.querySelector(`#${style.navLeft}`).style.width = "18%";
      document.querySelector(`#${style.navRight}`).style.width = "82%";
      document.querySelector(`#${style.navLeft}`).style.justifyContent =
        "flex-start";
      setLogo(logo);
    }
  }, [navBarMini]);

  return (
    <div id={style.adminNav}>
      <div id={style.navLeft}>
        <img src={myLogo} alt="Website Logo" id={style.logo} />
        {/* <img src={logoSm} alt="Website Logo" id={style.logo} /> */}
      </div>

      <div id={style.navRight}>
        <div id={style.searchWrapper}>
          <button
            className="btn"
            style={{ border: "none" }}
            onClick={handleNavMin}
          >
            <HiOutlineBars3CenterLeft />
          </button>
          <form className="searchForm">
            <input
              type="text"
              className="form-control"
              placeholder="Search Here"
            />
          </form>
        </div>
        <div id={style.userWrapper}>
          {/* Dark/Bright Mode */}
          <button className="btn" style={{ border: "none" }}>
            <MdDarkMode />
            {/* <MdOutlineLightMode /> */}
          </button>

          {/* Notification */}
          <Dropdown>
            <Dropdown.Toggle
              variant="white"
              id="dropdown-basic"
              className={style.notfDropToggle}
            >
              <IoMdNotificationsOutline />
              <span
                className={`badge rounded-pill bg-danger ${style.notfBadge}`}
              >
                9
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className={style.notfDropMenu}>
              <Dropdown.Item
                className={`${style.notfDropItem} d-flex justify-content-between align-items-center`}
              >
                <span className="fs-5 fe-semibold">Notificationa</span>
                <a role="button" className="text-primary">
                  Mark all as read
                </a>
              </Dropdown.Item>
              <Dropdown.Item className={style.notfDropItem}>
                <div className="row g-0">
                  <div className="col-2 d-flex align-items-center">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        fontSize: "18px",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <LuShoppingCart
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Your order is placed</p>
                    <p className="mb-1" style={{ whiteSpace: "initial" }}>
                      If several languages coalesce the grammar
                    </p>
                  </div>
                  <div className="col-2">3 min ago</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={style.notfDropItem}>
                <div className="row g-0">
                  <div className="col-2 d-flex align-items-center">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        fontSize: "18px",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <LuShoppingCart
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Your order is placed</p>
                    <p className="mb-1" style={{ whiteSpace: "initial" }}>
                      If several languages coalesce the grammar
                    </p>
                  </div>
                  <div className="col-2">3 min ago</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={style.notfDropItem}>
                <div className="row g-0">
                  <div className="col-2 d-flex align-items-center">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        fontSize: "18px",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <LuShoppingCart
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Your order is placed</p>
                    <p className="mb-1" style={{ whiteSpace: "initial" }}>
                      If several languages coalesce the grammar
                    </p>
                  </div>
                  <div className="col-2">3 min ago</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={style.notfDropItem}>
                <div className="row g-0">
                  <div className="col-2 d-flex align-items-center">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        fontSize: "18px",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <LuShoppingCart
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Your order is placed</p>
                    <p className="mb-1" style={{ whiteSpace: "initial" }}>
                      If several languages coalesce the grammar
                    </p>
                  </div>
                  <div className="col-2">3 min ago</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={style.notfDropItem}>
                <div className="row g-0">
                  <div className="col-2 d-flex align-items-center">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        fontSize: "18px",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <LuShoppingCart
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Your order is placed</p>
                    <p className="mb-1" style={{ whiteSpace: "initial" }}>
                      If several languages coalesce the grammar
                    </p>
                  </div>
                  <div className="col-2">3 min ago</div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* User Section */}
          <div id={style.userDropDown}>
            <Dropdown>
              <Dropdown.Toggle
                variant="white"
                id="dropdown-basic"
                style={{ color: "#505d69", border: "none" }}
              >
                <img
                  src={userDefaultPic}
                  alt="UserPic"
                  id={style.userPicNavbar}
                />
                <span style={{ fontSize: "16px" }}>Hemlata</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <FaRegUser className="me-2" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logOut}>
                  <CiLogout className="me-2" />
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
