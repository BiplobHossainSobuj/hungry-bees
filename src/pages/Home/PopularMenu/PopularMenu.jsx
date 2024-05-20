import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menuItems] = useMenu();
    const popular = menuItems.filter(item=>item.category=='popular');
    return (
        <div>
            <SectionTitle title="From Our Menu" subTitle="Popular Item"></SectionTitle>
            <div className='grid md:grid-cols-2 gap-6 my-4'>
                {
                    popular.map(item=><MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>) 
                }
            </div>
        </div>
    );
};

export default PopularMenu;