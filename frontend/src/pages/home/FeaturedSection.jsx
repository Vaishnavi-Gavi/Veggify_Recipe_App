import React from 'react';
import FeaturedImg from '../../assets/featured.webp';
import { Link } from 'react-router-dom';

const FeaturedSection = () => {
    return (
        <div className='overflow-hidden flex md:flex-row flex-col justify-between items-center sm:my-20 my-4 md:gap-20 gap-12 px-5 lg:px-10'>
             <div className='relative'>
                <div className='absolute top-4 left-5 bg-white text-secondary px-3 py-1 rounded-md uppercase tracking-wider'>featured recipe</div>
                <img src={FeaturedImg} alt="Featured image" className='rounded-md' />
                </div>
                <div className='text-start sm:w-1/2'>
                    <h2 className='text-xl font-semibold text-secondary sm:text-5xl sm:leading-relaxed'>Pineapple + Smoked Jackfruit Pizza</h2>
                    <p className='text-xl mt-4 text-[#5c5c5c]'>A Bold fusion pizza topped with smoky jackfruit, sweet pineapple chunks, and tangy sauces, bringing a perfect balance of smoky, sweet, and savory flavors in every bite.</p>
                    <div className='lg:mt-0 lg:flex-shrink-0'>
                        <div className='mt-12 inline-flex'>
                            <Link to="/recipes" className='py-8 px-8 bg-btnColor text-secondary hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] docus:outline-none rounded-lg '>View recipe</Link>
                            </div>
                         </div>
                </div>
                </div>
                
    )
}
  export default FeaturedSection;