
import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-hot-toast'

const initalState ={
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem('totalItems')) : 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        totalItems : null 
    },
    reducers:{
         setTotalItems( state,value) {
            state.token = value.payload
         }
         // TODO : add to cart remove from cart resetcart
    }
})


export const { setTotalItems } = cartSlice.actions
export default cartSlice.reducer