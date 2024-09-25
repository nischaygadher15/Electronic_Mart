import React, { createContext, useEffect, useState } from "react";
import products from "../../JSON_Data/ProductsList.js";
import { toast } from "react-toastify";

export const ProductId = createContext();

const ProductListProvider = ({ children }) => {
  // Loader
  let [isLoading, setisLoading] = useState(false);
  let [navBarMini, setNavbarMini] = useState(false);
  let showLoader = (t) => {
    setisLoading(true);
    setTimeout(() => setisLoading(false), t * 1000);
  };

  // Product Id
  let [pId, setPid] = useState("");

  return (
    <>
      <ProductId.Provider
        value={{
          showLoader,
          isLoading,
          setisLoading,
          navBarMini,
          setNavbarMini,
        }}
      >
        {children}
      </ProductId.Provider>
    </>
  );
};

export default ProductListProvider;
