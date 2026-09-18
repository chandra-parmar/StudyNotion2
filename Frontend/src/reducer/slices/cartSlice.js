import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],

  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,

  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },

    resetCart(state) {
      state.cart = [];
      state.totalItems = 0;
      state.total = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },

    addToCart: (state, action) => {
      const course = action.payload;

      const index = state.cart.findIndex(
        (item) => item._id === course._id
      );

      if (index >= 0) {
        toast.error("course already in cart");
        return;
      }

      // Add course to cart
      state.cart.push(course);

      // Update total quantity
      state.totalItems++;

      // Update total price
      state.total += course.price;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem(
        "totalItems",
        JSON.stringify(state.totalItems)
      );

      // Show toast
      toast.success("course added to cart");
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload;

      const index = state.cart.findIndex(
        (item) => item._id === courseId
      );

      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;

        state.cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem(
          "totalItems",
          JSON.stringify(state.totalItems)
        );
      }
    },
  },
});

export const {
  setTotalItems,
  resetCart,
  removeFromCart,
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;