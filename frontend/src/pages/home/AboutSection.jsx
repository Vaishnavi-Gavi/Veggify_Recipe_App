import  React from 'react'
import { Link } from 'react-router-dom';

import AboutImage from '../../assets/about-image.jpg';


const AboutSection = () => {
    return (
        <div className='px-6 lg:px-12 py-20'>
            <h1 className='text-center text-2xl md:text-4xl py-8 font-semibold text-secondary leading-snug max-w-3xl mx-auto'>About Veggify</h1>
            
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-btnColor">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Veggify is your ultimate recipe hub, bringing together food lovers from around the world. 
                        We believe that cooking should be accessible, fun, and delicious for everyone. Our platform 
                        connects home cooks, professional chefs, and food enthusiasts to share their favorite recipes, 
                        cooking tips, and culinary experiences.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-btnColor">What We Offer</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Thousands of tested recipes</li>
                            <li>• Step-by-step cooking instructions</li>
                            <li>• Nutritional information</li>
                            <li>• User reviews and ratings</li>
                            <li>• Cooking tips and techniques</li>
                            <li>• Community features</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-btnColor">Our Community</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Home cooks sharing family recipes</li>
                            <li>• Professional chefs contributing expertise</li>
                            <li>• Food bloggers and influencers</li>
                            <li>• Cooking enthusiasts and beginners</li>
                            <li>• International cuisine lovers</li>
                            <li>• Health-conscious foodies</li>
                        </ul>
                    </div>
                </div>
                
                <div className="bg-orange-50 p-8 rounded-lg mt-8">
                    <h3 className="text-2xl font-semibold mb-4 text-btnColor">Join Our Community</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Whether you're a seasoned chef or just starting your culinary journey, Veggify welcomes you. 
                        Share your favorite recipes, discover new flavors, and connect with fellow food lovers from around the world.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/signup" className="bg-btnColor text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300">
                            Get Started
                        </Link>
                        <Link to="/create-recipe" className="border border-btnColor text-btnColor px-6 py-3 rounded-lg font-semibold hover:bg-btnColor hover:text-white transition-all duration-300">
                            Share Recipe
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AboutSection;