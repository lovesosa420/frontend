import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [],
    room: {},
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (state, { payload }) => {
            console.log('setRooms')
            state.rooms = payload.rooms.filter(room=>room.building?.id_building === +payload.id_building)
        },
        setRoom: (state, { payload }) => {
            console.log('setRoom');
            state.room = payload;
        },
        resetRooms:(state)=>{
            console.log('resetRooms')
            state.rooms = []
        },
        resetRoom:(state)=>{
            console.log('resetRoom')
            state.room = {}
        },
    },
});

export const { setRoom, setRooms, resetRoom, resetRooms } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
