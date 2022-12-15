import {useDispatch, useSelector} from "react-redux";
import {BookingCard} from "../components/BookingCard";
import {useEffect} from "react";
import {axiosInstance} from "../api";
import {setBookings, setFetch} from "../store/reducers/bookingReducer";

export const BookingPage = () =>{
    const dispatch = useDispatch()
    const {bookings, fetch} = useSelector(store=>store.booking)
    useEffect(()=>{
        const fetchBooking = async () => {
            await axiosInstance.get('/rents-full').then(response => dispatch(setBookings(response?.data)))
        }
        fetchBooking()
    },[fetch, dispatch])

    return <div>{!!bookings && bookings.map(booking => <BookingCard key={booking.number_rent} {...booking}/>)}</div>
}