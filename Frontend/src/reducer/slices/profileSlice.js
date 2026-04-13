import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name:"profile",
    initialState : {
        user : null
    },
    reducers:{
        setUser(state, value){
            state.user = value.payload
        }
    }
})

export const { setUser } = profileSlice.actions
export default profileSlice.reducer