import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buildings: [],
    building: {},
};

export const buildingSlice = createSlice({
    name: 'building',
    initialState,
    reducers: {
        setBuildings: (state, { payload }) => {
            console.log('setBuildings');
            state.buildings = payload;
        },
        setBuilding: (state, { payload }) => {
            console.log('setBuilding');
            state.building = payload;
        }
    },
});

export const { setBuilding, setBuildings } = buildingSlice.actions;

export const buildingReducer = buildingSlice.reducer;
