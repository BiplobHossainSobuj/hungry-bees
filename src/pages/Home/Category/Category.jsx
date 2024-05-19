import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from'../../../assets/home/slide1.jpg';
import img2 from'../../../assets/home/slide2.jpg';
import img3 from'../../../assets/home/slide3.jpg';
import img4 from'../../../assets/home/slide4.jpg';
import img5 from'../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <>
        <SectionTitle title={"Order Online"} subTitle={"From 11am to 9pm"}></SectionTitle>
            <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-6"
      >
        <SwiperSlide>
            <img src={img1} alt="" />
            <h3 className='text-4xl text-white text-center -mt-16'>Salad</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img2} alt="" />
            <h3 className='text-4xl text-white text-center -mt-16'>Pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img3} alt="" />
            <h3 className='text-4xl text-white text-center -mt-16'>Coffee</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img4} alt="" />
            <h3 className='text-4xl text-white text-center -mt-16'>Dessart</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img5} alt="" />
            <h3 className='text-4xl text-white text-center -mt-16'>Salad</h3>
        </SwiperSlide>
        
      </Swiper>
        </>
    );
};

export default Category;