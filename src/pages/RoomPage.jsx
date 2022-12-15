import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../api";
import {resetRoom, setRoom} from "../store/reducers/roomReducer";
import dayjs from "dayjs";

export const RoomPage = () => {
    const { id_room } = useParams();
    const dispatch = useDispatch()
    const {room} = useSelector(store=>store.room)
    const {authorized} = useSelector(store=>store.user)

    useEffect(() => {
        const fetchRoom = async () => {
            id_room && axiosInstance.get(`/rooms-full/${id_room}`, ).then(response => dispatch(setRoom(response?.data)))
        }
        fetchRoom()
        return () => {
            dispatch(resetRoom())   
        }
    }, [dispatch, id_room]);

    const handleClick = async () => {
        const values = {
            date_rent: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            date_signing: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            person: "test",
            room: room.id_room,
            status: 1
        }
        console.log(values)
        await axiosInstance.post('/rents/', values)

    }


    return (
        <div className='flex flex-col px-8 rounded-md gap-2'>
            {!!room && (
                <div className='pb-4'>
                    <Link to='/' className='font-semibold'>
                        Главная
                    </Link>
                    <span> / </span>
                    <Link to={`/building/${room.building?.id_building}`} className='font-semibold'>
                        {room.building?.name_building}
                    </Link>
                    <span> / </span>
                    <Link to='' className='font-semibold'>
                        {room.name_room}
                    </Link>
                </div>
            )}

            <img src={`http://127.0.0.1:8000/media/${room.photo}`} width="800px" alt={room.name_room}/>
            <p className='text-xl'>
                <span className='font-semibold'>Здание:</span> {room.building?.name_building}
            </p>
            <p className='text-xl'>
                <span className='font-semibold'>Аудитория:</span> {room.name_room}
            </p>
            <p className='text-xl'>
                <span className='font-semibold'>Тип:</span> {room.kind}
            </p>
            <p className='text-xl'>
                <span className='font-semibold'>Вместимость:</span> {room.size}
            </p>
            <p className='text-xl'>
                <span className='font-semibold'>Стоимость:</span> {room.price} р.
            </p>
            {authorized && <button
                className='py-2 px-6 rounded-md self-start text-white font-semibold text-lg bg-blue-500'
                onClick={handleClick}
            >
                Забронировать
            </button>}
        </div>
    );
};
