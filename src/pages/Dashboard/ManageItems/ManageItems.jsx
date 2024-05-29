
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menuItems,loading,refetch] = useMenu();
    const axiosSecure = useAxios();
    const handleDeleteItem =(item)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    
    return (
        <div>
            <SectionTitle title={'Manage Items'} subTitle={'Hurry Up'}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menuItems.map((item,index)=><tr key={item._id}>
                                <th>{index+1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                    <button className="btn btn-lg bg-red-500">
                                        <FaEdit className="text-2xl"></FaEdit>
                                    </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-lg bg-red-500">
                                        <FaTrash className="text-2xl"></FaTrash>
                                    </button>
                                </td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                    

                </table>
            </div>
        </div>
    );
};

export default ManageItems;