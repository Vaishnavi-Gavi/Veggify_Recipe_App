import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
const LatestRecipe = ()=>{
    const [items,setItems] =useState([]);
    const isAuthed = typeof window !== 'undefined' && !!localStorage.getItem('token');

    useEffect(()=>{
        if (!isAuthed) return;
        const getLatesItems=async ()=>{
            const response =await axios.get('/api/all-items');
            setItems(response.data);
        }
        getLatesItems()
    },[isAuthed])
    return(
        <div className='px-5 xl:px-10 py-16'>
            <h2 className='text-3xl font-semibold text-secondary sm:text-5xl sm:leading-relaxed'>Latest Recipe
        </h2>  
        {!isAuthed ? (
            <div className='mt-6 text-center'>
                <p className='text-gray-600 mb-6'>Sign up or log in to view the latest recipes.</p>
                <div className='flex gap-4 justify-center'>
                    <Link to="/signup" className='py-3 px-6 bg-btnColor text-white rounded-lg font-semibold'>Sign up</Link>
                    <Link to="/login" className='py-3 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700'>Log in</Link>
                </div>
            </div>
        ) : (
            <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {
                    items.length > 0 ? items.slice(0, 4).map((item) => (
                        <Card key={item._id || item.menuid} item={item}/>
                    )) : <p>Loading....</p>
                }
            </div>
            <div className='sm:w-64 mx-auto mt-16'>
                <Link to="/recipes" className='block'>
                 <button type="button" className='py-8 px-8 bg-btnColor text-secondary hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] docus:outline-none rounded-lg '>View All Recipes</button> 
                  </Link>
            </div>
            </>
        )}
        </div> 
            
   )
}
export default LatestRecipe;