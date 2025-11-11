import React from 'react'
import{Link} from 'react-router-dom'

const DesktopNav = ({menuItems,Logo}) => {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
        <a href="/">
        <img src={Logo} alt="logo"/>
        </a>
        <ul className='flex gap-7'>
          {
            menuItems?.map((menu,index) => 
            (
              <li key={index}>
                <Link to={menu} className='font-medium capitalize text-secondary'>{menu}</Link>
              </li>
            ))
          }
        </ul>
        {/* login and signup btn */}
        <ul className='flex items-center gap-4 font-medium'>
          <li>
            <Link to="/create-recipe" className='text-btnColor px-4 py-2 rounded hover:bg-btnColor hover:text-white transition-all duration-300'>Create Recipe</Link>
          </li>
          <li>
            <Link to="/login" className='text-secondary px-4 py-2 rounded hover:text-btnColor transition-colors'>Log In</Link>
          </li>
          <li>
            <Link to="/signup" className='bg-btnColor text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300'>Sign Up</Link>
          </li>
        </ul>
    </div>
  )
}
export default DesktopNav