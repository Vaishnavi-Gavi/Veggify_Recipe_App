import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleProduct = () => {
    const item = useLoaderData();
    
    if (!item) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const extractNumber = (timeString) => {
        if (!timeString || typeof timeString !== 'string') return 0;
        let timeArray = timeString.split(" ");
        return parseInt(timeArray[0]) || 0;
    }
    
    const moreData = item?.more?.[0] || {};
    let prepTimeMinutes = extractNumber(moreData.prep_time);
    let cookTimeMinutes = extractNumber(moreData.cook_time);
    
    const totaltimesMinutes = prepTimeMinutes + cookTimeMinutes
  return (
    <section className='min-h-dvh md:flex justify-center items-center md:bg-eggshell animate-fade-in'>
        <article className='w-full max-w-6xl'>
            <div className='bg-white md:my-[5rem] md:py-8 pb-8 md:rounded-xl animate-slide-up'>
                <picture>
                    <img src={item.thumbnail_image} alt={item.name} className='md:max-w-[90%] w-full md:h-[570px] md:rounded-xl md:mx-auto'/>
                </picture>
                <div className='px-8 '>
                    <h1 className='text-4xl mt-12 text-secondary'>{item.name}</h1>
                    {item.instructions && (
                        <p className='mt-6 text-gray-700 leading-relaxed'>{item.instructions}</p>
                    )}

                    <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-wrap items-center gap-2'>
                            {item.category && (
                                <span className='px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium'>
                                    {item.category}
                                </span>
                            )}
                            {moreData.difficulty && (
                                <span className='px-3 py-1 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium'>
                                    {moreData.difficulty}
                                </span>
                            )}
                            {moreData.source && (
                                <span className='px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium'>
                                    Source: {moreData.source}
                                </span>
                            )}
                        </div>
                        {Array.isArray(item.tags) && item.tags.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                                {item.tags.map((t, i) => (
                                    <span key={i} className='px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs'>
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <article className='bg-rose-50 mt-6 p-5 rounded-xl'>
                        <h3 className='text-xl font-semibold ml-2'>Preparation time</h3>
                        <ul className='list-disc mt-3 ml-8 text-lg marker:text-orange-300'>
                            <li className='pl-3 '>
                                <p>
                                    <span>Total: </span>
                                    <span>{totaltimesMinutes} minutes</span>
                                </p>
                            </li>
                             <li className='pl-3 mt-3'>
                                <p>
                                    <span>Preparation: </span>
                                    <span>{moreData.prep_time || 'N/A'}</span>
                                </p>
                            </li>
                             <li className='pl-3 mt-3'>
                                <p>
                                    <span>Cooking: </span>
                                    <span>{moreData.cook_time || 'N/A'}</span>
                                </p>
                            </li>
                            {moreData.servings && (
                                <li className='pl-3 mt-3'>
                                    <p>
                                        <span>Serves: </span>
                                        <span>{moreData.servings}</span>
                                    </p>
                                </li>
                            )}
                        </ul>
                    </article>
                    {/* Resource Bar */}
                    <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-sm text-gray-500'>Total Time</p>
                            <p className='text-lg font-semibold text-gray-800'>{totaltimesMinutes} mins</p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-sm text-gray-500'>Prep</p>
                            <p className='text-lg font-semibold text-gray-800'>{moreData.prep_time || 'N/A'}</p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-sm text-gray-500'>Cook</p>
                            <p className='text-lg font-semibold text-gray-800'>{moreData.cook_time || 'N/A'}</p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-sm text-gray-500'>Difficulty</p>
                            <p className='text-lg font-semibold text-gray-800'>{moreData.difficulty || 'Easy'}</p>
                        </div>
                    </div>
                    {item.ingredients && item.ingredients.length > 0 && (
                        <article className='mt-6 p-5 rounded-xl bg-blue-50'>
                            <h3 className='text-xl font-semibold mb-4'>Ingredients</h3>
                            <ul className='list-disc ml-8 text-lg'>
                                {item.ingredients.map((ing, idx) => (
                                    <li key={idx} className='pl-3 mt-2'>
                                        <span>{ing.quantity} {ing.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    )}
                </div>
            </div>
        </article>

    </section>
  )
}


export default SingleProduct