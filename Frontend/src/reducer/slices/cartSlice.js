import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
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
      state.totalItems = 0;
    },

    addToCart: (state,action)=>{
      const course= action.payload
      const index= state.cart.findIndex((item) => item._id === course._id )

      if(index >=0)
      {
        toast.error("course already in cart")
        return 
      }

      // if the course is not in the cart add to in cart
      state.cart.push(course)
      //update the total quantity 
      state.totalItems++
      state.totat += course.price

      //update to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total",JSON.stringify(state.total))
      localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

      //show toast
      toast.success("course added to cart")

    },

    removeFromCart : (state,action) =>{
      const courseId = action.payload
      const index= state.cart.findIndex((item) => item._id === courseId)

      if(index >=0)
      {
        // if the course is not found in the cart remove it 
        state.totalItems--
        state.total -= state.cart[index].price
        state.cart.splice(index, 1)

        //update to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart))



      }

    }
  },
});

export const { setTotalItems, resetCart, removeFromCart , addToCart } = cartSlice.actions;
export default cartSlice.reducer;