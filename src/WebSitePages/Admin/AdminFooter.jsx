import React from "react";
import { FaHeart } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        minHeight: "60px",
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "0px 24px",
        color: "#505d69",
        fontSize: "14px",
      }}
    >
      <span>2024 &copy; Nazox.</span>
      <span>
        Crafted with by &nbsp;
        <FaHeart style={{ color: "#FF3D60" }} /> &nbsp;by&nbsp;
        <a
          href="https://1.envato.market/themesdesign"
          style={{ textDecoration: "none" }}
        >
          Themesdesign
        </a>
      </span>
    </div>
  );
};

export default AdminFooter;
