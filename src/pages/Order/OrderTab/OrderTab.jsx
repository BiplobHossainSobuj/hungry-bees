import React, { useState } from 'react';
import FoodCard from '../../Shared/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const OrderTab = ({ items }) => {
    // const [currentPage,setCurrentPage] = useState(0);
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    const itemsTotal = items.length;
    const itemPerPage = 6;
    const pageNeeded = Math.ceil(itemsTotal/itemPerPage);
    const pages = [...Array(pageNeeded).keys()];
    // console.log(currentPage);
    return (
        <div >

            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-3 my-6 '>
                        {
                            items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </SwiperSlide> */}
                {
                    pages.map(page=><SwiperSlide key={page}>
                        <div className='grid grid-cols-1 md:grid-cols-3 my-6 '>
                            {
                                items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                            }
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default OrderTab;