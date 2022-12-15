import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {handleAuthorized} from "../store/reducers/userReducer";

export const Header = () => {
    const dispatch = useDispatch()
    const {authorized} = useSelector(store=>store.user)
    const handleAuth = () => {
        dispatch(handleAuthorized())
    }
    return (
        <div className='flex w-full justify-between items-center gap-4 bg-gray-200 p-4'>
            <Link to='/' className='cursor-pointer font-semibold text-xl'>
                МГТУ им. Н.Э.Баумана
            </Link>
            <div className='flex gap-4 items-center'>
                {authorized && <Link to="/booking">Корзина</Link>}
                <button className="text-red-600" onClick={handleAuth}>{authorized? 'Выйти' : 'Войти'}</button>
            </div>
        </div>
    );
};
