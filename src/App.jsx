import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import ProductListProvider from "./Components/Navbar/ProductContext";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
import { Provider } from "react-redux";
import dataStore from "./Store/store";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";

function App() {
  let AppWrapper = useRef(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden scroll",
      }}
      ref={AppWrapper}
    >
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
      {/* Outlet where App children data showed */}
      <ProductListProvider>
        <DefaultLayout>
          <Outlet context={AppWrapper} />
        </DefaultLayout>
      </ProductListProvider>
    </div>
  );
}
export default App;
