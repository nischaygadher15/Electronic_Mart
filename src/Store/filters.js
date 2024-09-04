import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  product: [],
};

let filters = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      let data = [...action.payload.data];
      if (action.payload.category != "empty") {
        data = data.filter(
          (item) =>
            item.category.toLowerCase() == action.payload.category.toLowerCase()
        );
        state.product = [...data];
      } else {
        state.product = [...action.payload.data];
      }
    },

    searchByWord: (state, action) => {
      state.product = [...products];
      if (action.payload != "") {
        state.product = state.product.filter(
          (item) =>
            item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      }
    },

    sortByPrice: (state, action) => {
      state.product = [...action.payload.data];
      let pos = 0,
        breakCount = 0;

      if (action.payload.ch != 0) {
        while (true) {
          if (
            parseFloat(state.product[pos].productPrice) >
            parseFloat(state.product[pos + 1].productPrice)
          ) {
            let temp = state.product[pos];
            state.product[pos] = state.product[pos + 1];
            state.product[pos + 1] = temp;
            breakCount = 0;
          } else {
            breakCount++;
            if (breakCount == state.product.length - 1) break;
          }
          pos++;
          if (pos == state.product.length - 1) pos = 0;
        }
        if (action.payload.ch == -1) state.product.reverse();
      } else {
        state.product = [...action.payload.data];
      }
      console.log("Sorted Data form Filter", state.product);
    },

    sortByRatings: (state, action) => {
      state.product = [...action.payload];
      let pos = 0,
        breakCount = 0;

      while (true) {
        if (
          state.product[pos].rating.rate > state.product[pos + 1].rating.rate
        ) {
          let temp = state.product[pos];
          state.product[pos] = state.product[pos + 1];
          state.product[pos + 1] = temp;
          breakCount = 0;
        } else {
          breakCount++;
          if (breakCount == state.product.length - 1) break;
        }
        pos++;
        if (pos == state.product.length - 1) pos = 0;
      }
      state.product = state.product.reverse();
    },
  },
});

export const { filterByCategory, searchByWord, sortByPrice, sortByRatings } =
  filters.actions;
export const selectFilteredProducts = (state) => state.filter.product;
export default filters;
