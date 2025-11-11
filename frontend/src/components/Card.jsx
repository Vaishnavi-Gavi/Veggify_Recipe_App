import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { GoClock } from "react-icons/go";
import { MdTimer } from "react-icons/md";
import { TbChefHat } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
const Card = ({ item }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const goToItem = () => {
        const target = `/items/${item?._id || item?.menuid}`;
        navigate(target);
    };
    const categoryStyles ={
        Entrees:{ backgroundColor:"#f0f5c4", color:"#59871f"},
        Breakfast: {backgroundColor:"#efedfa",color:"#3c3a8f"},
        Lunch: {backgroundColor:"#e5f7f3" ,color:"#1f8787"},
        Desserts: {backgroundColor:"#e8f5fa", color:"#397a9a"},
        Sides: {backgroundColor:"#feefc9", color:"#d16400"},
        Drinks: {backgroundColor:"#ffeae3", color:"#f0493e"},
        default: {backgroundColor:"#fff",color:"#000"},
    };
    const getCategoryStyle=(category)=>{
        return categoryStyles[category] || categoryStyles.default;
    }
    const categoryStyle = getCategoryStyle(item?.category)
    return (
        
        <div className="container mx-auto flex justify-center md:justify-start animate-slide-up">
            <div className="max-w-sm">
                <div onClick={goToItem} className="bg-white relative shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg hover:scale-105 cursor-pointer">
                    <img src={item?.thumbnail_image} alt={item?.name || 'thumbnail'} className="rounded-t-lg w-full h-48 md:h-56 object-cover" />
                    <div className='py-6 px-5 rounded-lg bg-white'>
                        <button onClick={goToItem} className="text-left w-full">
                            <h1 className="text-gray-700 font-bold text-2xl mb-8 hover:text-gray-900 hover:cursor-pointer">{item?.name}</h1>
                        </button>
                        
                        <div className='flex justify-between items-center  flex-wrap'>
                            <button className={`mt-6 py-2 px-4 font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300`}
                            style={
                                {
                                    backgroundColor: categoryStyle.backgroundColor,
                                    color: categoryStyle.color,
                                }
                            }>{item?.category}</button>
                            <div className='flex flex-col gap-2 mt-6'>
                                <div className='flex items-center bg-gray-50 rounded-lg px-3 py-2'>
                                    <MdTimer className='text-blue-500' size={16} />
                                    <span className='ml-2 text-sm font-medium text-gray-700'>Prep: {item?.more?.[0]?.prep_time}</span>
                                </div>
                                <div className='flex items-center bg-gray-50 rounded-lg px-3 py-2'>
                                    <GoClock className='text-green-500' size={16} />
                                    <span className='ml-2 text-sm font-medium text-gray-700'>Cook: {item?.more?.[0]?.cook_time}</span>
                                </div>
                                <div className='flex items-center bg-gray-50 rounded-lg px-3 py-2'>
                                    <HiUsers className='text-purple-500' size={16} />
                                    <span className='ml-2 text-sm font-medium text-gray-700'>Serves: {item?.more?.[0]?.servings}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-2 right-2 py-2 px-3 bg-white rounded-lg shadow-md flex items-center gap-1'>
                        <TbChefHat className='text-orange-500' size={16} />
                        <span className='font-medium text-sm text-gray-700'>{item?.more?.[0]?.difficulty}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card;