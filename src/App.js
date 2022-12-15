import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BuildingsPage } from './pages/BuildingsPage';
import { BuildingPage } from './pages/BuildingPage';
import { RoomPage } from './pages/RoomPage';
import { Header } from './components/Header';
import {BookingPage} from "./pages/BookingPage";

export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<BuildingsPage />} />
                <Route path='/building/:id_building' element={<BuildingPage />} />
                <Route path='/room/:id_room' element={<RoomPage />} />
                <Route path='/booking' element={<BookingPage/>}/>
            </Routes>
        </>
    );
};
