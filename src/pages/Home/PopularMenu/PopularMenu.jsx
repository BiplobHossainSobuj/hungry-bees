import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const PopularMenu = () => {
    const [menuItems,setMenuItems] = useState([]);
    useEffect(()=>{
        fetch('menu.json')
        .then(res=>res.json())
        .then(data=>{
            const popular = data.filter(item=>item.category=='popular');
            setMenuItems(popular);
        })
    },[])
    return (
        <div>
            <SectionTitle title="From Our Menu" subTitle="Popular Item"></SectionTitle>
            <div className='grid md:grid-cols-2 gap-6 my-4'>
                {
                    menuItems.map(item=><MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>) 
                }
            </div>
        </div>
    );
};

export default PopularMenu;