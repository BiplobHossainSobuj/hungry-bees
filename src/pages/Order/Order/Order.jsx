import React, { useState } from 'react';
import Cover from '../../Menu/Cover/Cover';
import orderCoverImg from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
const Order = () => {
    const categories = ['salad', 'pizza','soup','dessert', 'drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex,setTabIndex] = useState(initialIndex);
    const [menuItems] = useMenu();
    const dessert = menuItems.filter(item=>item.category=='dessert');
    const soup = menuItems.filter(item=>item.category=='soup');
    const salad = menuItems.filter(item=>item.category=='salad');
    const pizza = menuItems.filter(item=>item.category=='pizza');
    const drinks = menuItems.filter(item=>item.category=='drinks');
    
    return (
        <div>
            <Cover img={orderCoverImg} title={"Order Food"}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index)=>setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel><OrderTab items={salad}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={pizza}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={soup}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={dessert}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={drinks}></OrderTab></TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;