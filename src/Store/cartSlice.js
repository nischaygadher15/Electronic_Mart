import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectProducts } from "./productSlice";

let Cart = createSlice({
  name: "cart",
  initialState: {
    mycart: [],
    cartTotal: 0,
    savedUrl: "",
  },
  reducers: {
    addToCart: (state, action) => {
      let itemIndex = state.mycart.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex == -1) {
        state.mycart.push({ ...action.payload, qty: 1 });
        state.cartTotal += parseFloat(action.payload.productPrice);
        toast.success("Added to cart successfully.");
      } else {
        state.mycart[itemIndex].qty++;
        state.cartTotal += parseFloat(action.payload.productPrice);
        toast.info("Added to cart successfully.");
      }
    },
    incQty: (state, action) => {
      let itemIndex = state.mycart.findIndex(
        (item) => item.id == action.payload.id
      );
      state.mycart[itemIndex].qty++;
      state.cartTotal += parseFloat(action.payload.productPrice);
    },
    decQty: (state, action) => {
      let itemIndex = state.mycart.findIndex(
        (item) => item.id == action.payload.id
      );
      if (state.mycart[itemIndex].qty > 1) {
        state.mycart[itemIndex].qty--;
        state.cartTotal -= parseFloat(action.payload.productPrice);
      }
    },
    removeItem: (state, action) => {
      let filtered = state.mycart.filter(
        (item) => item.id != action.payload.id
      );
      state.mycart = [...filtered];
      state.cartTotal -=
        parseFloat(action.payload.productPrice) * action.payload.qty;
    },
    emptyCart: (state, action) => {
      state.mycart = [];
      state.cartTotal = 0;
    },
    saveUrl: (state, action) => {
      state.savedUrl = action.payload;
    },
  },
});

export const { addToCart, incQty, decQty, removeItem, emptyCart, saveUrl } =
  Cart.actions;
export const selectUrl = (state) => state.cart.savedUrl;
export default Cart;
