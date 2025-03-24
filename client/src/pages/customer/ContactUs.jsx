import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div>
            {/* first part  */}
            <div className="font-sans text-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                    <p className="text-sm text-gray-600 mb-8">Home / Contact Us</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column (Book Your Car Form) */}
                        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Book your car</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Car type</label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Hatchback</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Place of rental</label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option>Airport</option>
                                    <option>Downtown</option>
                                    <option>Train Station</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Place of return</label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option>Same as rental</option>
                                    <option>Different location</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Rental date</label>
                                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Return date</label>
                                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div>
                            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full">
                                Book now
                            </button>
                        </div>

                        {/* Right Column (Blurred Image) */}
                        <div className="bg-cover bg-center rounded-lg shadow-md " style={{ backgroundImage: 'url(/blur-image.png)' }}></div>
                        {/* Replace '/car-blur.jpg' with your blurred image */}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-yellow-500 mr-2" />
                            <div>
                                <p className="font-semibold">Address</p>
                                <p className="text-sm">Oxford Ave. Cary, NC 27511</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-yellow-500 mr-2" />
                            <div>
                                <p className="font-semibold">Email</p>
                                <p className="text-sm">nwiger@yahoo.com</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaPhoneAlt className="text-yellow-500 mr-2" />
                            <div>
                                <p className="font-semibold">Phone</p>
                                <p className="text-sm">+537 547-6401</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="text-yellow-500 mr-2" />
                            <div>
                                <p className="font-semibold">Opening hours</p>
                                <p className="text-sm">Sun-Mon: 10am - 10pm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* second part  */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Latest blog posts & news</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Blog Post 1 */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-w-16 aspect-h-9 bg-cover bg-center opacity-50 blur-lg" style={{ backgroundImage: 'url(/blog-image-1.jpg)' }}></div> {/* Replace with your image */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">How To Choose The Right Car</h3>
                                <p className="text-sm text-gray-600">News / 12 April 2024</p>
                            </div>
                        </div>
                        {/* Blog Post 2 */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-w-16 aspect-h-9 bg-cover bg-center opacity-50 blur-lg" style={{ backgroundImage: 'url(/blog-image-2.jpg)' }}></div> {/* Replace with your image */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Which plan is right for me?</h3>
                                <p className="text-sm text-gray-600">News / 12 April 2024</p>
                            </div>
                        </div>
                        {/* Blog Post 3 */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-w-16 aspect-h-9 bg-cover bg-center opacity-50 " style={{ backgroundImage: 'url(/blog-1.png)' }}></div> {/* Replace with your image */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Enjoy Speed, Choice & Total Control</h3>
                                <p className="text-sm text-gray-600">News / 12 April 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs