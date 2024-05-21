import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import useCart from '../../../hooks/useCart';

const FoodCard = ({ item }) => {
    const[,refetch] = useCart();
    const {image,price,_id,name} = item;
    const {user} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios()
    const  handleAddToCart=(item)=>{
       if(user && user.email){
        const cartItem = {
            menuId:_id,
            name,
            email:user.email,
            image,
            price
        }
        axiosInstance.post('/carts',cartItem)
        .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item is added to the cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch();//update the cart item
            }
        })
       }
       else{
        Swal.fire({
            title: "Please Log in?",
            text: "You won't be able to add this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
          }).then((result) => {
            if (result.isConfirmed) {
              //send the user to login
              navigate('/login',{state:{from:location}})
            }
          });
       }
    }
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='bg-slate-800 text-white absolute right-6 p-2'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button onClick={()=>handleAddToCart(item)} className="btn btn-outline border-0 border-b-2">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;