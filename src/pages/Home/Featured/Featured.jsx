import img from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './featured.css'
const Featured = () => {
    return (
        <div className='featuredImg bg-fixed'>
            <SectionTitle subTitle="check it Out" title="Featured Item"></SectionTitle>
            <div className="flex space-x-4 justify-center items-center ps-10 pb-20 pr10 text-white ">
                <img src={img} className="w-2/4" />
                <div className='bg-slate-200 text-black p-4 bg-opacity-60'>
                    <h3>Aug,20,2024</h3>
                    <h1>Where can I get some?</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla eligendi rerum libero neque modi. Dolores suscipit qui fugit distinctio quaerat illo illum quo harum odio, deserunt quisquam! Rem asperiores voluptatibus in recusandae laborum! Magni eum quibusdam consequatur impedit, odio consequuntur nulla asperiores architecto eius laudantium iusto est. Fuga, totam veniam.</p>
                    <button className='btn btn-warning'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;