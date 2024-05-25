import React from 'react';
import { FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const admin = true;
    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu'>
                    {
                        admin ? <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome> Admin Home Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils>Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><FaList></FaList>Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaCalendar></FaCalendar>Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allUsers"><FaUsers></FaUsers>All Users</NavLink></li>
                        </> :
                            <>
                                <li><NavLink to="/dashboard/userHome"><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> Cart</NavLink></li>
                                <li><NavLink to="/dashboard/review"><FaShoppingCart></FaShoppingCart> Review</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar> Reservation</NavLink></li>
                                <li><NavLink to="/dashboard/bookings"><FaList></FaList> My Booking</NavLink></li>
                            </>
                    }
                    <div className='divider'></div>
                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/menu"><FaList></FaList>Menu</NavLink></li>
                    <li><NavLink to="/"><FaEnvelope></FaEnvelope>Contact</NavLink></li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;