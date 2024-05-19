import React from 'react';

const SectionTitle = ({title,subTitle}) => {
    return (
        <div className='my-8 mx-auto md:w-3/12 text-center'>
            <h3 className='text-xl text-yellow-500'>{subTitle}</h3>
            <h1 className='text-4xl uppercase border-y-2 py-4'>{title}</h1>
        </div>
    );
};

export default SectionTitle;