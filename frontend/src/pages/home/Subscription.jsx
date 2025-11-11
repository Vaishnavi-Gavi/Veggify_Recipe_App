import React, { useState } from 'react'

const Subscription = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Please enter your email address');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            // Simulate API call - replace with actual endpoint when available
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessage('Thank you for subscribing! You will receive our latest recipes and updates.');
            setEmail('');
        } catch (error) {
            setMessage('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-white py-16 rounded-t-md animate-slide-up'>
            <div className='max-w-screen-xl mx-auto px-6 lg:px-8 mb-20'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-20'>
                    <div className='md:w-1/2 animate-slide-right'>
                        <h3 className='text-3xl font-bold tracking-tight text-secondary sm:text-4xl'>Subscribe to our Newsletter</h3>
                        <p className='mt-4 text-lg leading-8'>
                            Stay Updated with our latest recipes, tips, and food inspiration. Subscribe now and Never miss a delicious update!
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className='sm:w-1/2 mt-6 flex flex-col sm:flex-row gap-4 w-full'>
                        <label htmlFor="email-address" className='sr-only'>
                            Email address
                        </label>
                        <input 
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-auto rounded-md border-0 bg-primary px-3.5 py-4 text-white placeholder:text-gray-300 shadow-sm text-sm sm:leading-6 focus:outline-btnColor focus:ring-2 focus:ring-btnColor"
                            placeholder='Enter your email'
                        />
                        <button 
                            type='submit' 
                            disabled={isSubmitting}
                            className='flex-none rounded-md bg-btnColor px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-btnColor hover:border-btnColor hover:border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                </div>
                {message && (
                    <div className={`mt-4 text-center ${message.includes('Thank you') ? 'text-green-600' : 'text-red-600'} animate-fade-in`}>
                        {message}
                    </div>
                )}
            </div>
            <hr />
        </div>
    )
}

export default Subscription