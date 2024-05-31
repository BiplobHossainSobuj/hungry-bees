import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from 'sweetalert2'
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const handleLogout = () => {
        logout()
            .then(() => {
                console.log('logout');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log out succesfull",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Order</Link></li>
        
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        <li><Link to="/dashboard/cart">
            <button className="btn">
            <FaShoppingCart />
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </Link></li>
        {
            user ? <>
                <button onClick={handleLogout}>Log out</button></> :
                <><li><Link to="/login">Login</Link></li></>
        }
    </>

    return (
        <>
            <div className="navbar fixed max-w-screen-xl z-10 opacity-50 text-white bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Hungry Bees</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default Header;