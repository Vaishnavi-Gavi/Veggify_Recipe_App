import React from 'react' ;
import { Link } from 'react-router-dom';
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
const MobileNav = ({menuItems, Logo,onClose,hideLeft,onOpen}) => {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
       <a href="/">
        <img src={Logo} alt="logo"/>
        </a>
        <button onClick={onOpen} className='border border-primary rounded'>
            <HiBars3BottomRight className='w-7 h-7'/>
        </button>
         <div className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center`}>
            <button onClick={onClose} className='absolute right-8 top-32'>
                <RiCloseCircleLine className='w-7 h-7'/>
            </button>
            <div>
              <ul className='flex flex-col gap-5'>
                {menuItems?.map((menu, index) => (
                  <li key={index}>
                    <Link to={menu} className='font-medium capitalize text-secondary text-2xl'>{menu}</Link>
                    </li>
                ))}
              </ul>
               <ul className='flex flex-col gap-4 font-medium mt-10'>
                <li>
                  <Link to="/create-recipe" className='text-btnColor px-4 py-2 rounded border border-btnColor block text-center hover:bg-btnColor hover:text-white transition-all'>Create Recipe</Link>
                </li>
                <li>
                  <Link to="/login" className='text-secondary px-4 py-2 rounded border block text-center'>Log In</Link>
                </li>
                <li>
                  <Link to="/signup" className='bg-btnColor text-white px-4 py-2 rounded block text-center hover:bg-opacity-90 transition-all'>Sign Up</Link>
                </li>
               </ul>
            </div>
        </div> 
    </div>
  )
}

export default MobileNav