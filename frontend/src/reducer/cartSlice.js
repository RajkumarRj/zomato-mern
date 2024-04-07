import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id } = action.payload;
      const existingProduct = state.cart.find((item) => item._id === _id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    incrementQuantity: (state, action) => {
      const { _id } = action.payload;
      const item = state.cart.find((i) => i._id === _id);

      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const { _id } = action.payload;
      const item = state.cart.find((i) => i._id === _id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i._id !== _id);
        }
      }
    },

    removeFromCart: (state, action) => {
      const { _id } = action.payload;
      state.cart = state.cart.filter((item) => item._id !== _id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
