import React from 'react';
import { FaCalendar, FaHome, FaList, FaShoppingCart } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu'>
                    <li><NavLink to="/dashboard/userHome"><FaHome></FaHome> User Home</NavLink></li>
                    <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> Cart</NavLink></li>
                    <li><NavLink to="/dashboard/review"><FaShoppingCart></FaShoppingCart> Review</NavLink></li>
                    <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar> Reservation</NavLink></li>
                    <li><NavLink to="/dashboard/bookings"><FaList></FaList> My Booking</NavLink></li>
                    <div className='divider'></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;