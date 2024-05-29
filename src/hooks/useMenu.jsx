import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    // const [menuItems,setMenuItems] = useState([]);
    // const [loading,setLoading] = useState(true);
    // useEffect(()=>{
    //     fetch('http://localhost:5000/menu')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setMenuItems(data);
    //         setLoading(false);
    //     })
    // },[])
    const {data:menuItems=[],refetch,isPending:loading} = useQuery({
        queryKey:['menu'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })
    return [menuItems,loading,refetch]
};

export default useMenu;