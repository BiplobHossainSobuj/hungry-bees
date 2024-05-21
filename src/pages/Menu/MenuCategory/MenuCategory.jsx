import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../Cover/Cover';
import { Link } from 'react-router-dom';
const MenuCategory = ({ items,title,coverImg }) => {
    return (
        <div>
            {title && <Cover img={coverImg} title={title}></Cover>}
        <div className='grid md:grid-cols-2 gap-6 my-12'>
            {
                items.map(item => <MenuItem
                    key={item._id}
                    item={item}
                ></MenuItem>)
            }
        </div>
        <Link to={`/order/${title}`}><button className='btn btn-outline border-0 border-b-2 text-center'> order now</button></Link>
        </div>
    );
};

export default MenuCategory;