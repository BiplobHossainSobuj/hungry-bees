import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const imgHostingKey = import.meta.env.VITE_image_hosting_key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
const AddItems = () => {
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxios()
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
            const menuRes = await axiosSecure.post('/menu',menuItem);
            if(menuRes.data.insertedId){
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
            <SectionTitle subTitle={'whats new'} title={"Add Items"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Recipe name*</span>

                            </div>
                            <input {...register("name")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className='flex gap-6'>
                        <div className='w-full'>
                            <label className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Category*</span>
                                </div>
                                <select defaultValue={'default'} {...register("category")}
                                    className="select select-bordered w-full"
                                >
                                    <option disabled value={'default'}>Select Category</option>
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
                                <input {...register("price")} type="number" placeholder="Type here" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full my-6">
                    <textarea {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    <div className="form-control w-full my-6">
                    <input type="file" {...register("image")} className="file-input w-full max-w-xs" />
                    </div>
                    <button className='btn bg-amber-400'>
                        AddItems <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;