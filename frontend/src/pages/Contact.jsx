import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
    };

    return (
        <div className='px-6 lg:px-12 py-20'>
            <h1 className='text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed'>Contact Us</h1>
            
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-btnColor">Get in Touch</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-orange-600 font-bold">📧</span>
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-gray-600">support@veggify.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-orange-600 font-bold">📱</span>
                                </div>
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-orange-600 font-bold">📍</span>
                                </div>
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-gray-600">123 Food Street, Culinary City, CC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-btnColor">Send us a Message</h2>
                        {submitted ? (
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-green-800 font-semibold mb-2">Thank you!</h3>
                                <p className="text-green-700">Your message has been sent successfully. We'll get back to you soon!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor"
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-btnColor text-white py-3 px-4 rounded-lg font-semibold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-btnColor transition-all duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

