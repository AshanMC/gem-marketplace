import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartFromStorage,
  },
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;

      // ✅ Ensure type is always defined (default to 'product')
      const item = {
        ...payload,
        type: payload.type || "product",
      };

      const exists = state.cartItems.find(i => i._id === item._id);

      if (exists) {
        state.cartItems = state.cartItems.map(i =>
          i._id === exists._id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems.map(i =>
        i._id === id ? { ...i, qty } : i
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    }
  },
});

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
