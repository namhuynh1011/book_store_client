import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: undefined,
  cart: {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
};

const commonSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setCommonCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCommonCategories, setCart } = commonSlice.actions;

export default commonSlice.reducer;
