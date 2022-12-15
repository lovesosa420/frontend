import React from 'react';
import { Link } from 'react-router-dom';

export const RoomCard = (props) => {
    return (
        <div className='flex flex-col w-[600px] p-8 bg-gray-100 rounded-md gap-4'>
            <p className='text-xl'>
                <span className='font-semibold'>Аудитория:</span> {props.name_room}
            </p>
            <img src={`http://127.0.0.1:8000/media/${props.photo}`} width="536px" alt={props.name_room}/>
            <p>Стоимость: {props.price}</p>
            <Link
                to={`/room/${props.id_room}`}
                className='py-2 px-4 bg-blue-500 rounded-md cursor-pointer text-center text-white font-semibold text-lg'
            >
                Посмотреть аудиторию
            </Link>
        </div>
    );
};
