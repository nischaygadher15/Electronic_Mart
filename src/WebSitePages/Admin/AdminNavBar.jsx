import React, { useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import style from "../Admin/AdminNavBar.module.css";
import logo from "../../assets/logo-light.png";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import userDefaultPic from "../../assets/test1.jpg";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Dropdown } from "react-bootstrap";

const AdminNavBar = () => {
  let userDrop = useRef(null);
  let [userDropClicked, setUserDropClicked] = useState(false);
  return (
    <div id={style.adminNav}>
      <div id={style.navLeft}>
        <img src={logo} alt="Website Logo" id={style.logo} />
      </div>

      <div id={style.navRight}>
        <div id={style.searchWrapper}>
          <button className="btn" style={{ border: "none" }}>
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
          <button className="btn" style={{ border: "none" }}>
            <MdDarkMode />
            {/* <MdOutlineLightMode /> */}
          </button>
          <button className="btn" style={{ border: "none" }}>
            <IoMdNotificationsOutline />
          </button>
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
                <Dropdown.Item>
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
