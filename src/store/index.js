import { configureStore } from '@reduxjs/toolkit';
import { buildingReducer } from './reducers/buildingReducer';
import { roomReducer } from './reducers/roomReducer';
import {bookingReducer} from "./reducers/bookingReducer";
import {userReducer} from "./reducers/userReducer";

export const store = configureStore({
    reducer: { building: buildingReducer, room: roomReducer, booking:bookingReducer, user:userReducer },
});
