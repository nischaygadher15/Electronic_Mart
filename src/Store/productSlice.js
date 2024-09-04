import { createSlice } from "@reduxjs/toolkit";
import useFetchProducts from "./useFetchProducts";

let productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
  },
  reducers: {
    SET_PRODUCTS: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { SET_PRODUCTS } = productSlice.actions;
export const selectProducts = (state) => state.products.product;
export default productSlice;
