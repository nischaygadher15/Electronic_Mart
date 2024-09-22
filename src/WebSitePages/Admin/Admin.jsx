import React, { useContext } from "react";
import AdminLayout from "./AdminLayout";
import { Outlet, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader";
import ProductListProvider, {
  ProductId,
} from "../../Components/Navbar/ProductContext";

const Admin = () => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
      <ProductListProvider>
        <AdminLayout />
      </ProductListProvider>
    </>
  );
};

export default Admin;
