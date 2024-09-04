import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { db } from "../Firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { SET_PRODUCTS } from "./productSlice";

const useFetchProducts = async () => {
  let products = [];
  try {
    let pBuffer = await getDocs(collection(db, "products"));
    pBuffer.docs.forEach((doc) => {
      products = [...products, doc.data()];
    });
  } catch (err) {
    toast.error(
      `Something went wrong during fetching data... => ${err.message}`
    );
  }
  return products;
};

export default useFetchProducts;
