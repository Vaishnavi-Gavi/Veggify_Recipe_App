import React from 'react'
import Hero from '../../components/Hero'
import CategoryWrapper from '../category/CategoryWrapper'
import FeaturedSection from './FeaturedSection'
import LatestRecipe from './LatestRecipe'
import NewsLetter from './NewsLetter'
import CompanyLogo from './CompanyLogo'
import Subscription from './Subscription'
const Home = () => {
  return (
    <div className="container mx-auto">
      <div className='flex flex-col justify-center items-center w-full py-20'> 
      <Hero/>
      <CategoryWrapper/>
      </div>
      {/* Featured Section */}
      <FeaturedSection/>
      <LatestRecipe/>
      <NewsLetter/>
      <CompanyLogo/>
      <Subscription/>
      
    </div>
  )
}

export default Home