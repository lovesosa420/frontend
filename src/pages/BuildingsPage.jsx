import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BuildingCard } from '../components/BuildingCard';
import { setBuildings } from '../store/reducers/buildingReducer';
import {axiosInstance} from "../api";

export const BuildingsPage = () => {
    const dispatch = useDispatch();
    const { buildings } = useSelector((store) => store.building);
    useEffect(() => {
        const fetchBuildings = async () => {
            await axiosInstance
                .get('/buildings')
                .then((response) => dispatch(setBuildings(response?.data)));
        }
        fetchBuildings()
    }, [dispatch]);

    return (
        <div className='flex gap-4 px-8 flex-col'>
            <div className='pb-4'>
                <Link to='/' className='font-semibold'>
                    Главная
                </Link>
            </div>
            {buildings.length > 0 && buildings.map((building) => <BuildingCard key={building.name_building} {...building} />)}
        </div>
    );
};
