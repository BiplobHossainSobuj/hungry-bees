import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';


const imgHostingKey = import.meta.env.VITE_image_hosting_key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
const UpdateItem = () => {
    const item = useLoaderData();
    console.log(item);
    const {_id,name,recipe,price,image,category} = item;
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxios();
    const onSubmit = async(data) => {
        console.log(data);
        const imgFile = {image:data.image[0]}
        const res = await axiosPublic.post(imgHostingApi,imgFile,{
            headers:{'content-type': 'multipart/form-data'}
        })
        if(res.data.success){
            const menuItem = {
                name:data.name,
                category: data.category,
                price:data.price,
                recipe:data.recipe,
                image:res.data.data.display_url
            }
            //send data to DB
            const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem);
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
            }
        }
        console.log(res.data);
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Recipe name*</span>

                            </div>
                            <input {...register("name")} defaultValue={name}  type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className='flex gap-6'>
                        <div className='w-full'>
                            <label className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Category*</span>
                                </div>
                                <select defaultValue={category} {...register("category")}
                                    className="select select-bordered w-full"
                                >
                                    <option disabled value={category}>Select Category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </label>
                        </div>
                        <div className='w-full'>
                            <label className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Price*</span>
                                </div>
                                <input {...register("price")} defaultValue={price}  type="number" placeholder="Type here" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full my-6">
                    <textarea {...register("recipe")} defaultValue={recipe} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    <div className="form-control w-full my-6">
                    <input type="file" {...register("image")}  className="file-input w-full max-w-xs" />
                    </div>
                    <button className='btn bg-amber-400'>
                        Update <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;