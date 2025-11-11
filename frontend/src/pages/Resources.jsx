import React from 'react';

const Resources = () => {
    return (
        <div className='px-6 lg:px-12 py-20'>
            <h1 className='text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed'>Cooking Resources</h1>
            
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-btnColor">Cooking Tips</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Always taste your food while cooking</li>
                            <li>• Keep your knives sharp for better cuts</li>
                            <li>• Use fresh ingredients whenever possible</li>
                            <li>• Don't be afraid to experiment with spices</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-btnColor">Kitchen Essentials</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Good quality chef's knife</li>
                            <li>• Cutting board</li>
                            <li>• Measuring cups and spoons</li>
                            <li>• Mixing bowls</li>
                            <li>• Non-stick pan and required utensils</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-btnColor">Cooking Techniques</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Sautéing vegetables properly</li>
                            <li>• Perfect rice cooking methods</li>
                            <li>• Marinating techniques</li>
                            <li>• Baking temperature control</li>
                            <li>• Seasoning balance</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-btnColor">Food Safety</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Wash hands before cooking</li>
                            <li>• Wash vegetables before use </li>
                            <li>• Cook to proper temperatures</li>
                            <li>• Store leftovers safely</li>
                            <li>• Check expiration dates</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
