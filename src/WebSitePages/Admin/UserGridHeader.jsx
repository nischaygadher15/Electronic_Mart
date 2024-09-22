import React, { useState } from "react";
import style from "../Admin/UserGridHeader.module.css";
import { FaListUl, FaPlus } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

const UserGridHeader = ({ users }) => {
  return (
    <div className={style.userGridHead}>
      <span>
        <span className="fw-bold me-2">Users</span>({users})
      </span>
      <ul className={style.userGridViewAction}>
        <li>
          <NavLink
            to="/admin/userlist"
            className={({ isActive }) =>
              isActive
                ? `${style.userGridHeadActive}`
                : `${style.userGridHeadInactive}`
            }
          >
            <FaListUl style={{ margin: "10px" }} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/usergrid"
            className={({ isActive }) =>
              isActive
                ? `${style.userGridHeadActive}`
                : `${style.userGridHeadInactive}`
            }
          >
            <FiGrid style={{ margin: "10px" }} />
          </NavLink>
        </li>
        <li className={style.addUsersBtn}>
          <FaPlus style={{ marginRight: "6px" }} />
          <span>Add Users</span>
        </li>
      </ul>
    </div>
  );
};

export default UserGridHeader;
