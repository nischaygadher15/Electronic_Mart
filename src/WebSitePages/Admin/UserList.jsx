import React from "react";
import UserGridHeader from "./UserGridHeader";
import users from "../../JSON_Data/usersList.js";
import style from "../Admin/UserList.module.css";
import AdminFooter from "./AdminFooter.jsx";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";

const UserList = () => {
  return (
    <>
      <div style={{ padding: "30px", marginBottom: "100px" }}>
        <UserGridHeader users={users.length} text={"User List"} />
        <div className={`${style.userList} shadow`}>
          <table className={style.userTb}>
            <thead>
              <tr className="py-4">
                <th style={{ width: "10%" }} className="text-center">
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "15%" }}>Role</th>
                <th style={{ width: "30%" }}>Email</th>
                <th style={{ width: "15%", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr>
                    <td style={{ width: "10%" }} className="text-center">
                      <input type="checkbox" className="form-check-input" />
                    </td>
                    <td style={{ width: "30%" }}>
                      <img
                        src={u.picture.thumbnail}
                        className={`${style.userPic} img-fluid`}
                      />
                      <span>
                        {`${u.name.title} ${u.name.first} ${u.name.last}`.substring(
                          0,
                          15
                        )}
                      </span>
                    </td>
                    <td style={{ width: "15%" }}>Customer</td>
                    <td style={{ width: "30%" }}>{u.email}</td>
                    <td style={{ width: "15%", textAlign: "center" }}>
                      <div className="actionBox d-flex align-items-center">
                        <button className="btn text-primary me-1">
                          <FaRegUser />
                        </button>
                        <button className="btn text-primary me-1">
                          <MdEdit />
                        </button>
                        <button className="btn text-danger">
                          <FaRegTrashCan />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default UserList;
