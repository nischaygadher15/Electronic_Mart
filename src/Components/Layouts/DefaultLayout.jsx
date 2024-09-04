import React, { useContext, useEffect } from "react";
import Header from "../Navbar/Header";
import { Provider } from "react-redux";
import dataStore from "../../Store/store";
import { ProductId } from "../Navbar/ProductContext";
import Loader from "../Loader";

const DefaultLayout = ({ children }) => {
  let { showLoader, isLoading } = useContext(ProductId);
  return (
    <>
      {isLoading && <Loader />}
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
