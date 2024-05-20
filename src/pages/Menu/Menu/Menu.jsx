import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Menu = () => {
    const [menuItems] = useMenu();
    const dessert = menuItems.filter(item=>item.category=='dessert');
    const soup = menuItems.filter(item=>item.category=='soup');
    const salad = menuItems.filter(item=>item.category=='salad');
    const pizza = menuItems.filter(item=>item.category=='pizza');
    const offered = menuItems.filter(item=>item.category=='offered');
    return (
        <div>
            <Helmet>
                <title>Hungry Bees | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={'Menu'}></Cover>
            <SectionTitle title={'Today Offer'} subTitle={'Do not miss'}></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert items */}
            <MenuCategory items={pizza} title={'pizza'} coverImg={pizzaImg}></MenuCategory>
            {/* salad items */}
            <MenuCategory items={salad} title={'salad'} coverImg={saladImg}></MenuCategory>
            {/* dessert items */}
            <MenuCategory items={dessert} title={'dessert'} coverImg={saladImg}></MenuCategory>
            {/* soup items */}
            <MenuCategory items={soup} title={'soup'} coverImg={saladImg}></MenuCategory>
        </div>
    );
};

export default Menu;