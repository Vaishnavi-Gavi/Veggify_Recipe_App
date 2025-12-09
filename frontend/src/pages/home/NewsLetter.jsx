import React, { useState } from 'react'

const NewsLetter = ()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // { type: 'success'|'error', message: string }

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus(null);
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!name.trim() || !emailOk) {
            setStatus({ type: 'error', message: 'Please enter a valid name and email.' });
            return;
        }
        // Pretend to submit to backend/newsletter service
        console.log('Newsletter signup:', { name, email });
        setStatus({ type: 'success', message: 'Thanks for subscribing! Check your inbox for a welcome email.' });
        setName('');
        setEmail('');
    }

    return(
        <div className='w-full md:w-2/3 mx-auto flex flex-col items-center p-10'>
            <h2 className='text-secondary font-semibold text-center text-4xl'>Sign up for our weekly Newsletter!</h2>
            <p className='mt-6 text-orange-900 text-lg text-center leading-normal font-light'>Weekly emails with our latest recipes, cooking tips and tricks and product recommendations...! <br />You'll be set up in minutes.</p>

            {status && (
                <div className={`mt-4 w-full md:px-8 ${status.type === 'success' ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-700 bg-red-50 border border-red-200'} px-4 py-3 rounded`}> 
                    {status.message}
                </div>
            )}

            <form onSubmit={onSubmit} className='mt-6 flex flex-col md:flex-row items-center justify-center w-full md:px-8 gap-4 mb:20'>
                <input value={name} onChange={(e)=>setName(e.target.value)} className='flex flex-grow px-4 py-4 rounded text-black outline-none placeholder:text-[#1b2629] border border-gray-200 focus:ring-2 focus:ring-btnColor' type="text" placeholder='Name'/>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className='flex flex-grow px-4 py-4 rounded text-black outline-none placeholder:text-[#1b2629] border border-gray-200 focus:ring-2 focus:ring-btnColor' type="email" placeholder='Email Address'/>    
                <button type='submit' className='py-4 px-8 bg-btnColor text-white hover:bg-opacity-90 w-full md:w-auto transition ease-in duration-200 text-center text-base font-semibold rounded-lg'>Get Started</button>
            </form>
        </div>
    );
};
export default NewsLetter