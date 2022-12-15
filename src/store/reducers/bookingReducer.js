import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    fetch:true
}

const bookingSlice = createSlice({
    name:'booking',
    initialState,
    reducers:{
        setBookings:(state, {payload})=>{
            console.log('setBookings')
            state.bookings = payload
            state.fetch = false
        },
        setFetch:(state)=>{
            state.fetch = true
        }
    }
})

export const bookingReducer = bookingSlice.reducer
export const {setBookings, setFetch} = bookingSlice.actions