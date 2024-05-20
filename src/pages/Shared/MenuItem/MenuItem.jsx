import React from 'react';

const MenuItem = ({item}) => {
    const {image,price,recipe,name} = item;
    return (
        <div className='flex space-x-4'>
            <img className='h-20 w-28' style={{borderRadius:'0 200px 200px 200px'}} src={image} />
            <div>
                <div className="flex justify-between">
                <h3 className='uppercase'>{name}-----------</h3>
                <p className='text-yellow-500'>${price}</p>
                </div>
                <p>{recipe}</p>
            </div>
        </div>
    );
};

export default MenuItem;