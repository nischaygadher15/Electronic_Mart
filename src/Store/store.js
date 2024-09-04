import { configureStore } from "@reduxjs/toolkit";
import Cart from "./cartSlice";
import userSlice from "./userSlice";
import filters from "./filters";
import productSlice from "./productSlice";

let dataStore = configureStore({
  reducer: {
    cart: Cart.reducer,
    user: userSlice.reducer,
    filter: filters.reducer,
    products: productSlice.reducer,
  },
});

export default dataStore;
