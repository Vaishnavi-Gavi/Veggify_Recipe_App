import React from 'react'
import {IoSearchOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className='px-5 xl:px-10 md:w-1/2 mb-10'>
      <h1 className='mt-6 mb-10 text-5xl xl:text-6xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed'>
        The <span className='text-lime-900'>Creator's</span> Recipe Hub for <span className='text-orange-700'>Foodie's </span></h1>
        <form action="/search" className='bg-white p-4 rounded relative flex items-center'>
        <IoSearchOutline className='w-5 h-5 mr-2 text-gray-700'/>
        <input className='outline-none w-full placeholder:text-[#1b2629]' name="query" 
        type="search" placeholder='Search for a Recipe' id="search" required=""/>
        </form>
    </div>
  )
}

export default Hero