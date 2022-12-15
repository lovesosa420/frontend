import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {axiosInstance} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {setBuilding} from "../store/reducers/buildingReducer";
import {resetRooms, setRooms} from "../store/reducers/roomReducer";
import {RoomCard} from "../components/RoomCard";
import {useDebounce} from "../hooks/useDebounce";

export const BuildingPage = () => {
    const { id_building } = useParams();
    const dispatch = useDispatch()
    const {building} = useSelector(store=>store.building)
    const {rooms} = useSelector(store=>store.room)
    const [minCost, setMinCost] = useState('')
    const [maxCost, setMaxCost] = useState('')
    const [q, setQ] = useState('')
    const [value, setValue] = useState({})
    const debouncedQ = useDebounce(q)
    const debouncedMinCost = useDebounce(minCost)
    const debouncedMaxCost = useDebounce(maxCost)

    const handleQuery = () => {
        const values = {}
        if(minCost !== ''){
            values.min_cost = debouncedMinCost
        }
        if(maxCost !== ''){
            values.max_cost = debouncedMaxCost
        }
        if(q !== ''){
            values.q = debouncedQ
        } else {
            values.q = 'all'
        }
        setValue(values)
    }
    const handleMinCost = (e) => {
        +e.target.value === 0 ? setMinCost('') : setMinCost(+e.target.value)
    }

    const handleMaxCost = (e) => {
        +e.target.value === 0 ? setMaxCost('') : setMaxCost(+e.target.value)

    }

    useEffect(()=>{
        const fetchBuilding = async () => {
            id_building && await axiosInstance.get(`/buildings/${id_building}`).then(response => dispatch(setBuilding(response?.data)))
        }
        const fetchRooms = async () => {
            id_building && await axiosInstance.get('/rooms-full', {params:value}).then(response=>dispatch(setRooms({rooms:response?.data, id_building})))
        }
        fetchBuilding()
        fetchRooms()
        return () =>{
            dispatch(resetRooms())
        }
    },[dispatch, id_building, value])

    return (
        <div className='flex gap-4 px-8 flex-col'>
            <div className='pb-4'>
                <Link to='/' className='font-semibold'>
                    Главная
                </Link>
                <span> / </span>
                <Link to={`/building/${building.name_building}`} className='font-semibold'>
                    {building.name_building}
                </Link></div>
            <div className='flex gap-2'>
                <div className='flex flex-col gap-2'>
                    <p>Минимальная стоимость: </p>
                    <input value={minCost} onChange={handleMinCost} placeholder='Введите значение...'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Максимальная стоимость: </p>
                    <input value={maxCost} onChange={handleMaxCost} placeholder='Введите значение...'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>По названию: </p>
                    <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Введите значение...'/>
                </div>
                <button onClick={handleQuery}>Поиск</button>
            </div>
            {rooms.length > 0 ?rooms.map((room) => (
                <RoomCard key={room.id_room} {...room} />
            )) : <p>Нет аудиторий</p>}
        </div>
    );
};
