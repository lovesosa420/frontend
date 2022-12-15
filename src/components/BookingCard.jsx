import React from "react";
import dayjs from 'dayjs'
import {useDispatch} from "react-redux";
import {axiosInstance} from "../api";
import {setFetch} from "../store/reducers/bookingReducer";

export const BookingCard = (props) => {
    const dispatch = useDispatch()
    const handleClick = async () => {
        await axiosInstance.delete(`/rents/${props.number_rent}/`)
        dispatch(setFetch())
        console.log('rent delete')
    }
    return <div className='flex flex-col gap-2 p-4 bg-gray-200 rounded-md m-4'>
        <img src={`http://127.0.0.1:8000/media/${props.room?.photo}`} width="600px" alt={props.room?.name_room}/>
        <p>Дата брони: {dayjs(props.date_rent).format('YYYY.MM.DD HH:mm')}</p>
        <p>Дата оплаты: {dayjs(props.date_signing).format('YYYY.MM.DD HH:mm')}</p>
        <p>Название аудитории: {props.room?.name_room}</p>
        <p>Тип аудитории: {props.room?.kind}</p>
        <p>Стоимость аудитории: {props.room?.price}</p>
        <p>Здание: {props.room?.building?.name_building}</p>
        <button onClick={handleClick}>Отменить бронь</button>
    </div>
}