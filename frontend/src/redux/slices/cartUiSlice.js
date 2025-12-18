import { createSlice } from "@reduxjs/toolkit";

const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen !== state.isOpen;
    },
  },
});

export const { openCart, closeCart, toggleCart } = cartUiSlice.actions;
export default cartUiSlice.reducer;
