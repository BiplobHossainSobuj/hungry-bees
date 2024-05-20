import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])
    return (
        <section>
            <SectionTitle title={"Testimonials"} subTitle={"What our client says"}></SectionTitle>
            <Swiper
                navigation={true} modules={[Navigation]} className="mySwiper my-20"
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className='flex flex-col justify-center items-center space-y-6'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                            <p>{review.details}</p>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </section>
    );
};

export default Testimonial;